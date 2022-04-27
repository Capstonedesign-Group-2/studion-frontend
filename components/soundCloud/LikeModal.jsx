import { useEffect, useRef, useState } from "react";
import http from "../../http";
import Loader from "../common/Loader";
import { Modal } from "../common/modals";
import Router from "next/router";
const LikeModal = ({postId}) => {
    const observerRef = useRef()
    const [usersData, setUsersData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [nextUrl, setNextUrl] = useState(null);

    const observer = (node) => {
        if (isLoading) return;
        if (observerRef.current) observerRef.current.disconnect();
    
        observerRef.current = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && nextUrl !== null) {
            setLoading(true)
            http.get(nextUrl)
            .then(res => {
                setUsersData((prev) => [
                    ...prev,
                    ...res.data.likes.data
                ])
                setNextUrl(res.data.likes.next_page_url)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                console.error(err)
            })
          }
        });
    
        node && observerRef.current.observe(node);
      };
    useEffect(() => {
        setLoading(true)
        http.get(`/likes/${postId}`)
        .then(res => {
            setUsersData(res.data.likes.data)
            setNextUrl(res.data.likes.next_page_url)
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])
    return (
        <div className="w-full flex flex-col h-full">
            <header className="w-full">
                <p className="font-bold border-b">좋아요</p>
                <div className="absolute cursor-pointer top-2 right-2" onClick={() => {Modal.close()}}>
                <svg className="w-7 h-7" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </div>               
            </header>
            {/* 좋아요 유저 목록 */}
            <div className="mt-1 w-full overflow-y-auto">
                <div className="w-full">
                    {
                        usersData?.map((userData) => <User key={userData.id} data={userData.user} />)
                    }
                </div>
                {
                    isLoading && 
                    <div className="w-full flex justify-center mt-20">
                        <Loader />
                    </div>
                }
                <div ref={observer} className="border-white h-2"/>
            </div>
        </div>
    )
}
const User = ({data}) => {
    return (
        <div className="flex items-center py-2 pl-2 hover:bg-gray-100 cursor-pointer" 
             onClick={() => {
                Modal.close();
                Router.push(`/soundcloud/${data.id}`)
             }}>
            {/* 사진 */}
            {
                data?.image
                ?
                <div className=""></div>
                :
                <div className="w-12 h-12 uppercase bg-studion-400 rounded-full text-white flex items-center justify-center font-base text-xl">
                    {data.name.slice(0, 2)}
                </div>
            }
            <div className="ml-2 text-left text-base flex flex-col align-top">
            {/* 이름 */}
                <div className="h-5 font-semibold">{data.name}</div>
            {/* 이메일 */}
                <div className="text-gray-400">{data.email}</div>
            </div>
        </div>
    )
}

export default LikeModal;