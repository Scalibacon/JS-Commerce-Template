const { celebrate, Segments, Joi } = require('celebrate');

module.exports.validarClienteBody = (isCreate) => {
    return celebrate({
        [Segments.BODY] : Joi.object().keys({
            cpf: (isCreate ? Joi.string().pattern(/^[0-9]+$/).length(11).required()
                .error(new Error('CPF inválido')) : ""),
            nome: Joi.string().required().error(new Error('Nome inválido')), 
            email: Joi.string().email().required().error(new Error('Email inválido')),
            senha: (isCreate ? Joi.string().min(5).required()
                .error(new Error('A senha é muito curta')) : "" ),
            senha2: (isCreate ? Joi.string().required()
                .error(new Error('Confirmação de senha inválida')) : "" ),
            telefone: Joi.string().pattern(/^[0-9]+$/).required().error(new Error('Telefone inválido')),
            cep: Joi.string().length(8).pattern(/^[0-9]+$/).required().error(new Error('CEP inválido')),
            uf: Joi.string().required().length(2).error(new Error('UF inválido')),
            cidade: Joi.string().required().error(new Error('Cidade inválida')),
            bairro: Joi.string().required().error(new Error('Bairro inválido')),
            rua: Joi.string().required().error(new Error('Rua inválida')),
            numero: Joi.number().required().error(new Error('Número inválido')),
            complemento: Joi.string().max(255).error(new Error('Complemento deveras grande'))
        })
    });
}

module.exports.validarCpfParams = () => {
    return celebrate({
        [Segments.PARAMS] : Joi.object().keys({
            cpf: Joi.string().pattern(/^[0-9]+$/).length(11).required().error(new Error('CPF inválido'))
        })
    })
}

module.exports.validarSenhasBody = () => {
    return celebrate({
        [Segments.BODY] : Joi.object().keys({
            antiga: Joi.string().min(5).required().error(new Error('Senha antiga inválida')),
            nova: Joi.string().min(5).required().error(new Error('Senha nova muito curta')),
            confirma: Joi.string().required().error(new Error('Confirmação de senha inválida'))
        })
    });
}

module.exports.validarAdmBody = () => {
    return celebrate({
        [Segments.BODY]: Joi.object().keys({
            cpf: Joi.string().pattern(/^[0-9]+$/).length(11).required().error(new Error('CPF inválido')),
            nome: Joi.string().required().error(new Error('Nome inválido')),
            email: Joi.string().email().required().error(new Error('Email inválido')),
            senha: Joi.string().min(5).required().error(new Error('A senha é muito curta')),
            senha2: Joi.string().required().error(new Error('Confirmação de senha inválida')),
        })
    });
}

module.exports.validarProdutoBody = () => {
    return celebrate({
        [Segments.BODY] : Joi.object().keys({
            nome: Joi.string().required().error(new Error('Nome inválido')),
            categoria: Joi.string().required().error(new Error('Categoria inválida')),
            valor: Joi.number().positive().precision(2).required().error(new Error('Valor inválido')),
            estoque: Joi.number().positive().integer().required().error(new Error('Estoque inválido')),
            descricao: Joi.string().required().error(new Error('Descrição inválida')),
        })
    });
}

module.exports.validarProdutoIdParams = () => {
    return celebrate({
        [Segments.PARAMS] : Joi.object().keys({
            id: Joi.number().integer().positive().required().error(new Error('ID inválido'))
        })
    });
}