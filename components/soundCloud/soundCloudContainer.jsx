import Profile from "./Profile"
import RecodeList from "./RecodeList"

const SoundCloudContainer = () => {
    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="pt-36 pb-56">
                        <h2 className="text-2xl font-medium mb-8">
                        SoundCloud
                        </h2>
                        <Profile />
                        <RecodeList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SoundCloudContainer;