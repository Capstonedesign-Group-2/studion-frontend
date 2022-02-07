import styles from "../../styles/community/community.module.scss"
import ChatMember from "./ChatMember";
const ChatSection = () => {
    return (
        <div className={styles.chatSection}>
            {/* <div className={styles.profile}>
                <img src="https://randomuser.me/api/portraits/women/81.jpg" alt=""/>
                <span>userID</span>
            </div> */}
            <div className="bg-studion-300 text-white">
                <div className="ml-2">MESSAGE</div>
            </div>
            <div className="flex flex-col divide-y-2 overflow-auto w-auto h-72">
                {
                    chatMembers.map(chatMember => (
                        <ChatMember key={chatMember.id} chatMember={chatMember}/>
                    ))
                }
            </div>
        </div>
    )
}

export default ChatSection;

const chatMembers = [
    {
        id: 1,
        userName: 'HelloWorld',
        content: 'content a'
    },
    {
        id: 2,
        userName: 'userName',
        content: 'content b'
    },
    {
        id: 3,
        userName: 'userName',
        content: 'content c'
    },
    {
        id: 4,
        userName: 'userName',
        content: 'content d'
    },
    {
        id: 5,
        userName: 'userName',
        content: 'content d'
    },
    {
        id: 6,
        userName: 'userName',
        content: 'content d'
    },
    {
        id: 7,
        userName: 'userName',
        content: 'content d'
    },
]