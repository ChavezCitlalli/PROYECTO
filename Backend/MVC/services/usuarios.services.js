
const { Usuarios } = require("../models");
const sequelize = require('../../db/db.conexion');
const bcryptjs = require('bcryptjs');

class UsuarioService {

    async getUsuarios() {
        const usuario = await Usuarios.findAll();
        if(!usuario ) {
            return {
                error: true,
                msg: 'No se logró encontrar ningun usuario',
                status: 400
            };
        }
        return usuario;
    };
//buscar usuario por ID
    async getUsuarioId({ id }) {
        const usuario = await Usuarios.findByPk(id);
        if(!usuario ) {
            return {
                error: true,
                msg: 'No se logró encontrar ningun usuario',
                status: 400
            };
        }
        return usuario; 
    };
//existencia de usuario por EMAIL
    async getUsuarioEmail({ email }) {
        const usuario = await Usuarios.findOne({
            where: { email }
        });
        console.log(usuario);
        if(!usuario) {
            return {
                error: true,
                msg: 'Email o password son incorrectos',
                status: 400
            };
        }
        return usuario;
    };

    async newUsuario ( { nombres, apellidos, email, pass, tipo_usuario, fecha_creacion}) {
        const usuarioExiste = await this.getUsuarioEmail({email});
        console.log(usuarioExiste);
        console.log(!usuarioExiste.error);
        if(!usuarioExiste.error) {
            return {
                error: true,
                msg: 'El usuario con ese E-mail ya existe',
                status: 400
            };
        };
        const usuario = await Usuarios.create({ 
            nombres, 
            apellidos, 
            email, 
            pass, 
            tipo_usuario,
            fecha_creacion
        });
        const salt = bcryptjs.genSaltSync(10);
        usuario.pass = bcryptjs.hashSync(pass, salt);
        await usuario.save();
        delete usuario.dataValues.pass;
        return usuario;
    };

    async putUsuario({ id, body }) {
        const { nombres, apellidos, email, pass, tipo_usuario, fecha_creacion } = body;
        const usuario = await Usuarios.findByPk(id);
        if (!usuario ){
            return {
                error: true,
                msg: 'No se logró encontrar ningun usuario',
                status: 400
            };
        };
        await usuario.update({ nombres, apellidos, email, pass, tipo_usuario, fecha_creacion});
        return usuario;
    };

    async deleteUsuario({ id }) {
        const usuario = await Usuarios.findByPk(id);
        if (!usuario ){
            return {
                error: true,
                msg: 'No se logró encontrar ningun usuario',
                status: 400
            };
        }
        await usuario.destroy({ 
            where: {id_usuarios: id} });
        return true;
    }

}


module.exports = UsuarioService;