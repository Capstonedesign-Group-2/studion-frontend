import Album from "./album";
import RecodePlayer from "./recodePlayer";

const Player = ({audio, image}) => {
    return (
        <div className="relative h-full">
            <div className="w-full justify-items-center">
                <div className="pb-12 mx-auto w-full lg:max-w-2xl">
                    {
                        audio.length | image.length
                        ?
                            <RecodePlayer audio={audio} image={image} />
                        :
                            null
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Player;