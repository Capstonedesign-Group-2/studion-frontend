import { useSelector } from "react-redux";
import Album from "./album"

const RecodeList = () => {
    const postList = useSelector(state => state.post.postList)
    
    return (
        <div className="mt-16 mr-32 md:mr-14 lg:mr-10 xl:mr-10 ">
            <div className="grid grid-cols-1 gap-36 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-32 xl:gap-x-36">
            {postList && 
                postList.map(post => (
                    <Album post={post} key={post.id} />
                )) 
            }
            </div>
        </div>
    )
}

export default RecodeList;