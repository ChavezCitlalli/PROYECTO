let form = document.getElementById('nuevoForm');
let nombres = document.getElementById('usuario_nombres');
let apellidos = document.getElementById('usuario_apellidos');
let email = document.getElementById('usuario_email');
let pass = document.getElementById('usuario_pass');
let tipo = document.getElementById('tipo_usuario');
let fecha = document.getElementById('usuario_fecha');

//Manda el post
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = await JSON.parse(localStorage.getItem('dataUsuario'))
    try{
    let resultado = await fetch("http://localhost:3000/savePublico", {
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json",
            
           
        },
        body: JSON.stringify( {
            "nombres": nombres.value,
            "apellidos": apellidos.value,
            "email": email.value,
            "pass": pass.value,
            "tipo_usuario": tipo.value,
            "fecha_creacion": fecha.value
        })
    })

    if(resultado.status == 400){
        swal({
            title: "No tienes permiso para agregar usuarios",
            icon: "error",
          });
    } else {
        swal({
            title: "Usuario Agregado Correctamente",
            icon: "success",
          });
        newFormulario();
        setTimeout(() => {
            location.href = 'http://127.0.0.1:5500/Frontend/pages/RegistroLogin.html'
        }, 3000);
        
    }
} catch (error) {
    swal({
        title: "No tienes permiso para agregar usuarios",
        icon: "error",
      });
}
})

function newFormulario()
{
    nombres.value = ""
    apellidos.value = ""
    email.value = ""
    pass.value = ""
    tipo.value = ""
    fecha.value = ""
}