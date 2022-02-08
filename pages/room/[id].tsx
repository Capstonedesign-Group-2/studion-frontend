import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import ChatSection from "../../components/room/menu/ChatSection"
import MyInfoSection from "../../components/room/menu/MyInfoSection"
import RoomInfoSection from "../../components/room/menu/RoomInfoSection"
import RoomContainer from "../../components/room/RoomConatiner"
import RoomHeader from "../../components/room/RoomHeader"
import wrapper from "../../redux/store"
import { stayLoggedIn } from "../../http/stay"
import { RootState } from "../../redux/slices"
import Socket from "../../socket"
import http from "../../http"
import Mixer, { Channel } from "../../components/room/player/mixer/Mixer"
import roomSlice from "../../redux/slices/room"
import { DcData } from "../../types"
import DrumComponent from "../../components/room/inst/drum"
import PianoComponent from "../../components/room/inst/piano"

const pc_config = {
	iceServers: [
		{
			urls: process.env.NEXT_PUBLIC_ICE_STUN_SERVER || 'stun:stun.l.google.com:19302',
		},
	],
}

const Room = () => {
	const dispatch = useDispatch()
	const userData = useSelector((state: RootState) => state.user.data)
	const users = useSelector<RootState, { id: string, name: string }[]>(state => state.room.users)
	const [menu, setMenu] = useState<boolean>(true)

	// webRTC
	const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({})
	const dcsRef = useRef<{ [userId: string]: RTCDataChannel }>({})

	// mixer
	const mixerRef = useRef<Mixer>()
	const localStreamRef = useRef<MediaStream>()

	// playInst
	const drumInst = useRef<React.ElementRef<typeof DrumComponent>>(null)
	const pianoInst = useRef<React.ElementRef<typeof PianoComponent>>(null)

	const getLocalStream = useCallback(async () => {
		try {
			const localStream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: false,
					autoGainControl: false,
					noiseSuppression: false,
					latency: 0
				},
				video: false,
			});
			localStreamRef.current = localStream

			if (!(mixerRef.current && Socket.socket)) return

			console.log('set local channel', mixerRef.current);
			console.log(Socket.socket);
			mixerRef.current.addNewChannel(new Channel(userData?.name, Socket.socket.id, localStream))
			dispatch(roomSlice.actions.addUser({ id: Socket.socket.id, name: userData?.name }))

			const joinData = {
				name: userData?.name,
				user_id: userData?.id,
				room: '42',
			}

			Socket.joinRoom(joinData)
		} catch (e) {
			console.log(`getUserMedia error: ${e}`)
		}
	}, [userData?.name, userData?.id]) // cookie.load('accessToken')

	const createPeerConnection = useCallback((socketId: string, name: string) => {
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
				console.log('add new channel', mixerRef.current);
				mixerRef.current?.addNewChannel(new Channel(name, socketId, e.streams[0]))
				dispatch(roomSlice.actions.addUser({ id: socketId, name }))
			}

			pc.ondatachannel = (e) => {
				console.log('datachannel event:', e);
				if (e.type === 'datachannel') {
					initDataChannel(e.channel);
					dcsRef.current = { ...dcsRef.current, [e.channel.label]: e.channel }
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
		console.log('try to open datachannel');
		try {
			let dc = pc.createDataChannel(`${Socket.socket.id}`);
			return initDataChannel(dc)
		} catch (err) {
			console.log(err);
		}
	}

	const initDataChannel = (dc: RTCDataChannel) => {
		dc.onerror = (err) => {
			console.log('datachannel error : ' + err);
		}

		dc.onmessage = (e) => {
			const { type, key } = JSON.parse(e.data) as DcData
			console.log('received dc data :', type, key);
			switch (type) {
				case 'drum':
					if (!drumInst.current) return
					drumInst.current.onPlay(key)
					break
				case 'onPiano':
					if (!pianoInst.current) return
					pianoInst.current.onPlay(key)
					break
				case 'offPiano':
					if (!pianoInst.current) return
					pianoInst.current.offPlay(key)
					break
			}
		}

		dc.onopen = (e) => {
			console.log('dc is opened', e);
		}

		dc.onclose = (e) => {
			console.log('dc is disconnected', e);
		}

		return dc
	}

	const sendMessage = () => {
		// console.log(mixerRef.current?.channels, users);
		users.forEach(user => {
			if (!dcsRef.current[user.id]) return
			const message = {
				type: 'test',
				content: 'hi'
			}
			dcsRef.current[user.id].send(JSON.stringify(message))
		})
	}

	const sendDataToAllUsers = (data: DcData) => {
		users.forEach(user => {
			if (!dcsRef.current[user.id]) return
			console.log(data);
			dcsRef.current[user.id].send(JSON.stringify(data))
		})
	}

	// useEffect return
	const whenUnmounte = () => {
		console.log('useEffect return exit room')

		// 합주실 나가기
		http.post(`/rooms/exit/${42}`, {
			user_id: userData?.id
		}).then((res) => {
			console.log(`rooms/exit/${42}`, res)
			Socket.emitUpdateRoomList()
		}).catch((err) => {
			console.error(err)
		})

		// 연결 끊기
		users.forEach((user) => {
			if (!pcsRef.current[user.id]) return
			pcsRef.current[user.id].close()
			delete pcsRef.current[user.id]
		});
		localStreamRef.current
			?.getTracks()
			.forEach(track => track.stop())

		// 나감 이벤트
		Socket.exitRoom()

		// 소켓 이벤트 제거
		Socket.removeAllListeners()
	}

	useEffect(() => {
		// 합주실에 이미 있을경우 제거

		// 합주실 입장
		http.post(`/rooms/enter/${42}`, {
			user_id: userData?.id,
			password: "123"
		}).then(() => {
			Socket.emitUpdateRoomList()
			// console.log(`/rooms/enter/${42}`, res)

			// 믹서 세팅
			mixerRef.current = new Mixer()
			console.log('new mixer', mixerRef.current);

			// 유저 스트림
			getLocalStream()

			Socket.socket.on('all_users', (allUsers: Array<{ id: string; name: string, user_id: number }>) => {
				// console.log('on all_users', allUsers, Socket.socket.id)
				allUsers.forEach(async (user) => {
					if (!localStreamRef.current) return

					// 피어 연결
					const pc = createPeerConnection(user.id, user.name)
					if (!(pc && Socket.socket)) return
					pcsRef.current = { ...pcsRef.current, [user.id]: pc }

					// 데이터 채널 연결
					const dc = openDataChannel(pc)
					dcsRef.current = { ...dcsRef.current, [user.id]: dc as RTCDataChannel }

					// 오퍼 전송
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
				if (!pcsRef.current[data.id]) return
				pcsRef.current[data.id].close()
				delete pcsRef.current[data.id]
				dcsRef.current[data.id].close()
				delete dcsRef.current[data.id]
				mixerRef.current?.deleteChannel(data.id)
				dispatch(roomSlice.actions.deleteUser(data))
			})
		}).
			catch((err) => {
				console.error(err)
			})

		return () => whenUnmounte()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="bg-gray-50 min-w-screen min-h-screen">
			{/* 헤더 */}
			<RoomHeader setMenu={setMenu} menu={menu} />

			{/* 메인 */}
			<div className="pt-12 xl:mr-96"
				style={{ marginRight: menu ? '' : '0px' }}
			>
				<RoomContainer
					sendDataToAllUsers={sendDataToAllUsers}
					drumInst={drumInst}
					pianoInst={pianoInst}
					mixerRef={mixerRef}
				/>
			</div>

			{/* 메뉴 */}
			{menu && (
				<div className="fixed z-10 bg-gray-200 pb-20 h-screen top-0 pt-12 right-0 flex flex-col items-center shadow-md md:w-96">
					<MyInfoSection />
					<div className="w-full py-7 md:px-4">
						<RoomInfoSection />
					</div>
					<button onClick={() => sendMessage()}>send</button>
					<ChatSection />
				</div>
			)}
		</div>
	)
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	await stayLoggedIn(context, store)
	return { props: {} }
})

export default Room
