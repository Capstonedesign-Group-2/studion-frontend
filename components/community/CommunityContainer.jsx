import RightSection from "./RightSection";
import CommunitySection from "./CommunitySection";
import CreateCard from "./CreateCard";
import { Modal } from '../common/modals'

import styles from "../../styles/community/community.module.scss"

const CommunityContainer = () => {
    const onShowModal = () => {
        Modal.fire({
            html: <CreateCard user={user}/>,
            showConfirmButton: false,
            customClass: styles.createSwal,
            
        })
    }
    return (
    <div className="max-w-screen-lg mx-auto pt-24">
        <div className="flex lg:mx-28">   
            <div className={ styles.communityContainer }>
                <CommunitySection posts={posts}/>
            </div>
            <div className="hidden lg:block ml-2">
                <div className="fixed">
                    <div className="w-full">
                        <div className={styles.createButton}>
                            <button onClick={onShowModal}>
                                Create
                            </button>
                            {/* <svg onClick={onShowModal} ariaLabel="새로운 게시물" className="" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
                            </svg> */}
                        </div>
                    </div>    
                    <RightSection />
                </div>
            </div>
        </div>
    </div>
    )
}

export default CommunityContainer;

const user = {
    id: '1',
    name: 'ppang',
    email: 'ppang@gmail.com',
    image: 'https://randomuser.me/api/portraits/women/81.jpg'
}
const posts = [
    {
        id: 1,
        user_id: 1,
        // title: 'title',
        Audio: {
            id: 1,
            title: 'This is my voice',
            time: 20,
            audioPath: 'https://www.kozco.com/tech/LRMonoPhase4.mp3',
        },
        content: 'new content',
        flag: 0,
        image: 'https://via.placeholder.com/200x20?text=no+image',
        user: {
            id: 1,
            name: 'ppang',
            email: 'ppang@naver.com',
            image: 'https://randomuser.me/api/portraits/women/81.jpg',
        },
        // 코맨트 user_id에 따른 user정보도 필요
        comments: [
            {
                id: 2,
                post_id: 1,
                user_id: 3,
                user: {
                    id: 3,
                    name: 'scPark',
                    email: 'scPark@naver.com',
                    image: 'https://randomuser.me/api/portraits/women/81.jpg',
                },
                content: 'comment 1'
            },
            {
                id: 5,
                post_id: 1,
                user_id: 6,
                user: {
                    id: 3,
                    name: 'dhPark',
                    email: 'dhPark@naver.com',
                    image: 'https://randomuser.me/api/portraits/women/81.jpg',
                },
                content: 'comment 2'
            }
        ] 
    },
    {
        id: 2,
        user_id: 3,
        // title: 'title',
        content: 'new content',
        flag: 0,
        image: 'https://via.placeholder.com/200x400?text=no+image',
        user: {
            id: 3,
            name: 'scPark',
            email: 'scPark@naver.com',
            image: 'https://randomuser.me/api/portraits/women/81.jpg',
        },
        Audio: {
            id: 2,
            title: 'This is my voice2',
            time: 30,
            audioPath: 'https://www.kozco.com/tech/LRMonoPhase4.mp3',
        },
        comments: [
            {
                id: 2,
                post_id: 1,
                user_id: 3,
                user: {
                    id: 3,
                    name: 'scPark',
                    email: 'scPark@naver.com',
                    image: 'https://randomuser.me/api/portraits/women/81.jpg',
                },
                content: 'comment 1'
            },
            {
                id: 5,
                post_id: 1,
                user_id: 6,
                user: {
                    id: 3,
                    name: 'dhPark',
                    email: 'dhPark@naver.com',
                    image: 'https://randomuser.me/api/portraits/women/81.jpg',
                },
                content: 'comment 2'
            }
        ] 
    },
    {
        id: 3,
        user_id: 6,
        // title: 'title',
        content: 'new content',
        flag: 0,
        image: 'https://via.placeholder.com/200x400?text=no+image',
        Audio: {
            id: 3,
            title: 'This is my voice3',
            time: 40,
            audioPath: 'https://www.kozco.com/tech/LRMonoPhase4.mp3',
        },
        user: {
            id: 6,
            name: 'dhPark',
            email: 'dhPark@naver.com',
            image: 'https://randomuser.me/api/portraits/women/81.jpg',
        },
        comments: [
            {
                id: 2,
                post_id: 1,
                user_id: 3,
                user: {
                    id: 3,
                    name: 'scPark',
                    email: 'scPark@naver.com',
                    image: 'https://randomuser.me/api/portraits/women/81.jpg',
                },
                content: 'comment 1'
            },
            {
                id: 5,
                post_id: 1,
                user_id: 6,
                user: {
                    id: 3,
                    name: 'dhPark',
                    email: 'dhPark@naver.com',
                    image: 'https://randomuser.me/api/portraits/women/81.jpg',
                },
                content: 'comment 2'
            }
        ] 
    },
    
];