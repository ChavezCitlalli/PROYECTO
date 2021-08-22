const jwt = require('jsonwebtoken');
const Joi = require('joi')
const {modeloLogin, modeloAltaProd, modeloModificarProd } = require('./middDatosValidacion')


module.exports.verificacionUsuario = async (req,res,next) => {
    let token = req.headers.authorization;
    if (token != undefined){
        try {
            let tokenchk = token.split(' ')[1];
            let resultado = jwt.verify(tokenchk, process.env.SECRET_KEY);
            if (resultado){
                next();                
            } else  {
                throw new Error ('Token inválido');
            }
        } catch (error) {
            res.status(400).json({ error:error.message });
        }
    }else {
        res.status(400).json('Se necesita un Token para ingresar');
    };
};
 
module.exports.validarLogin = async (req,res,next)=> {
    try{
        await Joi.attempt(req.body, modeloLogin, 'Datos ingresados incorrectos ');
        return next();
    }catch (err){
        console.log(err);
        res.status(500).json({error: err.message});
    };
};

module.exports.validarAltaProducto = async (req,res,next)=> {
    try {
        await Joi.attempt(req.body, modeloAltaProd, 'Datos incorrectos para el alta del producto')
        return next()
    }catch(err){
        console.log(err)
        res.status(500).json({error : err.message})
    }
} 

module.exports.validarModificarProducto = async (req,res,next)=> {
    try {
        await Joi.attempt(req.body, modeloModificarProd, 'Datos incorrectos para actualizar un producto')
        return next()
    }catch(err){
        console.log(err);
        res.status(500).json({error : err.message});
    };
} ;
