import styles from "../../styles/community/community.module.scss"
import CommunityCard from "./CommunityCard";
import { useState, useRef } from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
const CommunitySection = (props) => {
    const { posts } = props;
    const postList = useSelector(state => state.post.postList)
    const [input, setInput] = useState({
        content: ''
    });

    const [comment, setComment] = useState();
    const onChange = useCallback(e => {
        const { name, value } = e.target;
        setInput(input => ({
            ...input,
            [name] : value
        }));
    }, []);
    const onCreate = useCallback(() => {
        const comment = {
            id: 1,
            post_id: 1,
            user_id: 1,
            user: {
                id: 1,
                name: 'ppang',
                email: 'kki4504@gmail.com',
                image: 'https://randomuser.me/api/portraits/women/81.jpg',
            },
            content: input.content
        }
        setInputs({
            content: '',
        })
    },[input.content])
    const topRef = useRef()
    return (
        <div className={ styles.communitySection }>
            {postList && 
                postList.map(post => (
                    <CommunityCard post={post} key={post.id} onChange={onChange} onCreate={onCreate}/>
                )) 
            }
            {/* <CommunityCard /> */}
            {/* {
                cards.map((card, index) => {
                    <CommunityCard key={card.userId+index} card={card} />
                })
            } */}
        </div>
    )
}

export default CommunitySection;