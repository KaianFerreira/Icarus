import api from '../libs/api'

const signIn = async (login, password) => {
  const { data } = await api.post('auth/signin', { login, password })
  return data
}

const signOn = async (
  login,
  password,
  name,
  fullName,
  registerNumber,
  birthDate
) => {
  const { data } = await api.post('auth/signon', {
    login,
    password,
    name,
    fullName,
    registerNumber,
    birthDate
  })
  return data
}

const getProfile = async () => {
  const { data } = await api.get('auth/user')
  return data
}

const getProfileByUser = async (user) => {
  const { data } = await api.get(`auth/user/${user}`)
  return data
}

const get = async () => {
  const { data } = await api.get('auth/user')
  return data
}

const forgotPassMail = async (login) => {
  const { data } = await api.post('mail/forgot-pass', { login })
  return data
}

const forgotPassChange = async (
  login,
  code,
  password1,
  password2
) => {
  const { data } = await api.put('auth/forgot-pass', {
    login,
    code,
    password1,
    password2
  })
  return data
}

export {
  signIn,
  signOn,
  get,
  getProfile,
  getProfileByUser,
  forgotPassMail,
  forgotPassChange
}
