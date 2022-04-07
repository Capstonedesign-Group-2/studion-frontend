import Router from "next/router";
import { Modal } from "../common/modals"
const Follow = ({ followUserInfos }) => {
    const onClickProfile = (ClickedUserId) => {
        console.log('onClickProfile')
        Modal.close();
        Router.push(`/soundcloud/${ClickedUserId}`)
    }
    return (
        <div className="w-full h-full relative">
            <header className="">
                <p className="font-bold">{followUserInfos.kind =='follower' ? 'フォロワー' : 'フォロー中'}</p>
            </header>
            <div className="w-full h-fit text-left">
                {
                    followUserInfos && 
                    followUserInfos.follows.map(followUserInfo => (
                        <User onClickProfile={onClickProfile} kind={followUserInfos.kind} followUserInfo={followUserInfo} key={followUserInfo.id} />
                    ))
                }
            </div>
        </div>
    )
}
const User = ({followUserInfo, kind, onClickProfile}) => {
    
    const {follower, following} = followUserInfo

    return (
        <>
        {
            kind === 'follower' ?
            <div onClick={() => onClickProfile(follower.id)} className="hover:bg-gray-200 hover:cursor-pointer items-center p-1 flex w-full mt-2 duration-200">       
                <div>
                    {
                        follower.image !== null 
                        ? <img src={info.image} />
                        : <div className="flex w-10 h-10 rounded-full bg-studion-400 items-center justify-center text-white">
                            {follower.name.slice(0, 2).toUpperCase()}
                        </div>
                    }
                </div>
                <div className="ml-3">
                    {/* name */}
                    <div className="font-semibold">
                        {follower.name}
                    </div>

                    {/* email */}
                    <div className="text-base">
                        {follower.email}
                    </div>
                </div>
            </div>
            :
            <div onClick={() => onClickProfile(following.id)} className="hover:bg-gray-200 p-1 hover:cursor-pointer flex items-center w-full mt-2">       
                <div>
                    {
                        following.image !== null 
                        ? <img src={info.image} />
                        : <div className="flex w-10 h-10 rounded-full bg-studion-400 items-center justify-center text-white">
                            {following.name.slice(0, 2).toUpperCase()}
                        </div>
                    }
                </div>
                <div className="ml-3">
                    {/* name */}
                    <div className="font-semibold">
                        {following.name}
                    </div>

                    {/* email */}
                    <div className="text-base">
                        {following.email}
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Follow;