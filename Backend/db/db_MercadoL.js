const fetch = require ('node-fetch');

let Productos = [];

let Categorias = [];

class Categoria {
    constructor(id, nombre) {
        this.id = id,
        this.nombre = nombre
    };
};

class Producto {
    constructor(id, nombre_producto, precio_producto, imagen_producto) {
        this.id = id,
        this.nombre_producto = nombre_producto,
        this.precio_producto = precio_producto,
        this.imagen_producto = imagen_producto
    };
};

async function getProductos () {
    try {
        let url = "https://api.mercadolibre.com/sites/MLM/search?category=MLM1071";
        let resp = await fetch(url);
        let data = await resp.json();
        let result = data.results;
        if (result.length == 0) {
            throw new Error('Error en getProductos');
        };
        return result;
    } catch (error) {
        throw error;
    };
};

async function mandarProductos() {
    let resultado = await getProductos();
    Productos = [];
    resultado.forEach (element => {
        Productos.push(new Producto(element.id, element.title, element.price, element.thumbnail));
    });
    return Productos;
};

async function buscarProductos( palabra ) {
    try {
        let resp = await fetch('https://api.mercadolibre.com/sites/MLM/search?category=MLM1071&q='+ palabra);        
        let data = await resp.json();
        let result = data.results;
        if (result.length == 0) {
            throw new Error('Error en buscarProductos');
        }
        return result;
    } catch(error) {
        throw error;
    };
};

async function mandarBusqueda(palabra) {
    let resultado = await buscarProductos(palabra);
    Productos = [];
    resultado.forEach(element => {
        Productos.push(new Producto(element.id, element.title, element.price, element.thumbnail));
    });
    return Productos;
};

async function getCategorias() {
    try {
        let resultado = await fetch ('https://api.mercadolibre.com/categories/MLM1071');
        let parsejson = await resultado.json();
        let result = parsejson.children_categories;
        if (result.length == 0) {
            throw new Error('Error en getCategorias');
        };
        return result;
    } catch(error) {
        throw error;
    };
};

async function mandarCategorias() {
    let resultado = await getCategorias();
    Categorias = [];
    resultado.forEach(element => {
        Categorias.push(new Categoria(element.id, element.name));
    });
    return Categorias;
};

async function getProductosCategorias(idCategoria) {
    try {
        let resultado = await fetch ('https://api.mercadolibre.com/sites/MLM/search?category=' + idCategoria);
        let parsejson = await resultado.json();
        let result = parsejson.results;
        if(result.length == 0) {
            throw new Error('Error en getProductosCategorias');
        };
        return result;
    } catch (error) {
        throw error;
    };
};

async function mandarProductosXcategoria(idCategoria) {
    let resultado = await getProductosCategorias(idCategoria);
    Productos = [];
    resultado.forEach(element => {
        Productos.push(new Producto(element.id, element.title, element.price, element.thumbnail));
    });
    return Productos;
};

module.exports = { Productos, Categorias, mandarProductos, mandarBusqueda, mandarCategorias, mandarProductosXcategoria };