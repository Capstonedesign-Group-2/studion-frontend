import * as yup from 'yup'

export const joinValidation = yup.object().shape({
  confirmPassword: yup.string().required('비밀번호 확인을 입력해주세요.').oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
  password: yup.string().required('비밀번호를 입력해주세요.'),
  email: yup.string().email('이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
  name: yup.string().required('이름을 입력해주세요.'),
})

export const loginValidation = yup.object().shape({
  password: yup.string().required('비밀번호를 입력해주세요.'),
  email: yup.string().email('이메일 형식이 아닙니다.').required('이메일을 입력해주세요.'),
})
