import Album from "./album";
import RecodePlayer from "./recodePlayer";

const Player = () => {
    return (
        <div className="relative h-full">
            <div className="w-full justify-items-center">
                <div className="pb-12 mx-auto w-full lg:max-w-2xl">
                    <RecodePlayer />
                </div>
            </div>
        </div>
    )
}

export default Player;