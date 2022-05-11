import { Modal } from "../../common/modals";
import { useEffect, useState, useRef } from "react"
import http from "../../../http";
import { useSelector, useDispatch } from 'react-redux';
import wrapper from '../../../redux/store';
import Loader from "../../common/Loader";
import Router from "next/router";
import { getAnotherUserInfo } from "../../../redux/actions/another";
import Socket from "../../../socket/index";
const CreateChat = () => {
    const observerRef = useRef()
    const userData = useSelector(state => state.user.data)
    
    const [nextUrl, setNextUrl] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState([]);

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
                    ...res.data.follows.data
                ])
                setNextUrl(res.data.follows.next_page_url)
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
    useEffect (() => {
        setLoading(true)
        http.get(`/follows/${userData.id}/follower`)
        .then(res => {
            setUsersData(res.data.follows.data)
            setNextUrl(res.data.follows.next_page_url)
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            setLoading(false)
        })
    }, [])  
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex border-b">
                <div className="absolute cursor-pointer top-2 left-2" onClick={() => Modal.close()}>
                    <svg className="w-8 h-8" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </div>
                <div className="flex-1 justify-self-center">
                    新しいトーク
                </div>
                <div className="text-studion-300 hover:text-studion-400 absolute top-2 right-2">
                    送り
                </div>
            </div>
            <div className="w-full flex-1 overflow-y-auto">
                {
                    usersData.map((userData) => <User data={userData.follower} key={userData.id} />)
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
    )
}

const User = ({data}) => {
    const userData = useSelector(state => state.user.data)
    const dispatch = useDispatch()
    const onClick = () => {
        Modal.close();
        dispatch(getAnotherUserInfo({id: data.id}))
        Socket.socket.on("create_chat_on", (res) => {
            Router.push(`/chat/${res.id}`)
            return () => {
                Socket.removeAllListeners()
              }
        })
        Socket.socket.emit("create_chat", [
            {
                user_id: userData.id,
                name: userData.name,
                image: userData.image
            },
            {
                user_id: data.id,
                name: data.name,
                image: data.image
            }
        ])
    }
    return (
        <div className="flex items-center py-2 pl-2 hover:bg-gray-100 cursor-pointer" 
        onClick={onClick
            // (data) => {
            // console.log(data)
            
            // // Socket.socket.emit("get_messages", {
            // //     room_id: listInfo.id,
            // //     user_id: data.id
            // // })
            // Router.push(`/chat/${data.id}`)
        }>
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

export default wrapper.withRedux(CreateChat);