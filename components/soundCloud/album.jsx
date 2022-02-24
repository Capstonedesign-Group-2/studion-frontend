import { stayLoggedIn } from "../../http/stay";
import styles from "../../styles/soundCloud/soundCloud.module.scss"
import Link from "next/link"
import { Modal } from "../common/modals";
import Post from "./postContainer"
const Album = ({ post }) => {
    const openModal = () => {
        Modal.fire({
            html: <Post />,
            showConfirmButton: false,

            customClass: styles.post,
            // width: '1024px'
        })
    }
    return (
        <div className="w-full aspect-[5/4]" onClick={openModal}>
            <div className={styles.album}>
                <div className={styles.disk}>
                    <div className={styles.disk_inner}></div>
                </div>
                <div className="relative bg-studion-500 z-10 h-full aspect-square">
                    {/* <Link href="/">
                        <a href=""></a>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default Album;