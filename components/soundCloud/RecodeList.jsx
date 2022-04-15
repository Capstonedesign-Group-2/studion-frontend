import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNextPostList } from "../../redux/actions/post";
import Loader from "../common/Loader";
import Album from "./Album"

const RecodeList = ({ userId }) => {
    const postList = useSelector(state => state.post.postList)
    const nextUrl = useSelector(state => state.post.postNextUrl)
    const getNextPostListLoading = useSelector(state => state.post.getNextPostListLoading)
    
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
        <div className="mt-16 mr-32 md:mr-14 lg:mr-10 xl:mr-10 ">
            <div className="grid grid-cols-1 gap-36 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-32 xl:gap-x-36">
                {postList &&
                    postList.map(post => (
                        <Album post={post} key={post.id} userId={userId} />
                    ))
                }
            </div>
            {
                getNextPostListLoading && 
                <div className="w-full flex justify-center mt-20">
                    <Loader />
                </div>
            }
            <div ref={observer} />
        </div>
    )
}

export default RecodeList;