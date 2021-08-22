
const { Producto } = require("../models");
const sequelize = require('../../db/db.conexion');


class ProductoService {

    // async getProducto({data}) {
    //     let productos = await Productos.findAll({
    //         where: { producto_id : data }
    //       })
    //     return productos[0];
    // };


    async getProductos() {
        try {
            let resultado = await sequelize.query('SELECT * FROM dbo.productos');
            console.log(resultado);
            return resultado;
        } catch (err) {
            console.log(err);
            throw new Error ('Ocurrio un problema en la consulta con la DB');      
        }
    }
    
    async getProductoByPK({ id }) {
        const producto = await Producto.findByPk(id);
        if(!producto) {
            return {
                error: true,
                msg: 'No se logró encontrar el producto solicitada',
                status: 400
            };
        }
        return producto; 
    }
    //buscar por id
    async getProductoId({ id }) {
        const producto = await Producto.findOne({
            where: { producto_id: id }
        });
        if(!producto) {
            return {
                error: true,
                msg: 'No se logró encontrar la calificación solicitada',
                status: 400
            };
        }
        return producto;
    };
   
    async newProducto ({ titulo, precio, imagen, inventario, categoria, descripcion  }) {
        const producto = await Producto.create({
            titulo, 
            precio, 
            imagen, 
            inventario, 
            categoria, 
            descripcion
        });
        if(!producto) {
            return {
                error: true,
                msg: 'problema al realizar alta en la base de datos ',
                status: 500
            };
        }
        await producto.save();
        return producto;
    }

    async putProducto({ id, body }) {
        const { titulo, precio, imagen, inventario, categoria, descripcion } = body;
        const producto = await Producto.findByPk(id);
        if(!producto) {
            return {
                error: true,
                msg: 'No se logró encontrar la calificación solicitada',
                status: 400
            };
        }
        await producto.update({ titulo, precio, imagen, inventario, categoria, descripcion });
        return producto;
    }
//Borrado 
    async deleteProducto({ id }) {
        const producto = await Producto.findByPk(id);
        if(!producto) {
            return {
                error: true,
                msg: 'No se logró encontrar la calificación solicitada',
                status: 400
            };
        }
        await producto.destroy({
            where: {producto_id :id}
        });
        return true;
    }

};


module.exports = ProductoService;