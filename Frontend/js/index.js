
const items = document.getElementById('items');
const templateCard = document.getElementById('templateCard').content;
const carrito = document.getElementById('carrito');
const controlPaginas = document.getElementById('paginas');
const titulo = document.getElementById('titulo');
const formBuscar = document.getElementById('busqueda');
const fragment = document.createDocumentFragment();
const listaProductos = document.getElementById('elementosComprar');
const btnProcesar = document.getElementById('procesarPedido');
const listaCategorias = document.getElementById('lista-categorias');
let result;
let categorias;
const carro = new Carrito();

let pageNumber = 1; 
let pageSize = 12; 
let pagination;

document.addEventListener('DOMContentLoaded', () => {
    getProductos();
    getCategoriasUI();
    cargaDeEventos();
});

async function getProductos () {
    try {
        const resp = await fetch('http://localhost:3000/local');
        const data = await resp.json();
        result = data;
        console.log(result)
        showProductos(result);
    } catch (error) {
        console.log(error);
    };
};


async function getCategoriasUI () {
    try {
        const resp = await fetch('http://localhost:3000/categorias');
        const result = await resp.json();
        categorias = result;
        console.log(categorias);
        llenarCategorias(categorias);        
    } catch (error) {
        console.log(error);
    };
};





//BÚSQUEDA
formBuscar.addEventListener('submit', event => {
    event.preventDefault();
    const buscar = document.getElementById("busca");
    let palabra = buscar.value.charAt(0).toUpperCase() + buscar.value.slice(1); // ejemplo: si se introduce "buscar" ---se devuelve--- "Buscar"
    obtenerBusqueda(palabra, result);  
    buscar.value = ''; 
});

async function obtenerBusqueda (buscar) {    
    let resp = await fetch("#"+ buscar);        
    let data = await resp.json();
    result = data;

    if(result.error === 'No hay productos para tu búsqueda'){
        location.href = "../pages/notFound.html";
    } else {
        pageNumber=1;
        items.innerHTML  =  '' ;
        controlPaginas.innerHTML = '';
        titulo.textContent = `Resultados para: ${buscar}`;
        showProductos(result);
    };
};


//PAGINACIÓN
const showProductos = productos => {
    let pageCont = Math.ceil(productos.length/pageSize);  //Controla el número de productos por página
    let pagination = paginate(productos,pageSize,pageNumber);
    pagination.forEach(element => {
        templateCard.querySelector('img').setAttribute("src", element.imagen);
        templateCard.querySelector('h5').textContent = element.titulo;
        templateCard.querySelector('span').textContent = `${element.precio}`;
        templateCard.querySelector('.btn-success').dataset.id = element.producto_id;
        
        let productosLS;
        productosLS = carro.getProductsLS();
        productosLS.forEach(function (productoLS) {
            if(productoLS.id === element.id){
                productosLS = productoLS.id;
            };
        });

        if(productosLS === element.id){
            templateCard.querySelector('.btn-success').classList.add('d-none');
        }
        else {
            templateCard.querySelector('.btn-success').classList.remove('d-none')
        };

        const clone = templateCard.cloneNode(true)//clona nuestra templateCard 
        fragment.appendChild(clone)//guardamos 
    });
    items.appendChild(fragment)  
    paginasHTML= pageNumber >1  ? " <a href='#titulo' class='btn btn-warning' onclick='previusPage()'>Anterior</a>":"";
    paginasHTML+= pageNumber < pageCont ?(" <a href='#titulo' class='btn btn-warning' onclick='nextPage()'>Siguiente</a>"):"" ;
    document.getElementById("paginas").innerHTML="";
    document.getElementById("paginas").innerHTML=paginasHTML;

};

function paginate (array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size); 
};

function nextPage () {
    pageNumber ++;
    items.innerHTML  =  '';
    showProductos(result)
};

function previusPage(){
    pageNumber --;
    items.innerHTML  =  '';
    showProductos(result)
};

const cargaDeEventos = () => {
 
    items.addEventListener('click', (e) => { carro.addCarrito(e) } );//carro es una instancia de la clase Carrito, al hacer click en Comprar se ejecuta:
    carrito.addEventListener('click', (e) => { carro.deleteProduct(e) } );//Se ejecuta al hacer click en eliminar productos.
    document.addEventListener('DOMContentLoaded', carro.readLS() );//Al cargarse el contenido se muestra lo que hay en el LocalStorage
    btnProcesar.addEventListener('click', (e) => { carro.processPedido(e) } );//El pedido se redirecciona a otra página
};