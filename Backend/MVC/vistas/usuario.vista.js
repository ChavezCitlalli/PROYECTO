// const sequelize = require('../../db/db.conexion')
// const controladorUsuarios = require('../controllers/usuarios.controller')

const middUser = require('../../middleware/middUsuarios')
const express = require('express');
const app = express();
const UsuarioController = require('../controllers/usuarios.controller');
const usuarioController = new UsuarioController();



module.exports = async (app)=> {
    
    app.get('/newUsuarioPublico',( req,res ) => { 
        res.render('nuevo_usuarios.publico.ejs')
    });

    // Página de administrador
    app.get('/index',(req,res) => { 
        res.render('index.ejs')
    });
    
    //ruta para enlistar
        app.get('/usuarios', async(req,res) => {
            try {
                let resultado = await usuarioController.getUsuarios();
                res.render('listar_usuarios', {results:resultado});
                //res.send(resultado) //para visualizar en POSTMAN
            }catch (err){
                console.log(err);
                res.status(400).json('Error al dirigirse a la ruta vistas');
            };
        });

        app.get('/createAdmin', (req,res)=>{
                res.render('nuevo_usuarios.ejs');
        });
         
        app.post('/save',middUser.verificacionUsuario, async (req,res) => {
            try{
                let resultado = await usuarioController.newUsuario(req,res);
                if(resultado) {
                    console.log('Usuario Agregado Correctamente');
                    //res.send(resultado);
                    res.redirect('/usuarios');
                    return;
                }
            }catch (err){
                res.status(400).json({err:'No se puedo crear el usuarios'});
            };
        });
        app.post('/savePublico', async (req,res) => {
            try{
                let resultado = await usuarioController.newUsuario(req,res);
                if(resultado) {
                    console.log('Usuario Agregado Correctamente');
                    //res.send(resultado);
                    res.redirect('/usuarios');
                    return;
                }
            }catch (err){
                res.status(400).json({err:'No se puedo crear el usuarios'});
            };
        });

         // ruta para modificar usuario
        app.get  ('/edita/:id',async (req,res) => {
            let { id } = req.params;
            try {
                let resultado = await usuarioController.getUsuarioId({id}); 
                //res.send(resultado); // para visualizar en POSTMAN
                res.render('editar_usuario.ejs', {result: resultado.dataValues });
            }catch (err){
                res.status(400).json('Error al dirigirse a la pagina EDITAR');
            };
        });

        app.put('/update/:id',middUser.verificacionUsuario, async (req, res) => {
            try {
                let resultado = await usuarioController.putUsuario(req, res);
                if(resultado){
                    //res.send(resultado);  //para visualizar en POSTMAN
                    res.redirect('/usuarios');
                }
            } catch (error) {
                res.status(400).json('No se puedo modificar el usuarios')
            }
        });

        //ruta para eliminar usuario  
        app.delete('/delete/:id', async (req,res) => {
            try {
                let resultado = await usuarioController.deleteUsuario(req,res)
                if(resultado){
                    res.redirect('/usuarios');
                }      
            }catch (err){
                res.status(400).json('No se puedo eliminar el usuario')
            }
        })
}