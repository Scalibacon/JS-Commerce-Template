
exports.up = function(knex) {
    return knex.schema.createTable('adm', table => {
        table.string('cpf').primary();
        table.string('nome').notNullable();
        table.string('senha').notNullable();
        table.string('email').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('adm');
};
