import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNextPostList } from "../../redux/actions/post";
import Loader from "../common/Loader";
import Album from "./Album"

const RecodeList = ({ userId }) => {
    const postList = useSelector(state => state.post.postList)
    const nextUrl = useSelector(state => state.post.nextUrl)
    const getNextPostListLoading = useSelector(state => state.post.getNextPostListLoading)
    
    const observerRef = useRef();
    const dispatch = useDispatch();
    
    // const getMoreList = async() => {
    //     if(nextUrl !== null) {
    //         console.log(nextUrl);
    //         setIsLoading(true);
    //         await new Promise((resolve) => setTimeout(resolve, 1500));
    //         dispatch(getNextPostList({next_page_url : nextUrl}))
    //         console.log('sibal')
    //         setIsLoading(false)
    //     }
    //     return ;
    // }
    // const onIntersect = (e, observer) => {
    //     console.log(e, observer)
    //     // if(e.isIntersecting && !isLoading) {
    //     //     observer.unobserve(e.target);
    //     //     getMoreList();
    //     //     observer.observe(e.target);
    //     // }
    // }

    const observer = (node) => {
        console.log('node', node)
        if (getNextPostListLoading) return;
        if (observerRef.current) observerRef.current.disconnect();
    
        observerRef.current = new IntersectionObserver(([entry]) => {
            console.log('entry', entry)
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