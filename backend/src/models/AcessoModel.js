const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

async function alterarSenha(antiga, nova, confirma, cpf, tabela){
    if(nova !== confirma){
        return {error: true, message: "Confirmação de senha incorreta"}
    }
    
    try {
        const registro = await connection(tabela)
            .select('*')
            .where({
                senha: md5(antiga),
                cpf
            })
            .first();

        if(!registro){
            return {error: true, message: "Senha antiga incorreta"}
        }

        await connection(tabela).update('senha', md5(nova)).where('cpf', cpf);

        return {success: true};
    } catch(err){
        console.log(err);
        return {error: true, message: "Falha ao alterar senha"}
    }
}

async function logar(cpf, senha, tipo){
    try {
        const user = await connection(tipo)
            .select('*')
            .where({
                cpf, 
                senha: md5(senha)
            })
            .first();

        if(!user)
            return { error: true, message: "Dados não encontrados" }

        const token = jwt.sign(
            { cpf, senha: md5(senha), tipo }, 
            process.env.SECRET,
            { expiresIn: tipo === "adm" ? "1h" : "2h"}
        );

        return { token };
    } catch(err){
        console.log(err);
        return {error: true, message: "Falha ao logar"}
    }
}

async function autenticar(token, tipo_aut){
    try {
        const result = await jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if(err){
                console.log(err);
                return { error: true, message: "Erro ao autenticar" }
            }

            const { cpf, senha, tipo } = decoded;

            if(tipo !== tipo_aut)
                return { error: true, message: "Autenticação inválida" }

            const user = await connection(tipo_aut).select('*').where({ cpf, senha }).first();

            if(!user)
                return { error: true, message: "Autenticação inválida" }

            return { success: true }
        })

        return result;
    } catch(err){
        console.log(err);
        return { error: true, message: "Falha ao autenticar" }
    }
}

function getTokenCpf(token){
    const result = jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
            console.log(err);
            return { error: true, message: "Erro ao autenticar" }
        }

        const { cpf } = decoded;
        return cpf;
    });

    return result;
}

module.exports = { alterarSenha, logar, autenticar, getTokenCpf }