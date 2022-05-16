import { Dispatch, SetStateAction } from "react"
import { Modal } from "../common/modals"
import AudioEditor from "../room/editor/AudioEditor"
import { AudioFile } from "../room/player/mixer/Recorder"

type Props = {
    audioFiles: AudioFile[]
    setAudioFiles: Dispatch<SetStateAction<AudioFile[]>>
}

const Navbar: React.FC<Props> = ({audioFiles, setAudioFiles}) => {
    const onEditAudio = (audioFile: AudioFile) => {
        Modal.fire({
          title: 'オーディオ編集',
          showConfirmButton: false,
          html: <AudioEditor audioFile={audioFile} setAudioFiles={setAudioFiles}></AudioEditor>
        })
    }
    const onDelete = (audioFile: AudioFile) => {
        let con = confirm('音源を削除しますか。')
        if (!con) return
        setAudioFiles((prev) => prev.filter(v => v !== audioFile))
    }
    return (
        <nav className="absolute drop-shadow-md z-10 bg-white max-w-sm w-full h-full right-0 pt-14 px-4">
            <h3 className="text-gray-600 font-bold mt-4 text-xl">
                🎧 Sound List
            </h3>
            <div className="flex flex-col gap-2 overflow-y-auto mt-4">
                {audioFiles?.length !== 0
                ? audioFiles?.map((audioFile) => (
                    <div key={audioFile?.label}>
                        <div className="flex justify-between text-gray-300">
                            <label className="text-lg"># {audioFile?.label}</label>
                            <div>
                                <button onClick={() => onEditAudio(audioFile)} className="mr-3">edit 🛠</button>
                                <button onClick={() => onDelete(audioFile)}>X</button>
                            </div>
                        </div>
                        <audio src={audioFile?.url} controls className="w-full mt-1 rounded" />
                    </div>
                ))
                : <div className="text-gray-300 text-center">録音してください！</div>}
            </div>
        </nav>
    )
}

export default Navbar