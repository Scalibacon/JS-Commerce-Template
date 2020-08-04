
exports.up = function(knex) {
    return knex('adm').insert({
        cpf: '00000000000',
        nome: 'The Elder ADM',
        email: 'theelder@dm.com',
        senha: '34cdd9dd325cdfe1aeb54ed2874b79e8'
    })
};

exports.down = function(knex) {
    return knex.migrate.rollback();
};
