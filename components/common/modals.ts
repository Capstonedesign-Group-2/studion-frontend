import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const Modal = withReactContent(Swal)

export const Toast = Modal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
