import { useCallback, useEffect, useRef, useState } from "react"

import ChatSection from "../../components/room/menu/ChatSection"
import MyInfoSection from "../../components/room/menu/MyInfoSection"
import RoomInfoSection from "../../components/room/menu/RoomInfoSection"
import RoomContainer from "../../components/room/RoomConatiner"
import RoomHeader from "../../components/room/RoomHeader"
import wrapper from "../../redux/store"
import { useDispatch } from "react-redux"
import { stayLoggedIn } from "../../http/auth"

const pc_config = {
	iceServers: [
		{
			urls: process.env.NEXT_PUBLIC_ICE_STUN_SERVER as string,
		},
	],
};

const Room = () => {
	const [menu, setMenu] = useState<boolean>(true)
	const socketRef = useRef<SocketIOClient.Socket>();
	const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const localStreamRef = useRef<MediaStream>();
	const [users, setUsers] = useState<WebRTCUser[]>([]);

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
			if (!socketRef.current) return;
			socketRef.current.emit('join_room', {
				room: '1234',
				email: 'sample@naver.com',
			});
		} catch (e) {
			console.log(`getUserMedia error: ${e}`);
		}
	}, []);

	const createPeerConnection = useCallback((socketID: string, email: string) => {
		try {
			const pc = new RTCPeerConnection(pc_config);

			pc.onicecandidate = (e) => {
				if (!(socketRef.current && e.candidate)) return;
				console.log('onicecandidate');
				socketRef.current.emit('candidate', {
					candidate: e.candidate,
					candidateSendID: socketRef.current.id,
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
							email,
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

	// useEffect(() => {
	// 	socketRef.current = io.connect(process.env.NEXT_PUBLIC_SOCKET_URL as string);
	// 	getLocalStream();

	// 	socketRef.current.on('all_users', (allUsers: Array<{ id: string; email: string }>) => {
	// 		allUsers.forEach(async (user) => {
	// 			if (!localStreamRef.current) return;
	// 			const pc = createPeerConnection(user.id, user.email);
	// 			if (!(pc && socketRef.current)) return;
	// 			pcsRef.current = { ...pcsRef.current, [user.id]: pc };
	// 			try {
	// 				const localSdp = await pc.createOffer({
	// 					offerToReceiveAudio: true,
	// 					offerToReceiveVideo: false,
	// 				});
	// 				console.log('create offer success');
	// 				await pc.setLocalDescription(new RTCSessionDescription(localSdp));
	// 				socketRef.current.emit('offer', {
	// 					sdp: localSdp,
	// 					offerSendID: socketRef.current.id,
	// 					offerSendEmail: 'offerSendSample@sample.com',
	// 					offerReceiveID: user.id,
	// 				});
	// 			} catch (e) {
	// 				console.error(e);
	// 			}
	// 		});
	// 	});

	// 	socketRef.current.on(
	// 		'getOffer',
	// 		async (data: {
	// 			sdp: RTCSessionDescription;
	// 			offerSendID: string;
	// 			offerSendEmail: string;
	// 		}) => {
	// 			const { sdp, offerSendID, offerSendEmail } = data;
	// 			console.log('get offer');
	// 			if (!localStreamRef.current) return;
	// 			const pc = createPeerConnection(offerSendID, offerSendEmail);
	// 			if (!(pc && socketRef.current)) return;
	// 			pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
	// 			try {
	// 				await pc.setRemoteDescription(new RTCSessionDescription(sdp));
	// 				console.log('answer set remote description success');
	// 				const localSdp = await pc.createAnswer({
	// 					offerToReceiveVideo: false,
	// 					offerToReceiveAudio: true,
	// 				});
	// 				await pc.setLocalDescription(new RTCSessionDescription(localSdp));
	// 				socketRef.current.emit('answer', {
	// 					sdp: localSdp,
	// 					answerSendID: socketRef.current.id,
	// 					answerReceiveID: offerSendID,
	// 				});
	// 			} catch (e) {
	// 				console.error(e);
	// 			}
	// 		},
	// 	);

	// 	socketRef.current.on(
	// 		'getAnswer',
	// 		(data: { sdp: RTCSessionDescription; answerSendID: string }) => {
	// 			const { sdp, answerSendID } = data;
	// 			console.log('get answer');
	// 			const pc: RTCPeerConnection = pcsRef.current[answerSendID];
	// 			if (!pc) return;
	// 			pc.setRemoteDescription(new RTCSessionDescription(sdp));
	// 		},
	// 	);

	// 	socketRef.current.on(
	// 		'getCandidate',
	// 		async (data: { candidate: RTCIceCandidateInit; candidateSendID: string }) => {
	// 			console.log('get candidate');
	// 			const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID];
	// 			if (!pc) return;
	// 			await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
	// 			console.log('candidate add success');
	// 		},
	// 	);

	// 	socketRef.current.on('user_exit', (data: { id: string }) => {
	// 		if (!pcsRef.current[data.id]) return;
	// 		pcsRef.current[data.id].close();
	// 		delete pcsRef.current[data.id];
	// 		setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
	// 	});

	// 	return () => {
	// 		console.log('disconnect socket and peer connections')
	// 		if (socketRef.current) {
	// 			socketRef.current.disconnect();
	// 		}
	// 		users.forEach((user) => {
	// 			if (!pcsRef.current[user.id]) return;
	// 			pcsRef.current[user.id].close();
	// 			delete pcsRef.current[user.id];
	// 		});
	// 		localStreamRef.current
	// 			?.getTracks()
	// 			.forEach(track => track.stop())
	// 	};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [createPeerConnection, getLocalStream]);

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
