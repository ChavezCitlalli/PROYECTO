const Joi = require('joi')

module.exports = {

    modeloLogin : Joi.object().keys({
        email:Joi.string().email().required(),
        pass: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }).with('email', 'pass'),


    modeloModificarProd : Joi.object().keys({
        producto_id: Joi.number().required(),
        titulo: Joi.string().min(6).max(250).required(),
        precio: Joi.number().required(),
        imagen: Joi.string().min(6).max(250).required(),
        inventario: Joi.number().required(),
        categoria: Joi.string().min(6).max(50).required(),
        descripcion: Joi.string().min(6).max(200).required()
    }),

    modeloAltaProd : Joi.object().keys({
        titulo: Joi.string().min(2).max(250).required(),
        precio: Joi.number().required(),
        imagen: Joi.string().min(6).max(250).required(),
        inventario: Joi.number().required(),
        categoria: Joi.string().min(2).max(50).required(),
        descripcion: Joi.string().min(2).max(200).required()
    }),

    

};