import { useEffect, useRef } from "react"

import Mixer from "./inst/mixer/Mixer"

type Props = {
  mixerRef: React.MutableRefObject<Mixer | undefined>
}

const Recorder: React.FC<Props> = ({ mixerRef }) => {
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
              audio: {
                echoCancellation: false,
                autoGainControl: false,
                noiseSuppression: false,
                latency: 0
              },
              video: false,
            }
          })
        ]
      });

      wavesurferRef.current.microphone.on('deviceReady', function (stream: MediaStream) {
        console.log('Device ready!', stream);
        mixerRef.current = new Mixer(stream)
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
    </div>
  )
}

export default Recorder