let form = document.getElementById('nuevoForm');
let nombre = document.getElementById('producto_name');
let precio = document.getElementById('producto_precio');
let imagen = document.getElementById('producto_imagen');
let cantidad = document.getElementById('producto_cantidad');
let categoria = document.getElementById('categoria');
let descripcion = document.getElementById('producto_descripcion');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = await JSON.parse(localStorage.getItem('dataUsuario'))
    try {
        let resultado = await fetch("http://localhost:3000/productos/darAlta", { 
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify( {
            "titulo": nombre.value,
            "precio": precio.value,
            "imagen": imagen.value,
            "inventario": cantidad.value,
            "categoria": categoria.value,
            "descripcion": descripcion.value
        })
    })
        if(resultado.status == 400){
            swal({
                title: "No tienes permiso para agregar productos",
                icon: "error",
              });
        } else {
            swal({
                title: "Producto Agregado Correctamente",
                icon: "success",
              });
            newFormulario();
        }
    } catch (error) {
        swal({
            title: "No tienes permiso para agregar productos catch",
            icon: "error",
          });
    }
})

function newFormulario()
{
    nombre.value = ""
    imagen.value = ""
    precio.value = ""
    cantidad.value = ""
    categoria.value = ""
    descripcion.value = ""

}
