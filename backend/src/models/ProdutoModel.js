const connection = require('../database/connection');

async function cadastrarProduto(produto){
    const { nome, categoria, valor, estoque, descricao } = produto;

    try {
        await connection('produto').insert({ nome, categoria, valor, estoque, descricao });

        return { success: true }
    } catch(err){
        console.log(err);
        return {error: true, message: "Falha ao cadastrar produto"}
    }
}

async function atualizarProduto(produto){
    const { id, nome, categoria, valor, estoque, descricao } = produto;

    try {
        await connection('produto')
            .update({ nome, categoria, valor, estoque, descricao })
            .where('id', id);

        return {success: true}
    } catch(err){
        console.log(err);
        return {error: true, message: "Falha ao atualizar produto"}
    }
}

async function listarProdutos(){
    try {
        const produtos = await connection('produto').select('*');

        return produtos;
    } catch(err){
        console.log(err);
        return {error: true, message: "Falha ao listar produtos"}
    }
}

async function buscarProduto(id){
    try {
        const produto = await connection('produto').select('*').where('id', id).first();

        if(!produto)
            return { error: true, message: "Produto não encontrado" }
        
        return produto;
    } catch(err){
        console.log(err);
        return { error: true, message: "Falha ao buscar produto" }
    }
}

async function excluirProduto(id){
    try {
        const produto = await connection('produto').select('*').where('id', id).first();

        if(!produto)
            return { error: true, message: "Produto não encontrado" }

        await connection('produto').del().where('id', id);

        return { success: true }
    } catch(err){
        console.log(err);
        return { error: true, message: "Falha ao deletar produto" }
    }
}

module.exports = { cadastrarProduto, listarProdutos, buscarProduto, 
    excluirProduto, atualizarProduto }