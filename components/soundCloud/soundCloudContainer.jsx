import styles from "../../styles/soundCloud/soundCloud.module.scss"
// import http from "../../http/index"
import Profile from "./profile"
import RecodeList from "./recodeList"
import { useState, useEffect } from "react"

const SoundCloudContainer = () => {
    const [postList, setPostList] = useState([]);
    // useEffect(() => {
    //     http.get('/posts/show')
    //     .then(res => {
    //         console.log(res.data.posts);
    //         setPostList(res.data.posts);
    //     })
    //     .catch(() => {
    //         console.log('ERROR')
    //     })
    // })
    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="pt-36 pb-56">
                        <h2 className="text-2xl font-medium mb-8">
                        SoundCloud
                        </h2>
                        <Profile />
                        <RecodeList postList={postList} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SoundCloudContainer;