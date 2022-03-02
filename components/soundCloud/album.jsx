import styles from "../../styles/soundCloud/soundCloud.module.scss"
import Link from "next/link"
import { Modal } from "../common/modals";
import PostContainer from "./PostContainer"

const Album = ({ post }) => {
    const openModal = () => {       
        Modal.fire({
            html: <PostContainer post={post} />,
            showConfirmButton: false,
            
            customClass: styles.post,
            // width: '1024px'
        })
    }
    return (
        <div className="w-full aspect-[5/4] cursor-pointer" onClick={openModal}>            
            <div className={styles.album}>
                <div className={styles.disk}>
                    <div className={styles.disk_inner}></div>
                </div>
                <div className="relative bg-studion-600 z-10 h-full aspect-square">
                    {
                        post.images.length
                        ?
                            <img className="object-contain h-full w-full" src={post.images[0].link} alt="" />
                        :
                            <div className="h-full w-full flex items-center pl-2 text-white text-2xl whitespace-pre-line">
                                {post.content}
                            </div>
                    }
                    
                    {/* <Link href="/">
                        <a href=""></a>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default Album;