import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import ab2str from 'arraybuffer-to-string'

import ChatSection from "../../components/room/menu/ChatSection"
import MyInfoSection from "../../components/room/menu/MyInfoSection"
import RoomInfoSection from "../../components/room/menu/RoomInfoSection"
import RoomContainer from "../../components/room/RoomConatiner"
import RoomHeader from "../../components/room/RoomHeader"
import wrapper from "../../redux/store"
import { stayLoggedIn } from "../../http/stay"
import { RootState } from "../../redux/slices"
import Socket from "../../socket"
import Mixer, { Channel } from "../../components/room/player/mixer/Mixer"
import roomSlice from "../../redux/slices/room"
import Loader from "../../components/common/Loader"
import { IUser, DcData } from '../../types'

const pc_config = {
	iceServers: [
		{
			urls: process.env.NEXT_PUBLIC_ICE_STUN_SERVER || 'stun:stun.l.google.com:19302',
		},
		{
			urls: process.env.NEXT_PUBLIC_ICE_TURN_SERVER || '',
			credential: process.env.NEXT_PUBLIC_ICE_TURN_SERVER_PASSWORD || '',
			username: process.env.NEXT_PUBLIC_ICE_TURN_SERVER_USERNAME || ''
		}
	],
}

const Room = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const userData = useSelector<RootState, IUser>(state => state.user.data)
	const users = useSelector<RootState, { id: string, name: string }[]>(state => state.room.users)
	const isLoading = useSelector<RootState, boolean>(state => state.room.isLoading)
	const [menu, setMenu] = useState<boolean>(true)

	// webRTC
	const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({})
	const dcsRef = useRef<{ [userId: string]: RTCDataChannel }>({})

	// mixer
	const mixerRef = useRef<Mixer>()
	const localStreamRef = useRef<MediaStream>()
	const [audios, setAudios] = useState<MediaDeviceInfo[]>([])

	const getLocalStream = useCallback(async (deviceId: string | null) => {
		const initialConstrains = {
			audio: {
				echoCancellation: false,
				autoGainControl: false,
				noiseSuppression: false,
				latency: 0
			},
			video: false,
		}
		const audioConstraints = {
			audio: {
				deviceId: {
					exact: deviceId
				},
				echoCancellation: false,
				autoGainControl: false,
				noiseSuppression: false,
				latency: 0
			},
			video: false,
		}
		try {
			localStreamRef.current = await navigator.mediaDevices.getUserMedia(
				deviceId ? audioConstraints : initialConstrains
			);

			// get user audios
			if (!deviceId) { // deviceId??? ????????? ????????? ??????
				if (!(mixerRef.current && Socket.socket && localStreamRef.current)) return

				new Channel(userData?.name, Socket.socket.id, localStreamRef.current, mixerRef.current)
				dispatch(roomSlice.actions.addUser({ id: Socket.socket.id, name: userData?.name }))

				getAudios()

				if (!userData) return
				const joinData = {
					user: userData,
					room_id: router.query.id as string
				}

				Socket.joinRoom(joinData)
				Socket.emitGetRoomInfo({ id: parseInt(router.query.id as string) })
			}
		} catch (e) {
			console.error(`getUserMedia error: ${e}`)
		}
	}, [userData?.name, userData?.id]) // cookie.load('accessToken')

	const getAudios = async () => {
		if (!localStreamRef.current) return
		try {
			const devices = navigator.mediaDevices.enumerateDevices();
			const audioDevices = (await devices).filter((device) => device.kind === "audioinput");
			const currentAudio = localStreamRef.current.getAudioTracks()[0].label;
			setAudios((prev) => [...prev, ...audioDevices])
		} catch (e) {
			console.error(e);
		}
	}

	const handleAudioChange = async (deviceId: string) => {
		await getLocalStream(deviceId);
		// pcsRef.current?.map(pc => {
		// 	if(!localStreamRef.current) return
		// 	const audioTrack = localStreamRef.current.getAudioTracks()[0];
		// 	const audioSender = pc
		// 		.getSenders()
		// 		.find((sender) => sender.track.kind === "audio");
		// 	audioSender.replaceTrack(audioTrack);
		// })
	}

	const createPeerConnection = useCallback((socketId: string, name: string) => {
		console.log('connect new user', name, socketId)
		try {
			const pc = new RTCPeerConnection(pc_config)

			pc.onicecandidate = (e) => {
				if (!(Socket.socket && e.candidate)) return
				Socket.socket.emit('candidate', {
					candidate: e.candidate,
					candidateSendID: Socket.socket.id,
					candidateReceiveID: socketId,
				})
			}

			pc.oniceconnectionstatechange = (e) => {
				// console.log('on ice connections state change', e)
			}

			pc.ontrack = (e) => {
				if (!mixerRef.current) return
				new Channel(name, socketId, e.streams[0], mixerRef.current)
				dispatch(roomSlice.actions.addUser({ id: socketId, name }))
			}

			pc.ondatachannel = (e) => {
				// console.log('datachannel event:', e);
				if (e.type === 'datachannel') {
					initDataChannel(e.channel);
					dcsRef.current = { ...dcsRef.current, [e.channel.label]: e.channel }
					console.log('ondatachannel', dcsRef.current)
				}
			}

			if (localStreamRef.current) {
				// console.log('localstream add')
				localStreamRef.current.getTracks().forEach((track) => {
					if (!localStreamRef.current) return
					pc.addTrack(track, localStreamRef.current)
				})
			} else {
				console.error('no local stream')
			}

			return pc
		} catch (e) {
			console.error(e)
			return undefined
		}
	}, [])

	const openDataChannel = (pc: RTCPeerConnection) => {
		// console.log('try to open datachannel');
		try {
			let dc = pc.createDataChannel(`${Socket.socket.id}`);
			return initDataChannel(dc)
		} catch (err) {
			console.error('open datachannel error:', err);
		}
	}

	const initDataChannel = (dc: RTCDataChannel) => {
		dc.onerror = (err) => {
			console.error('datachannel error: ', err);
		}

		dc.onmessage = async (e) => {
			let data = e.data
			console.log(data, typeof data)
			// string??? ?????? ?????? arraybuffer -> string
			// blob -> string
			if (typeof data !== 'string') {
				// data = ab2str(data)
				data = await (data as Blob).text()
				console.log('read data', data)
			}

			const { type, key, socketId } = JSON.parse(data) as DcData
			console.log('received dc data :', type, key);
			switch (type) {
				case 'drum':
					mixerRef.current?.channels[socketId]?.drum?.onPlay(key)
					break
				case 'onPiano':
					mixerRef.current?.channels[socketId]?.piano?.onKey(key.slice(2, 4)) // key: 'p_48'
					break
			}
		}

		dc.onopen = (e) => {
			// console.log('dc is opened', e);
		}

		dc.onclose = (e) => {
			// console.log('dc is disconnected', e);
		}

		return dc
	}

	const sendDataToAllUsers = (data: DcData) => {
		users.forEach(user => {
			if (!dcsRef.current[user.id]) return
			// console.log(data);
			dcsRef.current[user.id].send(JSON.stringify(data))
		})
	}

	// useEffect return
	const whenUnmounte = () => {
		// ????????? ?????????

		// ?????? ??????
		users.forEach((user) => {
			if (!pcsRef.current[user.id]) return
			pcsRef.current[user.id].close()
			delete pcsRef.current[user.id]
		});
		localStreamRef.current
			?.getTracks()
			.forEach(track => track.stop())

		// ?????? ?????????
		Socket.exitRoom()

		// ?????? ????????? ??????
		Socket.removeAllListeners()
	}

	useEffect(() => {
		// ??????
		dispatch(roomSlice.actions.setLoading(true))

		// ????????? ?????? ????????????

		// ?????? ??????
		mixerRef.current = new Mixer()
		// console.log('new mixer', mixerRef.current);

		// ?????? ?????????
		getLocalStream(null)
		Socket.onNewMessage(dispatch)
		Socket.onUpdateRoomInfo(dispatch)

		Socket.socket.on('all_users', (allUsers: Array<{ id: string; name: string, user_id: number }>) => {
			// console.log('on all_users', allUsers, Socket.socket.id)
			allUsers.forEach(async (user) => {
				if (!localStreamRef.current) return

				// ?????? ????????? ?????? ????????? ????????? ??????
				const pc = createPeerConnection(user.id, user.name)
				if (!(pc && Socket.socket)) return
				pcsRef.current = { ...pcsRef.current, [user.id]: pc }

				// ????????? ?????? ??????
				const dc = openDataChannel(pc)
				dcsRef.current = { ...dcsRef.current, [user.id]: dc as RTCDataChannel }
				console.log('openDataChannel', dcsRef.current)

				// ?????? ??????
				try {
					const localSdp = await pc.createOffer({
						offerToReceiveAudio: true,
						offerToReceiveVideo: false,
					})
					// console.log('create offer success')
					await pc.setLocalDescription(new RTCSessionDescription(localSdp))
					// console.log('test', user.id, user.name, Socket.socket.id)
					Socket.socket.emit('offer', {
						sdp: localSdp,
						offerSendID: Socket.socket.id,
						offerSendName: userData?.name,
						offerReceiveID: user.id,
					})
				} catch (e) {
					console.error(e)
				}
			});
		});

		Socket.socket.on(
			'getOffer',
			async (data: {
				sdp: RTCSessionDescription
				offerSendID: string
				offerSendName: string
			}) => {
				const { sdp, offerSendID, offerSendName } = data
				// console.log('get offer')
				// ????????? ?????? ???????????? ??? ??????
				if (!localStreamRef.current) return
				const pc = createPeerConnection(offerSendID, offerSendName)
				if (!(pc && Socket.socket)) return
				pcsRef.current = { ...pcsRef.current, [offerSendID]: pc }
				try {
					await pc.setRemoteDescription(new RTCSessionDescription(sdp))
					// console.log('answer set remote description success')
					const localSdp = await pc.createAnswer({
						offerToReceiveVideo: true,
						offerToReceiveAudio: false,
					});
					await pc.setLocalDescription(new RTCSessionDescription(localSdp))
					Socket.socket.emit('answer', {
						sdp: localSdp,
						answerSendID: Socket.socket.id,
						answerReceiveID: offerSendID,
					})
				} catch (e) {
					console.error(e)
				}
			},
		);

		Socket.socket.on(
			'getAnswer',
			(data: { sdp: RTCSessionDescription; answerSendID: string }) => {
				const { sdp, answerSendID } = data
				// console.log('get answer')
				const pc: RTCPeerConnection = pcsRef.current[answerSendID]
				if (!pc) return
				pc.setRemoteDescription(new RTCSessionDescription(sdp))
			},
		);

		Socket.socket.on(
			'getCandidate',
			async (data: { candidate: RTCIceCandidateInit; candidateSendID: string }) => {
				// console.log('get candidate')
				const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID]
				if (!pc) return
				await pc.addIceCandidate(new RTCIceCandidate(data.candidate))
				// console.log('candidate add success')
			},
		);

		Socket.socket.on('user_exit', (data: { id: string }) => {
			console.log('before user_exit', data, pcsRef.current, dcsRef.current)
			if (!pcsRef.current[data.id] || !dcsRef.current[data.id]) return
			console.log('after user_exit', data, pcsRef.current, dcsRef.current)
			pcsRef.current[data.id].close()
			delete pcsRef.current[data.id]
			dcsRef.current[data.id].close()
			delete dcsRef.current[data.id]
			mixerRef.current?.deleteChannel(data.id)
			dispatch(roomSlice.actions.deleteUser(data))
		})

		// ?????? ??????
		dispatch(roomSlice.actions.setLoading(false))

		return () => whenUnmounte()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="bg-gray-50 min-w-screen min-h-screen">
			{/* ?????? */}
			<RoomHeader setMenu={setMenu} menu={menu} />

			{/* ?????? */}
			<div className="pt-12 xl:mr-96"
				style={{ marginRight: menu ? '' : '0px' }}
			>
				{isLoading
					? (
						<div className="h-screen flex justify-center items-center">
							<Loader />
						</div>
					)
					: (
						<RoomContainer
							sendDataToAllUsers={sendDataToAllUsers}
							mixerRef={mixerRef}
						/>
					)}
			</div>

			{/* ?????? */}
			{menu && (
				<div className="fixed z-10 bg-gray-200 pb-20 h-screen top-0 pt-12 right-0 flex flex-col items-center shadow-md md:w-96">
					<MyInfoSection audios={audios} />
					<div className="w-full py-7 md:px-4">
						<RoomInfoSection />
					</div>
					<div className="flex-1 overflow-hidden w-full md:px-4">
						<ChatSection />
					</div>
				</div>
			)}
		</div>
	)
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	await stayLoggedIn(context, store)
	if (!store.getState().user.data) { // ?????? ???????????? ????????? '/login'?????? ???????????????
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}
	return { props: {} }
})

export default Room
