
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('note', table => {
      table.increments().comment('Id da nota'),
      table.integer('user').comment('id usuario')
      table.foreign('user').references('user.id').onDelete('CASCADE')
      table.string('title').comment('Titulo')
      table.string('subtitle').comment('Subtitulo')
      table.text('text').comment('Texto')
    })
  ])
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('note')
  ])
}
