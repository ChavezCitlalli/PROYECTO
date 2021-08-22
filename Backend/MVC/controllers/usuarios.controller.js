
const UsuarioService = require("../services/usuarios.services");

const usuarioService = new UsuarioService();


class UsuarioController {
    
    async getUsuarios(req, res) {
        try{
            const usuarios = await usuarioService.getUsuarios();
            return(usuarios);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                err: 'Hable con el administrador'
            });
        }
    }

    async getUsuarioId({id}) {
        try {
            const usuario = await usuarioService.getUsuarioId({id:id});
            if(usuario.error){
                return res.status(usuario.status).json({error: usuario.msg});
            }
            return (usuario);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }
    
    async newUsuario(req, res) {
        const usuarioData = req.body;
        try {
            const usuario = await usuarioService.newUsuario({ ...usuarioData });
            if(usuario.error) {
                return res.status(usuario.status).json({
                    error: usuario.msg
                })
            }
            await usuario.save();
            return(usuario);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                err: 'Hable con el administrador'
            });
        }
    }

    async putUsuario(req, res) {
        const { id } = req.params;
        const usuarioData = req.body;
        try {
            const usuario = await usuarioService.putUsuario({ id, body: usuarioData });
            if (usuario.error) {
                return res.status(400).json({ error: usuario.msg });
            }
            return(usuario);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                err: 'Hable con el administrador'
            });
        };
    };

    async deleteUsuario(req, res) {
        const { id } = req.params;
        try {
            const usuario = await usuarioService.deleteUsuario({ id });
            if (usuario.error) {
                return res.status(usuario.status).json({ error: usuario.msg });
            }
            return usuario;
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                err: 'Hable con el administrador'
            });
        }
    };
    
   


};

module.exports = UsuarioController;








// const  Usuarios  = require('../models/usuarios.models');
// const sequelize = require('../../db/db.conexion');
// const jwt = require('jsonwebtoken');

// //Exportar mis modulos

// module.exports.generaToken = async (data) => {
//     try {
//         let resultado = jwt.sign({
//             exp: Math.floor(Date.now() / 1000) + (60 * 60),
//             data
//         }, process.env.SECRET_KEY
//         )
//         return resultado

//     }catch (err){
//         console.log(err);
//         throw new Error (err);
//     };
// };

// module.exports.chequearUsuario = async (usr) => {
//     let usrchk = usr
//     try {
//         let resultado =  await Usuarios.existenciaDeUsuario(usrchk);
//         if (resultado) {
//             let result =  await Usuarios.usuarioAutenticado(usrchk);
//             return result
//         }else {
//             throw new Error ('Contraseña Incorrecta');
//         }
//     }catch (err){
//         console.log(err)
//         throw new Error ('No existe el usuario');
//     }
// }

// module.exports.datosUsuario = async (usr) => {
//     let usrchk = usr;
//     try {
//         let resultado =  await Usuarios.recuperarInfoUser(usrchk);
        
//         if (resultado) {
//             return resultado
//         }else {
//             throw new Error ('No hay datos de Usuario');
//         }
//     }catch (err){
//         console.log(err)
//         throw new Error (' ver informacion');
//     }
// }
