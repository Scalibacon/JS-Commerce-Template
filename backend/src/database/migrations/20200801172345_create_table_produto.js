
exports.up = function(knex) {
    return knex.schema
    .createTable('categoria', table => {
        table.string('nome').primary();
    })
    .createTable('produto', table => {
        table.increments('id');
        table.string('nome').notNullable();
        table.string('categoria').notNullable();
        table.decimal('valor', 10, 2).notNullable();
        table.integer('estoque').notNullable();
        table.string('descricao', 1000).notNullable();

        table.foreign('categoria').references('nome').inTable('categoria');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('categoria')
    .dropTable('produto');
};
