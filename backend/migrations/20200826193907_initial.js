
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('user', table => {
      table.increments().comment('Id usuário')
      table.string('login').comment('Login')
      table.string('password').comment('Senha')
      table.string('hash').comment('Hash')
      table.string('role').defaultTo('user').comment('Cargo')
      table.boolean('active').defaultTo(true)
      table.unique('login')
      table.comment('Usuário')
    }),
    knex.schema.createTable('user_details', table => {
      table.increments().comment('id UserDetails')
      table.integer('user').comment('id usuario')
      table.foreign('user').references('user.id').onDelete('CASCADE')
      table.string('name').comment('Nome')
      table.string('full_name')
      table.string('register_number').comment('CPF')
      table.date('birth_date').comment('Data de nascimento')
    })
  ]).then(() => Promise.all([
    knex('user').insert({
      login: 'admin@icarus.com.br',
      password: '4at6pRU7RbiRGpJ2eNGCZDluHe1+zjfbhs/IeqFMfOmNmGvFSGvZESwcT3UT+uj9Qy6bE/xtGYI0Dz2C0OSrWA==',
      hash: 'i8Qh5AflwxaKboStBSc+oA==',
      role: 'admin'
    })
  ]))
}

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('user_details'),
  ]).then(() => Promise.all([
    knex.schema.dropTableIfExists('user')
  ]))
}
