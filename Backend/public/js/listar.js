async function eliminar(id) {
    const data = await JSON.parse(localStorage.getItem('dataUsuario'))
    swal({
        title: "¿Seguro que quieres eliminar el Producto?",
        text: "Una vez eliminado no lo puedes recuperar",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            try {
                let resultado = fetch("http://localhost:3000/productos/eliminar/" + id, { 
                method: 'delete',
                headers: {
                    "Accept": "application/json, text/plain, *,*",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${data.token}`
                }
                })
                if(resultado.status == 400){
                    swal({
                        title: "No tienes permiso para eliminar productos" ,
                        icon: "error",
                      });
                } else {
                    swal({
                        title: "Producto Eliminado Correctamente",
                        icon: "success",
                    });
                    setTimeout(() => {
                        location.href = '/productos'
                    }, 2000);
                }
    
            } catch (error) {
                swal({
                    title: "No tienes permiso para eliminar productos",
                    icon: "error",
                  });
            }
        } else {
            swal({
                title: "Producto no eliminado",
                icon: "success",
              });
        }
      });
}