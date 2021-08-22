
const  sequelize = require('../../db/db.conexion');
const ProductoService = require("../services/productos.services");

const productoService = new ProductoService();

class ProductoController {
    async getProductos(req, res) {
        try{
            const producto = await productoService.getProductos();
            if(producto.error){
                return res.status(producto.status).json({error: producto.msg})};
            return producto; // a modificar
        } catch(err){
            console.log(err);
            return res.status(400).json('Comuniquese con el administrador');
        }
    }

    async getProductoByPK(req, res) {
        const { id } = req.params;
        try {
            const producto = await productoService.getProductoByPK({ id });
            if(producto.error){
                return res.status(producto.status).json({error: producto.msg})};
            return (producto);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                err: 'comuniquese con el administrador'
            });
        }
    }
    async getProductoId(req, res) {
        const { id } = req.params;
        try {
            const producto = await productoService.getProductoId({ id });
            if(producto.error){
                return res.status(producto.status).json({error: producto.msg})};
            return (producto);
        } catch(err){
            console.log(err);
            return res.status(500).json({
                error: 'comuniquese con el administrador'
            });
        }
    }
    async newProducto({data}) {
        const {titulo, precio, imagen, inventario, categoria, descripcion } = data;
        try {
            const producto = await productoService.newProducto({titulo, precio, imagen, inventario, categoria, descripcion  });
            if(producto.error){
                return res.status(producto.status).json({error: producto.msg})};
            await producto.save();
            return (producto);
        } catch (err) {
            return res.status(500).json( 'comuniquese con el administrador');
        }
    }

    async putProducto(req, res) {
        const { id } = req.params;
        const productoData = req.body;
       
        try {
            const producto = await productoService.putProducto({ id, body: productoData });
            if (producto.error) {
                return res.status(400).json({ error: producto.msg });
            }
            return (producto);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'Hable con el administrador'
            });
        }
    }

    async deleteProducto(req, res) {
        const { id } = req.params;
        try {
            const producto = await productoService.deleteProducto({ id });
            if(producto.error){
                return res.status(producto.status).json({error: producto.msg})};
            return (producto);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error: 'comuniquese con el administrador'
            });
        }
    }
}

module.exports = ProductoController;
