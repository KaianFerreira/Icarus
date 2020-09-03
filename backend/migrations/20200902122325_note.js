
exports.up = function(knex) {
  return Promise.all([
    knex.schema.alterTable('note', table => {
      table.boolean('signed').comment('Assinada')
    })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.alterTable('note', table => {
      table.dropColumn('signed')
    })
  ])
}
