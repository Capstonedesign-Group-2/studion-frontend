import { Dispatch, SetStateAction } from "react"
import { AudioFile } from "../room/player/mixer/Recorder"

type Props = {
    audioFiles: AudioFile[]
    setNav: Dispatch<SetStateAction<boolean>>
}

const Navbar: React.FC<Props> = ({audioFiles, setNav}) => {
    return (
        <nav>

        </nav>
    )
}

export default Navbar