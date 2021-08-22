const { Compras, Detalle } = require('../models');
const sequelize = require('../../db/db.conexion');

class CompraService {

    async newCompra ({  total, numCalle, pais, direccion, codigo_postal, forma_de_pago }) {
       
        const compra = await Compras.create({ 
            total, 
            numCalle, 
            pais, 
            direccion, 
            codigo_postal, 
            forma_de_pago 
        });
        if(!compra) {
            return {
                error: true,
                msg: 'No se logró registrar la compra',
                status: 400
            };
        }
        return compra;
        
    };

    async newDetalle ({data})  {
            const detalle = await Detalle.create(({
                
                producto: data.producto,
                cantidad: data.cantidad,  
                precio: data.precio, 
                subtotal: data.subtotal }));
            if(!detalle) {
                return {
                    error: true,
                    msg: 'No se logró encontrar el producto solicitada',
                    status: 400
                };
            }
            return detalle;
    };

};

module.exports = CompraService;