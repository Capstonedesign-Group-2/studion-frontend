import { useState, useEffect } from "react";
import { Modal, Toast } from "../common/modals";
import { useSelector, useDispatch } from 'react-redux';
import wrapper from '../../redux/store';
import http from "../../http/index";
import { getPostList } from "../../redux/actions/post";
import RecodePlayer from "./RecodePlayer";
import styles from "../../styles/soundCloud/soundCloud.module.scss";
const CreatePost = ({composers, blob}) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.data);
    // const [image, setImage] = useState([]);
    // const [audio, setAudio] = useState([])
    const [toggle, setToggle] = useState(false);
    const onToggle = () => {
        setToggle(!toggle);
    }
    const [post, setPost] = useState({
        user_id: userData.id,
        content: '',
        image: {},
        audio: {},
        with : [
            {
                id: 3,
                name: 'dong',
                image: '',
            },
            {
                id: 4,
                name: 'joon',
                image: '',
            },
            {
                id: 5,
                name: 'hong',
                image: '',
            },
        ]
    })
    const onChange = (e) => {
        if (e.target.files.length) {
            // console.log(e.target.files.type)
            let value = e.target.files[0];
            console.log(e.target.files);
            if(value.type.slice(0, 5) === "image"){
                setPost({
                    ...post,
                    image: value,
                });
            } else if(value.type.slice(0, 5) === "audio"){
                setPost({
                    ...post,
                    audio: value
                });    
            }
        }
        else {
            setPost({
                ...post,
                image: {},
                audio: {}
            });
        }
    }
    // const onAudioChange = (e) => {
    //     if (e.target.files.length) {
    //         let value = e.target.files[0];

    //         setPost({
    //             ...post,
    //             audio: value
    //         });
    //     }
    //     else {
    //         setPost({
    //             ...post,
    //             audio: {}
    //         });
    //     }
    // }
    const onContentChange = (e) => {
        const { value } = e.target;
        // console.log(value.replace(/(?:\r\n|\r|\n)/g, '<br />'));
        setPost({
            ...post,
            content: value
        })
    }
    const onClickCancel = () => {
        Modal.close()
    }
    const onPosting = () => {
        let formData = new FormData();
        let config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("user_id", post.user_id)
        formData.append("content", post.content)
        if (post.image.name) {
            formData.append("image", post.image)
        }
        if (post.audio.name) {
            formData.append("audio", post.audio)
        }
        http.post('/posts/create', formData, config)
            .then(res => {
                dispatch(getPostList())
                console.log(res);
                Toast.fire({
                    icon: 'success',
                    title: 'Save successfully'
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        // console.log('post')
        // console.log(post.image.size);
        // console.log(post.audio.size);
        console.log(post)
        if (((post.image.size !== undefined && toggle !== false) || (post.image.size !== undefined && post.audio.size === undefined && toggle !== true))) {
            let imgEl = document.querySelector(".img_box");
            var reader = new FileReader();
            reader.readAsDataURL(post.image);
            reader.onload = (e) => (imgEl.src = e.target.result);
            console.log(post.image)
        }
        if (post.audio.size) {
            console.log(post.audio)
        }

    }, [post.image, post.audio, toggle])

    return (
        <div className="max-w-screen-xl mx-auto h-full">
            {/* 나가기 버튼 */}
            <div className="absolute cursor-pointer top-2 right-2" onClick={onClickCancel}>
                <svg className="w-10 h-10" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </div>
            {/*  */}
            <div className="mx-auto lg:flex-row h-full flex flex-col">
                {/* 음악, 사진 */}
                <div className="flex relative flex-col items-center h-full justify-center w-full max-screen-w-lg mx-auto lg:mx-0 lg:max-w-3xl ">
                    <div className="w-full flex justify-center">
                        <label htmlFor="inputFiles" className="cursor-pointer" style={post.image.size||post.audio.size ? {display: "none"} : {display:"block"}}>
                            <svg aria-label="이미지나 동영상과 같은 미디어를 나타내는 아이콘" className="_8-yf5 " color="#262626" fill="#262626" height="200" role="img" viewBox="0 0 97.6 77.3" width="300">
                                <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path>
                                <path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path>
                                <path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
                            </svg>
                            클릭하세요
                        </label>
                    </div>
                    {/* 토글 */}
                {
                    (post.image.size !== undefined && post.audio.size !== undefined)
                    && (
                        <div className={styles.toggleBox} onClick={onToggle}>
                            <div className="text-xs text-white">
                                <svg style={{ width: "24px", height: "24px", marginLeft: "7px" }} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z" />
                                </svg>
                            </div>
                            <div className={styles.toggleBtn}
                                style={toggle ? { transform: 'translateX(44px)' } : {}}
                            >
                            </div>
                            <div className="text-xs text-white absolute right-0">
                                <svg style={{ width: "24px", height: "24px", marginRight: "8px" }} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
                                </svg>
                            </div>
                        </div>
                    )
                }
                    {/* 사진 */}
                    {/* <div className="flex h-full items-center justify-center w-full max-screen-w-lg" style={ (post.audios.length || post.images.length) ? {display: "flex"} : {display: "none"}}>
                        <Player audio={post.audios} image={post.images} />
                    </div> */}
                    <input type="file" id="inputFiles" accept="img/*" className="hidden" onChange={onChange} />
                    
                    {((post.image.size !== undefined && toggle !== false) || (post.image.size !== undefined && post.audio.size === undefined && toggle !== true))
                        &&
                        <div className="">
                            <img className="img_box object-contain"></img>
                        </div>
                        
                    }

                    {/* 오디오 */}
                    {/* <input type="file" id="inputAudio" accept="audio/*" className="hidden" onChange={onAudioChange} /> */}
                    {(post.audio.size !== undefined && toggle !== true) &&
                        <div className="w-full md:max-w-xl lg:max-w-2xl relative">
                            <RecodePlayer audio={post.audio}/>
                        </div>
                        
                    }
                    {/* <div className="flex h-full items-center justify-center w-full max-screen-w-lg" style={ (post.audios || post.images) ? {display: "flex"} : {display: "none"}}>
                        <Player audio={post.audios} image={post.images} />
                    </div> */}
                </div>
                {/* 버튼 */}

                {/* 컨탠츠 */}
                <div className="w-full mx-auto pt-5 max-w-3xl lg:max-w-lg pl-2">
                    <div className="flex items-center mt-3">
                        {
                            userData.image
                            ?
                                <img src={userData.image} />
                            :
                                <div className="rounded-full w-10 h-10 bg-studion-200 text-white font-lite text-lg flex items-center justify-center" >
                                    {userData.name.slice(0, 2).toUpperCase()}
                                </div>
                            
                        }
                        <span className="ml-2 font-semibold">{userData.name}</span>
                    </div>
                    <div className="mt-4 w-full px-3">
                        <textarea onChange={onContentChange} id="" rows="10" placeholder="글 작성.." className="placeholder:italic placeholder:text-slate-400 resize-none border-2 border-black w-full decoration-none">

                        </textarea>
                        <div className="cursor-pointer hover:bg-studion-500 text-2xl bg-studion-400 rounded-xl text-white" onClick={onPosting}>
                            제출
                        </div>
                    </div>
                    <div className="w-full flex justify-center pt-20">
                        <label htmlFor="inputFiles" className="cursor-pointer" style={post.image.size||post.audio.size ? {display: "block"} : {display:"none"}}>
                            <svg aria-label="이미지나 동영상과 같은 미디어를 나타내는 아이콘" className="_8-yf5 " color="#262626" fill="#262626" height="200" role="img" viewBox="0 0 97.6 77.3" width="300">
                                <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path>
                                <path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path>
                                <path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path>
                            </svg>
                            클릭하세요
                        </label>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default wrapper.withRedux(CreatePost);
