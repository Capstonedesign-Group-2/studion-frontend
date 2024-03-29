import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { VolumeSlider } from "../../../room/player/mixer/VolumeSlider";
import RotaryKnob from "../../../room/player/mixer/RotaryKnob";

import Mixer from "../mixer/Mixer";

type Props = {
  mixerRef: React.MutableRefObject<Mixer | undefined>;
  setMixerLoading: Dispatch<SetStateAction<boolean>>;
  selectedInst: String;
};

const Mic: React.FC<Props> = ({ mixerRef, setMixerLoading }) => {
  const wavesurferRef = useRef<any>();
  const waveformRef = useRef<HTMLDivElement>(null);

  const handleVolumeChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      if (typeof newValue === "number") {
        console.log(mixerRef.current);
        mixerRef.current?.vocal.setGain(newValue / 120);
      }
    },
    [mixerRef]
  );

  useEffect(() => {
    const initWaveSurfer = async () => {
      const WaveSurfer = await require("wavesurfer.js");
      const Microphone =
        await require("wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js");

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#007E8E",
        height: 200,
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
                latency: 0,
              },
              video: false,
            },
          }),
        ],
      });

      wavesurferRef.current.microphone.on(
        "deviceReady",
        function (stream: MediaStream) {
          console.log("Device ready!", stream);
          mixerRef.current = new Mixer(stream);
          setMixerLoading(false);
        }
      );
      wavesurferRef.current.microphone.on(
        "deviceError",
        function (code: Error) {
          console.warn("Device error: " + code);
          setMixerLoading(false);
        }
      );

      wavesurferRef.current.microphone.start();

      // stop visualization and disconnect microphone
      //wavesurfer.microphone.stopDevice();

      // destroy the plugin
      //wavesurfer.microphone.destroy();
    };
    initWaveSurfer();

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-studion-500 mt-12 h-60 relative flex rounded-md">
      <div
        className="flex-1 text-center mx-5 my-5 border-[1px] border-gray-200 rounded-t bg-white"
        ref={waveformRef}
      ></div>
      <div className="flex gap-6">
        {mixerRef.current?.vocal && (
          <div className="my-4">
            <RotaryKnob label="PAN" channel={mixerRef.current.vocal} />
            <RotaryKnob label="Delay" channel={mixerRef.current.vocal} />
          </div>
        )}
        <div className="px-5 py-5 border-l flex flex-col justify-center items-center">
          <VolumeSlider
            valueLabelDisplay="auto"
            aria-label="volume slider"
            defaultValue={100}
            max={120}
            orientation="vertical"
            onChange={handleVolumeChange}
          />
          <div className="px-3 mt-2 text-sm rounded bg-gray-200">mic</div>
        </div>
      </div>
    </div>
  );
};

export default Mic;
