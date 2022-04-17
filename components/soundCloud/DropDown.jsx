import { Modal } from '../common/modals'
import styles from "../../styles/soundCloud/soundCloud.module.scss";
import http from '../../http/index';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPostList, getPostList } from '../../redux/actions/post';
import EditCard from './EditCard';
const Dropdown = ({post, userId}) => {
    const userData = useSelector(state => state.user.data)
    const dispatch = useDispatch();
    const onEditModal = () => {
        Modal.fire({
            html: <EditCard userId={userId} pevPost={post}/>,
            showConfirmButton: false,
            customClass: styles.post,
            width: '1024px',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
        })
    }
    const onDeleteModal = () => {
        Modal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    user_id: userData.id
                }
                http.delete(`/posts/${post.id}`, {
                    data : data
                })
                .then(res => {
                    if(userId !== undefined)
                        dispatch(getUserPostList({id: userId}));
                    else 
                        dispatch(getPostList());

                    console.log(res);
                    Modal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                        )
                })
                .catch(err => {
                    console.log(err)
                })
            }
        })
    }
    return (
        <div className={styles.dropDown}>
            <button onClick={onEditModal}>수정</button>            
            <button onClick={onDeleteModal}>삭제</button>
        </div>
    )
}

export default Dropdown;