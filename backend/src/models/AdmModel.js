const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

async function cadastrarAdm(adm){
    const { cpf, nome, email, senha, senha2 } = adm;

    if(senha !== senha2){
        return {error: true, message: "Confirmação de senha incorreta"}
    }

    const adm_existente = await buscarAdm(cpf);

    if(adm_existente){
        if(adm_existente.error)
            return {error: true, message: "Falha ao cadastrar administrador"}
        
        return {error: true, message: "CPF já cadastrado"}
    }

    try {
        const senha_cripto = md5(senha);
        await connection('adm').insert({ 
            cpf, nome, email, senha: senha_cripto
        });

        return {success: true};
    } catch(err){
        console.log(err);
        return {error: true, message: "Falha ao cadastrar administrador"}
    } 
}

async function buscarAdm(cpf){
    try {
        const adm = await connection('adm').select('*').where('cpf', cpf).first();

        return adm;
    } catch(err){
        console.log(err);
        return {error: true, message: "Falha ao buscar administrador"}
    }
}

async function listarAdms(){
    try {
        const adms = await connection('adm').select('*');

        return adms;
    } catch(err){
        console.log(err);
        return {error: true, message: "Falha ao listar administradores"}
    }
}

async function excluir(cpf){
    try {
        await connection('adm').del().where('cpf', cpf);

        return { sucess: true }
    } catch(err){
        console.log(err);
        return { error: true, message: "Falha ao excluir administrador" }
    }
}

module.exports = { cadastrarAdm, buscarAdm, listarAdms, excluir }