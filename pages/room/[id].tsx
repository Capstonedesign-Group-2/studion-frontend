import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import cookie from 'react-cookies'

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

const pc_config = {
	iceServers: [
		{
			urls: process.env.NEXT_PUBLIC_ICE_STUN_SERVER || 'stun:stun.l.google.com:19302',
		},
	],
};

const Room = () => {
	const [menu, setMenu] = useState<boolean>(true)
	const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({})
	const localVideoRef = useRef<HTMLVideoElement>(null)
	const localStreamRef = useRef<MediaStream>()
	const [users, setUsers] = useState<WebRTCUser[]>([])
	const userData = useSelector((state: RootState) => state.user.data)

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
			localStreamRef.current = localStream;
			if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
			if (!Socket.socket) return;

			const data = {
				name: userData?.name,
				user_id: userData?.id,
				room: '42',
			}

			Socket.joinRoom(data)
		} catch (e) {
			console.log(`getUserMedia error: ${e}`);
		}
	}, [userData?.name, userData?.id, cookie.load('accessToken')]);

	const createPeerConnection = useCallback((socketID: string, name: string) => {
		try {
			const pc = new RTCPeerConnection(pc_config);

			pc.onicecandidate = (e) => {
				if (!(Socket.socket && e.candidate)) return;
				Socket.socket.emit('candidate', {
					candidate: e.candidate,
					candidateSendID: Socket.socket.id,
					candidateReceiveID: socketID,
				});
			};

			pc.oniceconnectionstatechange = (e) => {
				console.log('on ice connections state change', e);
			};

			pc.ontrack = (e) => {
				console.log('ontrack success');
				setUsers((oldUsers) =>
					oldUsers
						.filter((user) => user.id !== socketID)
						.concat({
							id: socketID,
							name,
							stream: e.streams[0],
						}),
				);
			};

			if (localStreamRef.current) {
				console.log('localstream add');
				localStreamRef.current.getTracks().forEach((track) => {
					if (!localStreamRef.current) return;
					pc.addTrack(track, localStreamRef.current);
				});
			} else {
				console.log('no local stream');
			}

			return pc;
		} catch (e) {
			console.error(e);
			return undefined;
		}
	}, []);

	const whenUnmounte = () => {
		console.log('useEffect return exit room');
		http.post(`/rooms/exit/${42}`, {
			user_id: userData?.id
		}).then((res) => {
			console.log('rooms/exit', res);
		}).catch((err) => {
			console.error(err)
		})

		users.forEach((user) => {
			if (!pcsRef.current[user.id]) return;
			pcsRef.current[user.id].close();
			delete pcsRef.current[user.id];
		});
		localStreamRef.current
			?.getTracks()
			.forEach(track => track.stop())

		Socket.removeAllListeners()
	}

	useEffect(() => {
		getLocalStream();

		Socket.socket.on('all_users', (allUsers: Array<{ id: string; name: string, user_id: number }>) => {
			console.log('on all_users', allUsers);
			allUsers.filter(v => v.id !== Socket.socket.id).forEach(async (user) => {
				if (!localStreamRef.current) return;
				const pc = createPeerConnection(user.id, user.name);
				if (!(pc && Socket.socket)) return;
				pcsRef.current = { ...pcsRef.current, [user.id]: pc };
				try {
					const localSdp = await pc.createOffer({
						offerToReceiveAudio: true,
						offerToReceiveVideo: false,
					});
					console.log('create offer success');
					await pc.setLocalDescription(new RTCSessionDescription(localSdp));
					console.log('test', user.id, user.name, Socket.socket.id);
					Socket.socket.emit('offer', {
						sdp: localSdp,
						offerSendID: Socket.socket.id,
						offerSendName: user.name,
						offerReceiveID: user.id,
					});
				} catch (e) {
					console.error(e);
				}
			});
		});

		Socket.socket.on(
			'getOffer',
			async (data: {
				sdp: RTCSessionDescription;
				offerSendID: string;
				offerSendName: string;
			}) => {
				const { sdp, offerSendID, offerSendName } = data;
				console.log('get offer');
				if (!localStreamRef.current) return;
				const pc = createPeerConnection(offerSendID, offerSendName);
				if (!(pc && Socket.socket)) return;
				pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
				try {
					await pc.setRemoteDescription(new RTCSessionDescription(sdp));
					console.log('answer set remote description success');
					const localSdp = await pc.createAnswer({
						offerToReceiveVideo: false,
						offerToReceiveAudio: true,
					});
					await pc.setLocalDescription(new RTCSessionDescription(localSdp));
					Socket.socket.emit('answer', {
						sdp: localSdp,
						answerSendID: Socket.socket.id,
						answerReceiveID: offerSendID,
					});
				} catch (e) {
					console.error(e);
				}
			},
		);

		Socket.socket.on(
			'getAnswer',
			(data: { sdp: RTCSessionDescription; answerSendID: string }) => {
				const { sdp, answerSendID } = data;
				console.log('get answer');
				const pc: RTCPeerConnection = pcsRef.current[answerSendID];
				if (!pc) return;
				pc.setRemoteDescription(new RTCSessionDescription(sdp));
			},
		);

		Socket.socket.on(
			'getCandidate',
			async (data: { candidate: RTCIceCandidateInit; candidateSendID: string }) => {
				console.log('get candidate');
				const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID];
				if (!pc) return;
				await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
				console.log('candidate add success');
			},
		);

		Socket.socket.on('user_exit', (data: { id: string }) => {
			if (!pcsRef.current[data.id]) return;
			pcsRef.current[data.id].close();
			delete pcsRef.current[data.id];
			setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
		});

		return () => whenUnmounte()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createPeerConnection, getLocalStream])

	return (
		<div className="bg-gray-50 min-w-screen min-h-screen">
			{/* 헤더 */}
			<RoomHeader setMenu={setMenu} menu={menu} />

			{/* 메인 */}
			<div className="pt-12 xl:mr-96"
				style={{ marginRight: menu ? '' : '0px' }}
			>
				<RoomContainer />
			</div>

			{/* 메뉴 */}
			{menu && (
				<div className="fixed z-10 bg-gray-200 pb-20 h-screen top-0 pt-12 right-0 flex flex-col items-center shadow-md md:w-96">
					<MyInfoSection />
					<div className="w-full py-7 md:px-4">
						<RoomInfoSection />
					</div>
					<ChatSection />
				</div>
			)}
		</div>
	)
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	await stayLoggedIn(context, store);
	return { props: {} }
})

export default Room
