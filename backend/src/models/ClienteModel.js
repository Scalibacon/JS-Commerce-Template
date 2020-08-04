const connection = require('../database/connection');
const md5 = require('md5');

async function cadastrarCliente(cliente){
    const { cpf, nome, email, senha, senha2, telefone, 
            cep, uf, cidade, bairro, rua, numero, complemento } = cliente;

    const cliente_existente = await buscarCliente(cpf);

    if(cliente_existente){
        if(cliente_existente.error)
            return {error: true, message: "Falha ao cadastrar cliente"}
        
        return {error: true, message: "CPF já cadastrado"}
    }

    try {
        if(senha !== senha2)
            return {error: true, message: "Confirmação de senha incorreta"}

        const senha_cripto = md5(senha);
        await connection('cliente').insert({ 
            cpf, nome, email, senha: senha_cripto, telefone 
        });
        await connection('endereco').insert({
            cliente_cpf: cpf, cep, uf, cidade, bairro, rua, numero, complemento 
        });

        return {success: true};
    } catch(err){
        console.log(err);
        return {error: true, message: "Falha ao cadastrar cliente"}
    }    
}

async function buscarCliente(cpf){
    try {
        const cliente = await connection('cliente AS c')
            .join('endereco AS e', 'c.cpf', '=', 'cliente_cpf')
            .select('*').where('c.cpf', cpf).first();

        return cliente;
    } catch(err){
        console.log(err);
        return {error: true, message: "Falha ao buscar cliente"}
    }
}

async function listarClientes(){
    try {
        const clientes = await connection('cliente AS c')
            .join('endereco AS e', 'c.cpf', 'e.cliente_cpf')
            .select('*');

        return clientes;
    } catch(err){
        console.log(err);
        return {error: true, message: "Falha ao listar clientes"}
    }
}

async function atualizarCliente(cliente){
    const { cpf, nome, email, telefone, 
        uf, cidade, bairro, rua, numero, complemento } = cliente;

    try {
        await connection('cliente')
            .update({nome, email, telefone})
            .where('cpf', cpf);

        await connection('endereco')
            .update({ uf, cidade, bairro, rua, numero, complemento })
            .where('cliente_cpf', cpf);

        return {success: true};
    } catch(err){
        console.log(err);
        return {error: true, message: "Falha ao atualizar cliente"}
    }
}

module.exports = { cadastrarCliente, buscarCliente, listarClientes, atualizarCliente }