import CommunityNavigation from "./CommunityNavigation";
import ChatSection from "./ChatSection";
import styles from "../../styles/community/community.module.scss"

const RightSection = () => {
    return (
        <div className={ styles.rightSection }>
            <ChatSection />
            <CommunityNavigation />
        </div>            
    )
}

export default RightSection;