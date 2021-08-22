const CompraController = require('../controllers/compra.controller');
const express = require('express');

const compraController = new CompraController;

//const middUser = require('../../middleware/middUsuarios')



module.exports = async (app)=> {

    app.post('/comprar',/* middUser.verificacionUsuario,*/async (req,res) => {
        const data = req.body
        try{
            let resultado = await compraController.newCompra({data});
            console.log(resultado);
            res.send(resultado);
        }catch (err){
            console.log(err)
            res.status(400).json('Error en la consulta');
        };
    });

    app.post('/detalleCompra',/* middUser.verificacionUsuario,*/ async (req, res) => {
        let data = req.body
        try{
            let resultado = await compraController.newDetalle({data});
            res.send(resultado);
        }catch (err){
            console.log(err);
            res.status(400).json('Error en la consulta');
        }
    })
}
