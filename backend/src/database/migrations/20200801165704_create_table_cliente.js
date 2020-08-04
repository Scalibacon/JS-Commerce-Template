
exports.up = function(knex) {
    return knex.schema
    .createTable('cliente', table => {
        table.string('cpf').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('senha').notNullable();
        table.integer('telefone').notNullable();
    })
    .createTable('endereco', table => {
        table.string('cliente_cpf').primary();
        table.string('cep').notNullable();
        table.string('uf').notNullable();
        table.string('cidade').notNullable();
        table.string('bairro').notNullable();
        table.string('rua').notNullable();
        table.integer('numero').notNullable();
        table.string('complemento');        

        table.foreign('cliente_cpf').references('cpf').inTable('cliente');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('endereco')
    .dropTable('cliente')
};
