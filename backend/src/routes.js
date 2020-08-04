const express = require('express');
const routes = express.Router();
const ValidaCamposController = require('./controllers/ValidaCamposController')
const ClienteController = require('./controllers/ClienteController');
const AdmController = require('./controllers/AdmController');
const ProdutoController = require('./controllers/ProdutoController');
const { Client } = require('knex');

routes.post('/cliente', ValidaCamposController.validarClienteBody(true), ClienteController.cadastrar);

routes.get('/cliente/:cpf', ValidaCamposController.validarCpfParams(), ClienteController.buscar);

routes.get('/cliente', AdmController.autenticar, ClienteController.listar)

routes.put('/cliente', ClienteController.autenticar, ValidaCamposController.validarClienteBody(false), 
    ClienteController.atualizar)

routes.put('/cliente/senha', ClienteController.autenticar, ValidaCamposController.validarSenhasBody(), 
    ClienteController.alterarSenha)

routes.post('/cliente/login', ClienteController.logar);

routes.post('/adm', AdmController.autenticar, ValidaCamposController.validarAdmBody(), 
    AdmController.cadastrar)

routes.get('/adm/:cpf', AdmController.autenticar, ValidaCamposController.validarCpfParams(), 
    AdmController.buscar);

routes.post('/adm/login', AdmController.logar);

routes.get('/adm', AdmController.autenticar, AdmController.listar);

routes.put('/adm/senha',  AdmController.autenticar, ValidaCamposController.validarSenhasBody(), 
    AdmController.alterarSenha);

routes.delete('/adm/:cpf', AdmController.autenticar, ValidaCamposController.validarCpfParams(), 
    AdmController.excluir);

routes.post('/produto', AdmController.autenticar, ValidaCamposController.validarProdutoBody(), 
    ProdutoController.cadastrar);

routes.get('/produto', ProdutoController.listar);

routes.get('/produto/:id', ValidaCamposController.validarProdutoIdParams(), 
    ProdutoController.buscar);

routes.delete('/produto/:id', AdmController.autenticar, 
    ValidaCamposController.validarProdutoIdParams(), ProdutoController.excluir);

module.exports = routes;