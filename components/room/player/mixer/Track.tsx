import Box from "@mui/material/Box";
import { useState, useCallback } from "react";
import { Channel } from "./Mixer";
import RotaryKnob from "./RotaryKnob";

import { VolumeSlider } from "./VolumeSlider";

interface Props {
  user: { id: string; name: string };
  channel: Channel;
}

const Track = ({ user, channel }: Props) => {
  const [volume, setVolume] = useState<number>(100);
  const [solo, setSolo] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);

  const onSolo = useCallback(() => {
    setSolo(!solo);
  }, [solo]);

  const onMute = useCallback(() => {
    setMute(!mute);
    channel.setMute(mute);
  }, [mute]);

  const setMuteStyle = useCallback(() => {
    let setColor = "#34D399";

    if (mute) {
      setColor = "#a1a1aa";
    }

    return {
      color: setColor,
      textShadow: mute ? "" : `${setColor} 1px 0 8px`,
      borderColor: setColor,
    };
  }, [mute]);

  const handleVolumeChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      if (typeof newValue === "number") {
        if (!channel) return;
        channel.setGain(newValue / 120);
        setVolume(newValue);
      }
    },
    [channel, user]
  );

  return (
    <div className="bg-gray-600 flex flex-col gap-4 py-4 px-2 items-center">
      {/* 플레이어 프로필 */}
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-10 h-10 justify-center items-center rounded-full bg-white border-2 border-studion-100">
          <p>{user.name && user.name.slice(0, 2).toUpperCase()}</p>
        </div>
        <p className="text-white">{user?.name}</p>
      </div>

      {/* PAN 노브 */}
      <RotaryKnob label="PAN" channel={channel} />

      {/* Delay 노브 */}
      <RotaryKnob label="Delay" channel={channel} />

      {/* Solo 버튼 */}
      <div className="flex flex-col" onClick={onSolo}>
        <label
          htmlFor="soloBtn"
          className="text-white text-sm text-center hover:cursor-pointer"
          style={{ color: solo ? "white" : "#a1a1aa" }}
        >
          SOLO
        </label>
        <button>
          <div
            className="bg-gray-300 h-5 w-12 border-b-4 border-studion-100 shadow"
            style={{ borderColor: solo ? "" : "#a1a1aa" }}
            id="soloBtn"
          ></div>
        </button>
      </div>

      {/* Mute 버튼 */}
      <button onClick={onMute}>
        <div
          className="text-sm mt-2 px-4 py-2 border-2 shadow"
          style={setMuteStyle()}
        >
          ON
        </div>
      </button>

      {/* 악기 포지션 */}
      <div className="px-3 mt-4 text-sm rounded bg-gray-300">guitar</div>

      <div className="text-gray-100">1</div>

      <Box className="h-72">
        <VolumeSlider
          valueLabelDisplay="auto"
          aria-label="volume slider"
          value={volume}
          max={120}
          orientation="vertical"
          onChange={handleVolumeChange}
        />
      </Box>
    </div>
  );
};

export default Track;
