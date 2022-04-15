import Link from "next/link";
import Profile from "./Profile"
import RecodeList from "./RecodeList"

const SoundCloudContainer = ({ userId }) => {
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="pt-36 pb-56">
                        <h2 className="text-2xl font-medium mb-8">
                            サウンドくも
                        </h2>
                        <Profile userId={userId}/>
                        {/* <Link href="/soundcloud/1">hello</Link> */}
                        <RecodeList userId={userId} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SoundCloudContainer;