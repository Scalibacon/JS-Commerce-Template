const ClienteModel = require('../models/ClienteModel');
const AcessoModel = require('../models/AcessoModel');
const TIPO = 'cliente';

async function cadastrar(req, res){
    const cliente = req.body;

    const result = await ClienteModel.cadastrarCliente(cliente);

    return res.json(result);
}

async function buscar(req, res){
    const cpf = req.params.cpf;

    const result = await ClienteModel.buscarCliente(cpf);

    return res.json(result);
}

async function listar(req, res){
    const result = await ClienteModel.listarClientes();

    return res.json(result);
}

async function atualizar(req, res){
    const cliente = req.body;
    const token = req.headers['x-access-token'];
    const cpf = AcessoModel.getTokenCpf(token);
    cliente.cpf = cpf;

    const result = await ClienteModel.atualizarCliente(cliente);

    return res.json(result);
}

async function alterarSenha(req, res){
    const { antiga, nova, confirma } = req.body;
    const token = req.headers['x-access-token'];
    const cpf = AcessoModel.getTokenCpf(token);

    const result = await AcessoModel.alterarSenha(antiga, nova, confirma, cpf, TIPO);

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

module.exports = { cadastrar, buscar, listar, atualizar, alterarSenha, logar, autenticar }
