const CompraService = require ('../services/compras.services')
const compraService = new CompraService();

class CompraController {
    async newCompra ({data}){
        console.log(data)
        const { cliente_id, total, numCalle, pais, direccion, codigo_postal, forma_de_pago} = data
        try {
            const compra = await compraService.newCompra({  total, numCalle, pais, direccion, codigo_postal, forma_de_pago});
            if(compra.error){
                return res.status(compra.status).json({error: compra.msg})};
            return compra;
        }catch (err){
            console.log(err);
            throw new Error (err)};
    };

    async newDetalle ({data})  {
        try {
            const detalle = await compraService.newDetalle({data});
            if(detalle.error){
                return res.status(detalle.status).json({error: detalle.msg})};
            return detalle;
        }catch (err){
            console.log(err);
            return res.status(400).json('Comuniquese con el administrador');
        };
        };

};
module.exports = CompraController;

