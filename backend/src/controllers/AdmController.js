const AdmModel = require('../models/AdmModel');
const AcessoModel = require('../models/AcessoModel');
const TIPO = "adm";

async function cadastrar(req, res){
    const adm = req.body;

    const result = await AdmModel.cadastrarAdm(adm);

    return res.json(result);
}

async function buscar(req, res){
    const cpf = req.params.cpf;

    const result = await AdmModel.buscarAdm(cpf);

    return res.json(result);
}

async function listar(req, res){
    const result = await AdmModel.listarAdms();

    return res.json(result);
}

async function logar(req, res){
    const { cpf, senha } = req.body;

    const result = await AcessoModel.logar(cpf, senha, TIPO);

    return res.json(result);
}

async function autenticar(req, res, next){
    const token = req.headers['x-access-token'];
    
    if(!token)
        return res.json({error: true, message: "Autenticação inválida"});

    const result = await AcessoModel.autenticar(token, TIPO);

    if(result.error)
        return res.json({ result });

    next();
}

async function alterarSenha(req, res){
    const { antiga, nova, confirma } = req.body;
    const token = req.headers['x-access-token'];
    const cpf = AcessoModel.getTokenCpf(token);

    const result = await AcessoModel.alterarSenha(antiga, nova, confirma, cpf, TIPO);

    return res.json(result);
}

async function excluir(req, res){
    const { cpf } = req.params;

    const result = await AdmModel.excluir(cpf);

    return res.json(result);
}

module.exports = { cadastrar, buscar, logar, alterarSenha, listar, autenticar, excluir }