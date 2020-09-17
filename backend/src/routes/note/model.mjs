import knex from '../config/knex.mjs'

const getAll = async () => {
  return knex('note')
    .leftJoin('user_details', 'user_details.user', 'note.user')
    .select(
      'note.id',
      'note.title',
      'note.subtitle',
      'note.text',
      'note.signed',
      'user_details.name as user',
      'user_details.photo as userPhoto'
    )
}

const getAllAssigned = async () => {
  return knex('note')
  .leftJoin('user_details', 'user_details.user', 'note.user')
  .select(
    'note.id',
    'note.title',
    'note.subtitle',
    'note.text',
    'note.signed',
    'user_details.name as user',
    'user_details.photo as userPhoto'
    )
  .where('note.signed', true)
}

const get = async (id) => {
  console.log(id)
  return knex('note')
    .where('id', id)
    .first()

}

const getUser = async (user) => {
  return knex('note')
    .leftJoin('user_details', 'user_details.user', 'note.user')
    .select(
      'note.id',
      'note.title',
      'note.subtitle',
      'note.text',
      'note.signed',
      'user_details.name as user',
      'user_details.photo as userPhoto'
    )
    .where('note.user', user)
}

const create = (note) => {
  return knex('note').insert({
    title: note.title,
    subtitle: note.subtitle,
    text: note.text,
    user: note.user
  }).returning(['id', 'title'])
}

const update = (id, note) => {
  return knex('note').update({
    title: note.title,
    subtitle: note.subtitle,
    text: note.text
  }).where('id', id)
  .returning(['id', 'title'])
}

const remove = (id) => {
  return knex('note')
    .where('id', id)
    .del()
}

const assign = (id, sign) => {
  return knex('note')
    .where('id', id)
    .update('signed', sign)
}

export {
  getAll,
  getAllAssigned,
  get,
  getUser,
  create,
  update,
  remove,
  assign
}
