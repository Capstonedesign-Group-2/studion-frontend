const Follow = ({ followUserInfos }) => {
    return (
        <div className="w-full h-full relative">
            <header className="">
                <p className="font-bold">{followUserInfos.kind}</p>
            </header>
            <div className="w-full h-fit text-left">
                {
                    followUserInfos && 
                    followUserInfos.follows.map(followUserInfo => (
                        <User kind={followUserInfos.kind} followUserInfo={followUserInfo} key={followUserInfo.id} />
                    ))
                }
            </div>
        </div>
    )
}
const User = ({followUserInfo, kind}) => {
    
    const {follower, following} = followUserInfo

    return (
        <>
        {
            kind === 'follower' ?
            <a href={`/soundcloud/${follower.id}`} className="hover:bg-gray-200 hover:cursor-pointer flex w-full mt-2">       
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
            </a>
            :
            <a href={`/soundcloud/${following.id}`} className="hover:bg-gray-200 hover:cursor-pointer flex w-full mt-2">       
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
            </a>
        }
        </>
    )
}

export default Follow;