interface Props {
  audios: MediaDeviceInfo[]
}

const AudioSelect = ({ audios }: Props) => {
  const handelSelect = (e: React.FormEvent) => {

  }

  return (
    <select onChange={handelSelect}>
      {audios.map(audio => (
        <option value={audio.deviceId} key={audio.deviceId}>
          {audio.label}
        </option>
      ))}
    </select>
  )
}

export default AudioSelect