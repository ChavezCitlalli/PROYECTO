class Carrito {

    //Añadir productos al carrito y los manda a leerDatosProducto()
    addCarrito (e) {
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')) {
            this.leerDatosProducto(e.target.parentElement.parentElement.parentElement);
        };
    };

    //Recibe los datos al ejecutarse el evento addCarrito()
    leerDatosProducto (producto)  {
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo: producto.querySelector('h5').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('.btn-success').getAttribute('data-id'),
            cantidad: 1
        };
        producto.querySelector('.btn-success').classList.add('d-none');

        let productosLS;
        productosLS = this.getProductsLS();
        productosLS.forEach(function (productoLS) {
            if (productoLS.id === infoProducto.id) {
                productosLS = productoLS.id;
            };
        });

        if (productosLS === infoProducto.id) {
            swal("El producto ya se encuentra en su carrito");
        }
        else {
            this.paintCarrito(infoProducto);
        };
    };

    paintCarrito (producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}"></td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="index.html" class="borrar-producto" data-id="${producto.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class=" bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </a>
            </td>
        `;
        listaProductos.appendChild(row);
        this.saveProductsLS(producto);
    }

    //Eliminar el producto del carrito en el DOM
    deleteProduct (event) {
        event.preventDefault();
        let producto, idProducto;
        if (event.target.parentElement.classList.contains('borrar-producto')) {
            event.target.parentElement.parentElement.parentElement.remove();
            producto = event.target.parentElement.parentElement.parentElement;
            idProducto = producto.querySelector('a').getAttribute('data-id');
        }
        this.deleteProductsLS(idProducto);
        let btnBorrar = document.querySelector(`[data-id='${idProducto}']`);
        if (btnBorrar) {
            btnBorrar.classList.remove('d-none');
        };
    };

    //Procesar pedido
    processPedido(e){
        e.preventDefault();
        if (this.getProductsLS().length === 0) {
            swal("El carrito está vacío");
        } else {
            location.href = "./pages/checkout.html";
        };
    };

    //Comprobar si hay elementos en el LS
    getProductsLS(){
        let productoLS;
        if (localStorage.getItem('productos') === null) {
            productoLS = [];
        } else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        } return productoLS;
    };

    //Guardar productos en el LocalStorage
    saveProductsLS(producto){
        let productos;
        productos = this.getProductsLS();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    };

    calcularTotal () {
        let total = 0, igv = 0, subtotal = 0;
        let productosLS = this.getProductsLS();
        for (let i = 0; i < productosLS.length; i++) {
            let acarreo = Number(productosLS[i].precio * productosLS[i].cantidad);
            total = total + acarreo;
        };
        document.getElementById('total').value = "$ " + total.toFixed(2); //2 digitos despues del punto decimal
    };

    //Mostrar  el LS
    readLS () {
        let productosLS = this.getProductsLS();
        productosLS.forEach( function (producto) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${producto.imagen}"></td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="index.html" class="borrar-producto" data-id="${producto.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class=" bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </a>
                </td>
            `;
            listaProductos.appendChild(row);
        });
    };


    //Eliminar producto por ID del LS
    deleteProductsLS(idProducto){
        let productosLS = this.getProductsLS();
        productosLS.forEach( function (productoLS, index) {
            if (productoLS.id === idProducto) {
                productosLS.splice(index, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
    };

   
    //Mostrar los productos guardados en el LS en checkout.html
    leerLSxCompra () {
        let productosLS;
        productosLS = this.getProductsLS();
        productosLS.forEach( producto => {
            const row = document.createElement('tr');
            let total = producto.precio * producto.cantidad;
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}">
                </td>
                <td>${producto.titulo}</td>
                <td>$${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales'>$${total.toFixed(2)}</td>
                <td>
                    <a href="#" class="borrar-producto" data-id="${producto.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class=" bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    };

    obtenerEvento (event) {
        event.preventDefault();
        let id, cantidad, producto, productosLS;
        if (event.target.classList.contains('cantidad')) {
            producto = event.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.getProductsLS();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;
                    let newTotal = Number(cantidad * productosLS[index].precio);
                    actualizarMontos[index].innerHTML = '$' + newTotal.toFixed(2);
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
            this.calcularTotal();    
        }
        else {
            console.log("click afuera");
        };
    };


}
