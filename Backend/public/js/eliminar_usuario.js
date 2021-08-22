async function eliminar(id_usuarios) {
    const data = await JSON.parse(localStorage.getItem('dataUsuario'))
    swal({
        title: "C U I D A D O",
        text: "¿Desea eliminar el usuario?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            try {
                let resultado = fetch("http://localhost:3000/delete/" + id_usuarios, {
                method: 'delete',
                headers: {
                    "Accept": "application/json, text/plain, *,*",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${data.token}`
                }
                })
                if(resultado.status == 400){
                    swal({
                        title: "No tienes permiso para eliminar usuarios" ,
                        icon: "error",
                      });
                } else {
                    swal({
                        title: "Usuario Eliminado Correctamente",
                        icon: "success",
                    });
                    setTimeout(() => {
                        location.href = '/usuarios'
                    }, 2000);
                }
    
            } catch (error) {
                swal({
                    title: "No tienes permiso para eliminar usuarios",
                    icon: "error",
                  });
            }
        } else {
            swal({
                title: "Usuario no eliminado",
                icon: "success",
              });
        }
      });
}