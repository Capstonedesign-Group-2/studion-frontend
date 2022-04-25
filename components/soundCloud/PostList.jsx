import { useDispatch, useSelector } from "react-redux"
import { useRef } from "react"
import { getNextPostList } from "../../redux/actions/post"
import Post from "./Post"
const PostList = () => {
    const postList = useSelector(state => state.post.postList)
    const getNextPostListLoading = useSelector(state => state.post.getNextPostListLoading)
    const nextUrl = useSelector(state => state.post.postNextUrl)
    const observerRef = useRef();
    const dispatch = useDispatch();
    
    const observer = (node) => {
        if (getNextPostListLoading) return;
        if (observerRef.current) observerRef.current.disconnect();
    
        observerRef.current = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && nextUrl !== null) {
            dispatch(getNextPostList({next_page_url : nextUrl}))
          }
        });
    
        node && observerRef.current.observe(node);
      };
    return (
        <div className="mt-9 border w-full h-full mx-auto">
            {
                postList.map(post => <Post key={post.id} post={post}/>)
            }
            <div ref={observer} />
        </div>
    )    
}

export default PostList;