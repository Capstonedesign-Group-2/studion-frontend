import styles from "../../styles/community/community.module.scss"
const ChatMember = ({ chatMember }) => {

    return (
        <div className={styles.chatMember}>
            <div>
                {chatMember.image
                    ? <img src="https://randomuser.me/api/portraits/women/81.jpg" alt="" />
                    : <img src="https://randomuser.me/api/portraits/women/81.jpg" alt="" />
                }
            </div>
            <div className="ml-2">
                <div className={styles.userName}>{chatMember.userName}</div>
                <div className={styles.chat}>{chatMember.content}</div>
            </div>
        </div>
    )
}

export default ChatMember