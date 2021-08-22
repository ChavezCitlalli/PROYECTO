const rateLimit = require ('express-rate-limit'); 
const cors = require ('cors');

// const corsOptions = {
//     origin : function (origin, callback) {
//         if (process.env.LISTABLANCA.indexOf(origin)!== -1){
//             callback (null, true)
//         }else {
//             callback( new Error('Usted no está autorizado a ingresar a mi API por Cors'))
//         };
//     }
// };


const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100, 
    message: 'Usted excedió el limite máximo de ingresos a la API, intente más tarde'
});

const controlApiKey = function (err, req, res, next) {
    if (process.env.APIKEY ===  req.body.apikey){
        return next()
    }else {
        let error = {
            "error": "Debe enviar una Api-Key"  
        };
        return res.status(400).json(error)
    };
};

module.exports = { limiter, controlApiKey};