import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import http from "../../http/index";
import wrapper from "../../redux/store";
import { Modal } from "../common/modals";

const EditCard = ({pevPost}) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.data);
    // const [image, setImage] = useState([]);
    // const [audio, setAudio] = useState([])
    
    const [post, setPost] = useState({
        user_id: userData.id,
        content: pevPost.content,
        image: pevPost.images.length ? pevPost.images : {},
        audio: pevPost.audios.length ? pevPost.audios : {},
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
        if(post.image !== null) {
            formData.append("image", post.image)
        }
        if(post.audio !== null) {
            formData.append("audio", post.audio)
        }
        http.post(`/posts/update/${post.id}`,{_method: 'patch'}, formData, config)
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
        console.log(pevPost);
        let imgEl = document.querySelector(".img_box");
        let audioEl = document.querySelector(".audio_box");
        var reader = new FileReader();
        
        if(pevPost.images.length) {
            imgEl.src = pevPost.images[0].link
        }
        if(pevPost.audios.length) {
            audioEl.src = pevPost.audios[0].link
        }
        if(post.image.name) {
            console.log(post.image)
            reader.readAsDataURL(post.image);
            reader.onload = (e) => (imgEl.src = e.target.result); 
        }
        if(post.audio.name) {
            reader.readAsDataURL(post.audio);
            reader.onload = (e) => (audioEl.src = e.target.result);
        }

    },[post.image, post.audio])
    return (
        <div className="max-w-screen-xl mx-auto h-full">
            {/* 나가기 버튼 */}
            <div className="absolute cursor-pointer top-2 right-2 hover:scale-125" onClick={onClickCancel}>
                <svg className="w-10 h-10" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </div>
            {/*  */}
            <div className="mx-auto lg:flex h-full">
                {/* 음악, 사진 */}
                <div className="flex flex-col items-center h-full justify-center w-full max-screen-w-lg mx-auto lg:mx-0 lg:max-w-3xl ">
                    {/* 사진 */}
                    <input type="file" name="" id="inputImg" accept="img/*" className="hidden" onChange={onImageChange}/>
                    {post.image.length || post.image.name
                    ?
                        <div className="border-2 border-black">
                            <img id="img_box" className="img_box object-contain"></img>
                        </div>
                    :   null
                    }
                    
                    {/* 오디오 */}
                    <input type="file" id="inputAudio" accept="audio/*" className="hidden" onChange={onAudioChange} />
                    {post.audio.length || post.audio.name
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
                        이미지 수정
                    </label>
                    <label htmlFor="inputAudio" className="bg-studion-200 rounded-md hover:bg-studion-300">
                        오디오 수정
                    </label>
                </div>
                {/* 컨탠츠 */}
                <div className="w-full max-w-md pl-2">
                    <div className="flex items-center mt-3">
                        <div className="rounded-full w-10 h-10 border-2 border-black" />
                        <span className="ml-2">{userData.name}</span>
                    </div>
                    <div className="mt-4 w-full px-3">
                        <textarea onChange={onContentChange} id="" value={post.content}  rows="10" placeholder="글 작성.." className="placeholder:italic placeholder:text-slate-400 resize-none border-2 border-black w-full decoration-none">

                        </textarea>
                        <div className="cursor-pointer hover:bg-studion-500 text-2xl bg-studion-400 rounded-xl text-white" onClick={onPosting}>
                            수정
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default wrapper.withRedux(EditCard);