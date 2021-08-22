let form = document.getElementById('loginForm');
let email = document.getElementById('usuario_email');
let pass = document.getElementById('usuario_pass');

class Usuarios {
    constructor(email, pass){
        this.email = email,
        this.pass = pass,
        this.id = " ",
        this.nombres = " ",
        this.apellidos= " ",
        this.tipo = "",
        this.fecha= " ",
        this.token = ""
    };

    static async guardaUsuario (usuario) {
        localStorage.setItem("dataUsuario", JSON.stringify(usuario))
    };

    static async recuperaUsuario () {
        let resultado = await JSON.parse(localStorage.getItem('dataUsuario'))
        return resultado
    }
}


//Manda el post
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    Usuarios.guardaUsuario(new Usuarios(email.value, pass.value));
    let resultado = await fetch("http://localhost:3000/login", { 
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            "email": email.value,
            "pass": pass.value
        })
    })
    let vuelta = await resultado.json();
    
    if(vuelta.error){
        swal({
            title: `${vuelta.error}`,
            icon: "error",
          });
    } else {
        let data = await Usuarios.recuperaUsuario();
        data.tipo = vuelta.user.tipo_usuario;
        data.id = vuelta.user.id_usuarios;
        data.nombres = vuelta.user.nombres + " " + vuelta.user.apellidos;
        data.fecha = vuelta.user.fecha_creacion;
        data.token = vuelta.token;
        Usuarios.guardaUsuario(data);
        if(data.tipo === 'Administrador'){
            location.href = '/index'
        } else {
    
              setTimeout(() => {
                location.href = 'http://127.0.0.1:5500/Frontend/index.html'
                
            }, 3000);
        }
    }
})

