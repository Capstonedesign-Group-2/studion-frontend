import EditCardModal from './EditCardModal'
import { Modal } from '../common/modals'
import styles from "../../styles/community/community.module.scss";

const Dropdown = ({image, Audio, user, content}) => {
    const onEditModal = () => {
        Modal.fire({
            html: <EditCardModal image={image} user={user} content={content}/>,
            showConfirmButton: false,
            customClass: styles.createSwal,
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
                Modal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                )
            }
        })
    }
    return (
        <div className="border-2 grid justify-items-center">
            <div>
                <button onClick={onEditModal}>수정</button>
            </div>
            <div>
                <button onClick={onDeleteModal}>삭제</button>
            </div>
        </div>
    )
}

export default Dropdown;