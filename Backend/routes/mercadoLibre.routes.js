const mLServices = require('../services/mercadoLibre.service');

module.exports = (app) => {

    app.get('/', async function (req, res){
        try {
            let result = await mLServices.mandarProductos();
            res.send(result)
        } catch (error) {
            let errorMensaje = { error : error.message }
            res.status(404).send(errorMensaje)
        }
    });
    
    app.get('/buscar/:palabra', async (req, res) => {
        try {
            let result = await mLServices.mandarBusqueda(req.params.palabra);
            res.send(result);
        } catch(error) {
            let errorMensaje = { error: error.message }
            res.status(404).send(errorMensaje);
        }
    })
    
    app.get('/categorias', async function (req, res){
        try {
            let result = await mLServices.mandarCategorias();
            res.send(result)
        } catch (error) {
            let errorMensaje = { error : error.message }
            res.status(404).send(errorMensaje)
        }
    });
    
    app.get('/categorias/:idCategoria', async function (req, res){
        try {
            let result = await mLServices.mandarProductosXcategoria(req.params.idCategoria);
            res.send(result)
        } catch (error) {
            let errorMensaje = { error : error.message }
            res.status(404).send(errorMensaje)
        }
    });

}



