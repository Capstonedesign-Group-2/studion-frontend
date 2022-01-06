import Image from "next/image"

const ChatItem = () => {

  // 남이 보냈을 때
  return (
    <div className="w-full flex gap-2">
      <div>
        {false
          ? <Image className="w-full rounded-full" src='/' layout="fill" alt="profile image"/>
          : <div className='flex-initial flex w-8 aspect-square rounded-full bg-studion-400 justify-center items-center text-white text-sm'>
              <p>{'userData.name'.slice(0, 2).toUpperCase()}</p>
            </div>
        }
      </div>
      <div className="w-full flex flex-col">
        <span className="text-gray-700 text-sm">
          Name
        </span>
        <div className="bg-white mr-8 text-gray-700 p-2 break-all self-start rounded-b-md rounded-tr-md shadow">
          apa ada yang bisa asdl;fkjzxc;vlkjasdflih
        </div>
      </div>
    </div>
  )

  // 내가 보냈을 때
  return (
    <div className="bg-studion-500 ml-8 text-white p-2 break-all self-end rounded-t-md rounded-bl-md shadow">
      Lorem ipsum dolor sit amet
    </div>
  )
}

export default ChatItem