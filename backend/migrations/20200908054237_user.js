
exports.up = function(knex) {
  return Promise.all([
    knex.schema.alterTable('user_details', table => {
      table.string('photo').comment('User photo')
    })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.alterTable('user_details', table => {
      table.dropColumn('photo')
    })
  ])
}
