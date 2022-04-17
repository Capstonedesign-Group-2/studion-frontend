import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"
import { Modal } from "../common/modals"
import CreatePost from "./CreatePost"
import styles from "../../styles/soundCloud/soundCloud.module.scss"
import { useEffect, useState } from "react"
import http from "../../http"
import { BiMessageDetail } from 'react-icons/bi'
import Link from "next/link"
import Follow from "./Follow"
import { getAnotherUserInfo, getFollowData } from "../../redux/actions/another"

const Profile = ({ userId }) => {
    const userData = useSelector(state => state.user.data)
    const userInfo = (useSelector(state => state.another.userInfo) !== null ? useSelector(state => state.another.userInfo) : userData)
    const following = useSelector(state => state.another.following);
    const [flwLoading, setFlwLoading] = useState(false);
    const dispatch = useDispatch();
    // dropdown
    const onClickFollow = () => {
        if (flwLoading) return;
        if (!following) return;
        setFlwLoading(true);
        if (following.status !== true) {
            http.post('/follows', {
                follower: userData.id,
                following: userInfo.id
            })
                .then(res => {
                    dispatch(getFollowData({ userInfo: userInfo.id, userData: userData.id }))
                    dispatch(getAnotherUserInfo({ id: userInfo.id }))
                    getFollowData();
                    setFlwLoading(false)
                })
                .catch(err => {
                    console.error(err);
                })
        } else {
            http.delete(`/follows/${following.follow_id}`)
                .then(res => {
                    console.log('delete', res);
                    dispatch(getAnotherUserInfo({ id: userInfo.id }))
                    dispatch(getFollowData({ userInfo: userInfo.id, userData: userData.id }));
                    setFlwLoading(false)
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }
    // 팔로우, 팔로잉 하는 유저 정보 알기
    const onClickFollowUser = (kind) => {
        Modal.fire({
            html: <Follow userId={userInfo.id} kind={kind} />,
            showConfirmButton: false,
            customClass: styles.followList,
        })
    }
    const onCreatePost = () => {
        Modal.fire({
            html: <CreatePost />,
            showConfirmButton: false,
            customClass: styles.post,
        })
    }

    useEffect(() => {
        console.log('following', following)
    }, [following])

    return (
        <div className="flex flex-col items-center xl:flex-row justify-between xl:items-end">
            <div className="w-full md:w-1/2">
                <div className="bg-white shadow-md rounded-md p-5 max-w-screen-sm w-full">
                    <div className="flex flex-col items-center md:items-start md:flex-row">
                        <div className="w-40 relative">
                            {userInfo?.image
                                ? <Image className="w-full rounded-full" src='/' layout="fill" alt="profile image" />
                                : <div className='flex w-full aspect-square rounded-full bg-studion-400 justify-center items-center text-white text-7xl md:text-4xl xl:text-5xl'>
                                    <p>{userInfo?.name.slice(0, 2).toUpperCase()}</p>
                                </div>
                            }
                        </div>
                        <div className="md:ml-10 w-full">
                            <div className="mb-2 md:mb-4">
                                <span className="text-xs text-gray-500 -mb-1 block">
                                    Name
                                </span>
                                <h3 className="font-medium text-3xl leading-8">
                                    {userInfo?.name}
                                </h3>
                            </div>
                            <div className="items-center grid grid-cols-2 mt-1 pr-24">
                                <div className="hover:cursor-pointer" onClick={() => onClickFollowUser('following')}>
                                    <span className="text-xs text-gray-500 block">
                                        フォロー
                                    </span>
                                    <h4>{userInfo?.followings}</h4>
                                </div>

                                <div className="relative ml-8">
                                    <div className="hover:cursor-pointer" onClick={() => onClickFollowUser('follower')}>
                                        <span className="text-xs text-gray-500 block ">
                                            フォロワー
                                        </span>
                                        <h4>{userInfo?.followers}</h4>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex justify-end items-center w-full md:w-1/2 ">
                        {
                            (userInfo?.id === userData?.id) ?
                                <>
                                    <a className="inline-flex w-full items-center justify-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:cursor-pointer hover:text-gray-500 focus:outline-none focus:border-studion-300 focus:ring focus:ring-studion-400 active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                                        Edit profile
                                    </a>
                                    <a className="ml-3 inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-studion-500 hover:cursor-pointer hover:bg-studion-400 active:bg-studion-500 transition ease-in-out duration-150">
                                        See profile
                                    </a>
                                </>
                                :
                                <>
                                    <div onClick={onClickFollow} style={(following?.status !== false) ? { background: "#206276", color: "white" } : {}} className="inline-flex w-full items-center justify-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:cursor-pointer hover:text-gray-500 focus:outline-none focus:border-studion-300 focus:ring focus:ring-studion-400 active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                                        {
                                            (following?.status !== true)
                                                ?
                                                <>
                                                    フォロー
                                                </>
                                                :
                                                <>
                                                    フォロー中
                                                </>
                                        }
                                    </div>
                                    <div className="w-full pt-2">
                                        <Link href="/chat">
                                            <a className="inline-flex w-full items-center">
                                                <BiMessageDetail className="inline-flex w-full h-6" href="/chat" />
                                            </a>
                                        </Link>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
            {/* create button */}
            <div className="w-full mt-4 md:w-1/2 xl:w-28">
                <button className="w-full bg-studion-500 rounded-md px-8 py-2 text-white hover:bg-studion-400 text-sm" onClick={onCreatePost}>作成</button>
            </div>
        </div>
    )
}

export default Profile;