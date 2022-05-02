import { useEffect, useRef } from "react"
import { Stream } from "stream"

const Recorder: React.FC = () => {
  const wavesurferRef = useRef<any>()
  const waveformRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initWaveSurfer = async () => {
      const WaveSurfer = await require('wavesurfer.js')
      const Microphone = await require('wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js')

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#007E8E',
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 0,
        barGap: 3,
        interact: false,
        plugins: [
          Microphone.create({
            bufferSize: 4096,
            numberOfInputChannels: 1,
            numberOfOutputChannels: 1,
            constraints: {
              video: false,
              audio: true
            }
          })
        ]
      });

      wavesurferRef.current.microphone.on('deviceReady', function (stream: Stream) {
        console.log('Device ready!', stream);
      });
      wavesurferRef.current.microphone.on('deviceError', function (code: Error) {
        console.warn('Device error: ' + code);
      });

      wavesurferRef.current.microphone.start();

      // stop visualization and disconnect microphone
      //wavesurfer.microphone.stopDevice();

      // destroy the plugin
      //wavesurfer.microphone.destroy();
    }
    initWaveSurfer()
  })

  return (
    <div>
      <div className='border-[1px] border-b-0 border-gray-200 rounded-t' ref={waveformRef}></div>
      {/* <button onClick={onStartOrStop}>start / stop</button> */}
    </div>
  )
}

export default Recorder