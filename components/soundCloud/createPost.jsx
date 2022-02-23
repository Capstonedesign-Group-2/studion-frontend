import { useState, useEffect } from "react";
import { Modal, Toast } from "../common/modals";
import { useSelector, useDispatch } from 'react-redux';
import wrapper from '../../redux/store';
import http from "../../http/index";
import { getPostList } from "../../redux/actions/post";

const CreatePost = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.data);
    // const [image, setImage] = useState([]);
    // const [audio, setAudio] = useState([])
    
    const [post, setPost] = useState({
        user_id: userData.id,
        content: '',
        image: {},
        audio: {},
    })
    const onImageChange = (e) => {
        if(e.target.files.length) {
            let value = e.target.files[0];
            setPost({
                ...post,
                image : value,
            });
        }
        else {
            setPost(image = {});
        }
    }
    const onAudioChange = (e) => {
        if(e.target.files.length) {
            let value = e.target.files[0];
            
            setPost({
                ...post,
                audio: value
            });
        }
        else {
            setPost(audio = {});
        }
    }
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
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("user_id", post.user_id)
        formData.append("content", post.content)
        if(post.image.name) {
            formData.append("image", post.image)
        }
        if(post.audio.name) {
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
        if(post.image.name) {
            let imgEl = document.querySelector(".img_box");
            var reader = new FileReader();
            reader.readAsDataURL(post.image);
            reader.onload = (e) => (imgEl.src = e.target.result);
        }
        if(post.audio.name) {
            let audioEl = document.querySelector(".audio_box");
            var reader = new FileReader();
            reader.readAsDataURL(post.audio);
            reader.onload = (e) => (audioEl.src = e.target.result);
        }

    },[post.image, post.audio])
    
    return (
        <div className="max-w-screen-xl mx-auto h-full">
            <div className="absolute top-2 right-2 hover:scale-125" onClick={onClickCancel}>
                <svg className="w-10 h-10" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </div>
            <div className="mx-auto lg:flex h-full">
                <div className="relative w-full h-full max-w-lg mx-auto lg:mx-0 lg:max-w-xl bg-studion-500">
                    <div className="flex flex-col justify-items-center border-studion-200 border-2 h-full items-center justify-center">
                        {/* 사진 */}
                        <input type="file" name="" id="inputImg" accept="img/*" className="hidden" onChange={onImageChange}/>
                        {post.image.name
                        ?
                            <div className="border-2 border-black">
                                <img className="img_box"></img>
                            </div>
                        :   null
                        }
                        
                        {/* 오디오 */}
                        <input type="file" id="inputAudio" accept="audio/*" className="hidden" onChange={onAudioChange} />
                        
                            {post.audio.name
                            ?
                                <div className="w-full">
                                    <audio controls className="audio_box" style={{ width:"100%", padding:'5px', borderRadius:'0px'}}>
                                        {/* <source className="audio_box" type="audio/mp3"/> */}
                                    </audio>
                                </div>
                            :   null
                            }
                        
                    </div>
                    {/* 버튼 */}
                    <div className="absolute bottom-5">
                        <label htmlFor="inputImg" className="bg-studion-200 rounded-md hover:bg-studion-300" >
                            이미지 추가
                        </label>
                        <label htmlFor="inputAudio" className="bg-studion-200 rounded-md hover:bg-studion-300">
                            오디오 추가
                        </label>
                    </div>
                </div>
                {/* 컨탠츠 */}
                <div className="w-full max-w-md pl-2">
                    <div className="flex items-center mt-3">
                        <div className="rounded-full w-10 h-10 border-2 border-black" />
                        <span className="ml-2">{userData.name}</span>
                    </div>
                    <div className="mt-4 w-full px-3">
                        <textarea onChange={onContentChange} id=""  rows="10" placeholder="글 작성.." className="placeholder:italic placeholder:text-slate-400 resize-none border-2 border-black w-full decoration-none">

                        </textarea>
                        <div className="hover:bg-studion-500 text-2xl bg-studion-400 rounded-xl text-white" onClick={onPosting}>
                            제출
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default wrapper.withRedux(CreatePost);