
let form = document.getElementById('compraForm');
let totalCompraM = document.getElementById('totalCompra');
let calle = document.getElementById('address');
let pais = document.getElementById('country');
let direccion = document.getElementById('state');
let codigoPostal = document.getElementById('zip');
let formaPago = document.getElementById('formaPago');

//Manda el post
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let data = await JSON.parse(localStorage.getItem('dataUsuario'))
    try {
        let resultado = await fetch("http://localhost:3000/comprar", { 
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify( {
          
            "total": parseFloat(totalCompraM.textContent),
            "numCalle": calle.value,
            "pais": pais.value,
            "direccion": direccion.value,
            "codigo_postal": parseInt(codigoPostal.value),
            "forma_de_pago": formaPago.value 
        })
    })
        if(resultado.error){
            swal({
                title: "Necesitas Iniciar Sesión para poder comprar",
                icon: "error",
              });
        } else{
            await mandarProductos()
            localStorage.removeItem('productos');
            location.href = "thanksPage.html";
        }
    } catch (error) {
        swal({
            title: "Necesitas Iniciar Sesión para poder comprar",
            icon: "error",
          });
    }
})

async function mandarProductos() {
    let data = await JSON.parse(localStorage.getItem('dataUsuario'))
        try {
            let productos = await JSON.parse(localStorage.getItem('productos'))
            productos.forEach(async element => {
            let resultado = await fetch("http://localhost:3000/detalleCompra", { 
            method: 'post',
            headers: {
                "Accept": "application/json, text/plain, *,*",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${data.token}`
            },
            body: JSON.stringify( {
               
                "producto": element.titulo,
                "precio": parseFloat(element.precio),
                "cantidad": parseInt(element.cantidad),
                "subtotal":  (Number(element.precio * element.cantidad)).toFixed(2)
            })
        })
    })
        } catch (error) {
            swal({
                title: "Necesitas Iniciar Sesión para poder comprar",
                icon: "error",
            });
        }
}