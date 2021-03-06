import * as yup from 'yup'

export const joinValidation = yup.object().shape({
  password_confirmation: yup.string().required('비밀번호 확인을 입력해주세요.').oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
  password: yup.string().min(8, '비밀번호는 8글자 이상이여야 합니다.').required('비밀번호를 입력해주세요.'),
  email: yup.string().email('이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
  name: yup.string().required('이름을 입력해주세요.'),
})

export const loginValidation = yup.object().shape({
  password: yup.string().min(8, '비밀번호는 8글자 이상이여야 합니다.').required('비밀번호를 입력해주세요.'),
  email: yup.string().email('이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
})

export const createRoomValidation = yup.object().shape({
  roomInfo: yup.string().required('합주실 정보를 입력해주세요.'),
  title: yup.string().required('합주실 제목을 입력해주세요.'),
})

export const enterRoomPassword = yup.object().shape({
  password: yup.string().required('비밀번호를 입력해주세요.').oneOf([yup.ref('room_password'), null], '비밀번호가 일치하지 않습니다.')
})

export const updateAccountInfo = yup.object().shape({
  name: yup.string().required('이름을 입력해주세요.'),
})

export const updateEmail = yup.object().shape({
  email: yup.string().email('이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
})

// export const updateProfile = yup.object().shape({
//   image: yup.string().required('이름을 입력해주세요.'),
// })