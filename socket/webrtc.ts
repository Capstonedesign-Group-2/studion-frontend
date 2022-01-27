import Socket, { JoinData } from "./index"

const pc_config = {
  iceServers: [
    {
      urls: process.env.NEXT_PUBLIC_ICE_STUN_SERVER || 'stun:stun.l.google.com:19302',
    },
  ],
};

export class webrtc {
  psc: { [socketId: string]: RTCPeerConnection }
  localVideo: HTMLVideoElement | null
  localStream: MediaStream | null

  constructor() {
    this.psc = {}
    this.localVideo = null
    this.localStream = null
  }

  async getLocalStream(joinData: JoinData) {
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
      this.localStream = localStream;
      if (this.localVideo) {
        this.localVideo.srcObject = localStream
      }

      if (!Socket.socket) return;
      Socket.joinRoom(joinData)
    } catch (err) {
      console.log(`getUserMedia error: ${err}`);
    }
  }

  async createPeerConnection() {
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
  }
}
