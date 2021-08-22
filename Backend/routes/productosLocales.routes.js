const localProductos = require('../services/productosLocales.services')


module.exports = ( app ) => {

    app.get('/local', async (req,res)=> {
        try {
            let resultado = await localProductos.listarProductos()
            res.json(resultado)
        }catch (err) {
            console.log(err)
            res.status(500).json({error: err.message})
        }
    });

    app.get('/buscar/:palabra', async (req, res) => {
        try {
            let result = await localProductos.mandarBusqueda(req.params.palabra);
            res.send(result);
        } catch(error) {
            let errorMensaje = { error: error.message }
            res.status(404).send(errorMensaje);
        }
    })


}