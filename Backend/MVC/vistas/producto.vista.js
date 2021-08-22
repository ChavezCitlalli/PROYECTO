// const sequelize = require('../../db/db.conexion');
// const controladorProductos = require('../controllers/producto.controller');
 const middUser = require('../../middleware/middUsuarios');
//const { ParamsMiddlewares, QualificationMiddlewares, AuthMiddlewares } = require('../middlewares');
const express = require('express');
const app = express();

const sequelize = require('../../db/db.conexion');
const ProductoController = require('../controllers/producto.controller');

const productoController = new ProductoController();


module.exports = async (app) => {

    //para listar los productos
    app.get('/productos', async (req,res) => {
                try{
                    const productos = await productoController.getProductos();
                    res.render('listar', { results:productos });
                    //res.send(productos)   //para llamado en postman
                } catch (err) {
                    console.log(err);
                    res.status(400).json('No se puede mostrar');
                }
            })
          
        

    //Rutas para agregar y guardar un nuevo producto
    app.get('/agregar', async (req,res) => {
        try{
            res.render('agregar');
        } catch (err) {
            console.log(err);
            res.status(400).json('No se puede mostrar');
        }
    })


//ALTA DE UN PRODUCTO
    app.post('/productos/darAlta',middUser.validarAltaProducto, async (req, res) => {
        try{
            const data = req.body;
            let resultado = await productoController.newProducto({data});
            res.send(resultado)//para llamado en postman
            //res.redirect('/productos');
        }catch (err) {
            console.log(err);
            res.status(400).json('No se puede mostrar');
            }    
    });
   
//INFORMACION DE UN PRODUCTO ID 
    app.get('/producto/:id' , async (req,res) => {
        try{
            let resultado = await productoController.getProductoId(req,res);
            console.log(resultado)
           // res.send (resultado);
            res.render('editarproducto', { result:resultado.dataValues });
        } catch (err) {
            console.log(err);
            res.status(400).json('Error en la consulta');
        }
    });
//MODIFICAR UN PRODUCTO
    app.put('/productos/modificar/:id', async (req, res) => {
        try {
            let resultado = await productoController.putProducto(req,res);
            if(resultado){
                console.log(resultado);
               //res.send(resultado);  //para visualizar en postman
               res.redirect('/productos');
            }
        } catch (error) {
            res.status(400).json('No se pudo actualizar el producto');
        }
    });

//Eliminar un producto por ID
    app.delete('/productos/eliminar/:id', async (req, res) => {
        try{
            let resultado = await productoController.deleteProducto(req, res)
            if(resultado){
               // res.send(resultado);  //para visualizar en postman
                res.redirect('/productos');
            }
        }catch (err){
            res.status(400).json('No se pudo eliminar el producto');
        }
    })


}