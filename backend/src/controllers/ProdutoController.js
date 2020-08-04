const ProdutoModel = require('../models/ProdutoModel');

async function cadastrar(req, res){
    const produto = req.body;

    const result = await ProdutoModel.cadastrarProduto(produto);

    return res.json(result);
}

async function listar(req, res){
    const result = await ProdutoModel.listarProdutos();

    return res.json(result);
}

async function buscar(req, res){
    const { id } = req.params;
    const result = await ProdutoModel.buscarProduto(id);

    return res.json(result);
}

async function excluir(req, res){
    const { id } = req.params;

    const result = await ProdutoModel.excluirProduto(id);

    return res.json(result);
}

async function atualizar(req, res){
    const produto = req.body;

    const result = await ProdutoModel.atualizarProduto(produto);

    return res.json(result);
}

module.exports = { cadastrar, listar, buscar, excluir, atualizar };