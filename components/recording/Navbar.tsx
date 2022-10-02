import useTranslation from "next-translate/useTranslation"
import { Dispatch, SetStateAction } from "react"
import { Modal } from "../common/modals"
import AudioEditor from "../room/editor/AudioEditor"
import { AudioFile } from "../room/player/mixer/Recorder"

type Props = {
    audioFiles: AudioFile[]
    setAudioFiles: Dispatch<SetStateAction<AudioFile[]>>
}

const Navbar: React.FC<Props> = ({audioFiles, setAudioFiles}) => {
    const { t } = useTranslation("recording")
    const langs = {
        post_file_select: t("post_file_select"),
        post_content: t("post_content"),
        post_btn: t("post_btn")
    }
    const onEditAudio = (audioFile: AudioFile) => {
        console.log(audioFile)
        Modal.fire({
          title: t("edit_form_title"),
          showConfirmButton: false,
          html: <AudioEditor langs={langs} audioFile={audioFile} setAudioFiles={setAudioFiles}></AudioEditor>
        })
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
                        <div className="flex justify-between text-gray-400">
                            <label className="text-lg"># {audioFile?.label}</label>
                            <button onClick={() => onEditAudio(audioFile)} >edit 🛠</button>
                        </div>
                        <audio src={audioFile?.url} controls className="w-full mt-1 rounded" />
                    </div>
                ))
                : <div className="text-gray-300 text-center">{t("sound_list")}</div>}
            </div>
        </nav>
    )
}

export default Navbar