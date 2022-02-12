import { useEffect, useRef, useState } from "react"

const triangle = {
  width: '0px',
  height: '0px',
  borderLeft: '16px solid #4B5563',
  borderTop: '8px solid transparent',
  borderBottom: '8px solid transparent'
}

const Recorder = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const recRef = useRef<MediaRecorder>()
  const [downloadUrl, setDownloadUrl] = useState<string>('')
  const [clock, setClock] = useState<number>(0)
  const timerInterval = useRef<number>()

  const onPlay = () => {
    setIsPlaying(!isPlaying)
  }

  const onRecording = async () => {
    setIsPlaying(true)
    navigator.mediaDevices.getDisplayMedia({
      video: { width: 640, height: 480 },
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
      }
    }).then((stream) => {
      recording(stream)
      recRef.current?.start()
      const now = Date.now()
      setClock(0)
      timerInterval.current = window.setInterval(() => {
        setClock(Date.now() - now)
      }, 50)
    })
  }

  const recording = (stream: MediaStream) => {
    recRef.current = new MediaRecorder(stream)
    recRef.current.ondataavailable = (e) => {
      let videoChunks: Blob[] = []
      videoChunks.push(e.data)
      if (recRef.current?.state === 'inactive') {
        let blob = new Blob(videoChunks, { type: 'video/webm; codecs=vp9,opus' })
        console.log(blob, URL.createObjectURL(blob))
        // setDownloadUrl(URL.createObjectURL(blob))

        let reader = new FileReader()
        reader.readAsArrayBuffer(blob);
        reader.onload = () => {
          let length = parseInt((clock / 1000).toFixed(0))
          console.log(length)
          let offlineAudioContext = new OfflineAudioContext(2, 44100 * length, 44100);
          let soundSource = offlineAudioContext.createBufferSource();
          let videoFileAsBuffer = reader.result; // arraybuffer
          let audioContext = new AudioContext()

          audioContext.decodeAudioData(videoFileAsBuffer as ArrayBuffer)
            .then(function (decodedAudioData) {
              let myBuffer = decodedAudioData;
              soundSource.buffer = myBuffer;
              soundSource.connect(offlineAudioContext.destination);
              soundSource.start();

              offlineAudioContext.startRendering().then(function (renderedBuffer) {
                console.log(renderedBuffer); // outputs audiobuffer
                makeDownload(renderedBuffer, offlineAudioContext.length)
              }).catch(function (err) {
                console.log('Rendering failed: ' + err);
              });
            });
        }
      }
    }
  }

  const makeDownload = (abuffer: AudioBuffer, total_samples: number) => {
    // Generate audio file and assign URL
    var new_file = URL.createObjectURL(bufferToWave(abuffer, total_samples));

    // Make it downloadable
    setDownloadUrl(new_file)
  }

  // Convert AudioBuffer to a Blob using WAVE representation
  function bufferToWave(abuffer: AudioBuffer, len: number) {
    var numOfChan = abuffer.numberOfChannels,
      length = len * numOfChan * 2 + 44,
      buffer = new ArrayBuffer(length),
      view = new DataView(buffer),
      channels = [], i, sample,
      offset = 0,
      pos = 0;

    // write WAVE header
    setUint32(0x46464952);                         // "RIFF"
    setUint32(length - 8);                         // file length - 8
    setUint32(0x45564157);                         // "WAVE"

    setUint32(0x20746d66);                         // "fmt " chunk
    setUint32(16);                                 // length = 16
    setUint16(1);                                  // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2);                      // block-align
    setUint16(16);                                 // 16-bit (hardcoded in this demo)

    setUint32(0x61746164);                         // "data" - chunk
    setUint32(length - pos - 4);                   // chunk length

    // write interleaved data
    for (i = 0; i < abuffer.numberOfChannels; i++)
      channels.push(abuffer.getChannelData(i));

    while (pos < length) {
      for (i = 0; i < numOfChan; i++) {             // interleave channels
        sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
        view.setInt16(pos, sample, true);          // write 16-bit sample
        pos += 2;
      }
      offset++                                     // next source sample
    }

    // create Blob
    return new Blob([buffer], { type: "audio/wav" });

    function setUint16(data: number) {
      view.setUint16(pos, data, true);
      pos += 2;
    }

    function setUint32(data: number) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  }

  const onStop = () => {
    setIsPlaying(false)
    recRef.current?.stop()
    clearInterval(timerInterval.current);
    console.log(recRef.current?.stream.getAudioTracks())
    console.log('stop recording', recRef.current, downloadUrl)
  }

  useEffect(() => {
    console.log('downloadUrl:', downloadUrl)
  }, [downloadUrl])

  return (
    <div className="bg-gray-600 h-full flex flex-col gap-4 py-12 px-8">
      <h3 className="text-gray-300 font-bold text-xl">
        🎙 Studion Recorder
      </h3>
      <div className=" font-mono text-3xl bg-gray-900 text-studion-100 rounded-lg py-4 px-3">
        {(clock / 1000).toFixed(1)}s
      </div>
      <div className="w-full grid grid-cols-3 gap-2">

        {/* 중지 버튼 */}
        <button
          onClick={onStop}
        >
          <div className="flex justify-center items-center bg-gray-400 border-b-4 border-gray-500 rounded-sm h-11">
            <div className='bg-gray-600 w-4 h-4 rounded-sm'></div>
          </div>
        </button>

        {/* 재생, 정지 버튼 */}
        <button
          onClick={onPlay}
        >
          <div className="flex justify-center items-center bg-gray-400 border-b-4 border-gray-500 rounded-sm h-11">
            {isPlaying
              ? (
                <div className="flex gap-1">
                  {[1, 2].map(v => <div key={v} className="h-4 w-[6px] bg-gray-600"></div>)}
                </div>
              )
              : <div className="" style={triangle}></div>}
          </div>
        </button>

        {/* 녹음 버튼 */}
        <button
          onClick={onRecording}
        >
          <div className="flex justify-center items-center bg-gray-400 border-b-4 border-gray-500 rounded-sm h-11">
            <div className='bg-red-700 h-4 w-4 rounded-full'></div>
          </div>
        </button>
      </div>
      {/* {downloadUrl && <video src={downloadUrl} controls />} */}
      {downloadUrl && <a href={downloadUrl} download>다운로드</a>}
    </div>
  )
}

export default Recorder