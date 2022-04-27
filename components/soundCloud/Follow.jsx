import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../common/modals"
import wrapper from '../../redux/store';
import Loader from "../common/Loader";
import http from "../../http";

const Follow = ({ userId, kind }) => {
    const observerRef = useRef()
    const [usersData, setUsersData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [nextUrl, setNextUrl] = useState(null);
    // const dispatch = useDispatch();
    const onClickProfile = (ClickedUserId) => {
        console.log('onClickProfile')
        Modal.close();
        Router.push(`/soundcloud/${ClickedUserId}`)
    }
    const observer = (node) => {
        if (isLoading) return;
        if (observerRef.current) observerRef.current.disconnect();
    
        observerRef.current = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && nextUrl !== null) {
            setLoading(true)
            http.get(nextUrl)
            .then(res => {
                console.log(res)
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
            console.log('hello')
          }
        });
    
        node && observerRef.current.observe(node);
      };
    useEffect(() => {
        setLoading(true)
        http.get(`/follows/${userId}/${kind}`)
        .then(res => {
            console.log(res);
            setUsersData(res.data.follows.data)
            setNextUrl(res.data.follows.next_page_url)
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
        })
        // dispatch(getFollowUsersData({userId: userId, kind: kind}))
    }, [])
    return (
        <div className="w-full h-full relative">
            <header className="">
                <p className="font-bold">{kind =='follower' ? 'フォロワー' : 'フォロー中'}</p>
            </header>
            <div className="w-full h-fit text-left">
                {
                    usersData && 
                    usersData.map(userData => (
                        <User onClickProfile={onClickProfile} kind={kind} userData={userData} key={userData.id} />
                    ))
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
const User = ({userData, kind, onClickProfile}) => {
    
    const {follower, following} = userData

    return (
        <>
        {
            kind === 'follower' ?
            <div onClick={() => onClickProfile(follower.id)} className="hover:bg-gray-200 hover:cursor-pointer items-center p-1 flex w-full mt-2 duration-200">       
                <div>
                    {
                        follower?.image !== null 
                        ? <img src={info.image} />
                        : <div className="flex w-10 h-10 rounded-full bg-studion-400 items-center justify-center text-white">
                            {follower.name.slice(0, 2).toUpperCase()}
                        </div>
                    }
                </div>
                <div className="ml-3">
                    {/* name */}
                    <div className="font-semibold">
                        {follower?.name}
                    </div>

                    {/* email */}
                    <div className="text-base">
                        {follower?.email}
                    </div>
                </div>
            </div>
            :
            <div onClick={() => onClickProfile(following.id)} className="hover:bg-gray-200 p-1 hover:cursor-pointer flex items-center w-full mt-2">       
                <div>
                    {
                        following?.image !== null 
                        ? <img src={following?.image} />
                        : <div className="flex w-10 h-10 rounded-full bg-studion-400 items-center justify-center text-white">
                            {following?.name.slice(0, 2).toUpperCase()}
                        </div>
                    }
                </div>
                <div className="ml-3">
                    {/* name */}
                    <div className="font-semibold">
                        {following?.name}
                    </div>

                    {/* email */}
                    <div className="text-base">
                        {following?.email}
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default wrapper.withRedux(Follow);