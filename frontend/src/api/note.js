import api from '../libs/api'

const getAll = async () => {
  const { data } = await api.get('note')
  return data
}

const getAllAssigned = async () => {
  const { data } = await api.get(`note/assigned`)
  return data
}

const getUserNotes = async (user) => {
  const { data } = await api.get(`note/user/${user}`)
  return data
}

const get = async (id) => {
  const { data } = await api.get(`note/${id}`)
  return data
}

const create = async (note) => {
  const { data } = await api.post('note', note)
  return data
}

const update = async (id, note) => {
  const { data } = await api.put(`note/${id}`, note)
  return data
}

const remove = async (id) => {
  const { data } = await api.delete(`note/${id}`)
  return data
}

const assignCard = async (id, assing) => {
  const { data } = await api.put (`note/assign/${id}/${assing}`)
  return data
}


export {
  getAll,
  getAllAssigned,
  getUserNotes,
  get,
  create,
  update,
  remove,
  assignCard
}
