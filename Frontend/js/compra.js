const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('compaCheckForm');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLSxCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => { compra.deleteProduct(e) });

    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener('submit', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });

}

function procesarCompra(e) {
    e.preventDefault();
    if (compra.getProductsLS().length === 0) {
        swal("Su Carrito está Vacío")
    } else {
        location.href = "http://127.0.0.1:5500/Frontend/pages/pagoInfo.html";
    }
}