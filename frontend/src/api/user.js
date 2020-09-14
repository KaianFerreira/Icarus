import api from '../libs/api'

const get = async (id) => {
  const { data } = await api.get(`user/${id}`)
  return data
}

const update = async (
  id,
  name,
  fullName,
  registerNumber,
  birthDate,
  role,
  photo = null,
  active,
  login,
  password
) => {
  const formData = new FormData()
  if (photo) formData.append('photo', photo)
  if (name) formData.append('name', name)
  if (fullName) formData.append('fullName', fullName)
  if (registerNumber) formData.append('registerNumber', registerNumber)
  if (birthDate) formData.append('birthDate', birthDate)
  if (role) formData.append('role', role)
  if (active) formData.append('active', active)
  if (login) formData.append('login', login)
  if (password) formData.append('password', password)
  const { data } = await api.put(`user/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  return data
}

const remove = async (id) => {
  const { data } = await api.delete(`user/${id}`)
  return data
}



export {
  get,
  update,
  remove,
}
