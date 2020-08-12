var usuariosArray = []

function validarUsuario(array, email, contraseña) {

    for (let i = 0; i < array.length; i++) {
        let usuario = array[i];
        if (usuario.email == email && usuario.password == contraseña) {
            return true;
        }
    }
    return false;

}

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("enviar").addEventListener("click", function (e) {
        let ingEmail = document.getElementById("ingEmail");
        let ingContraseña = document.getElementById("ingContraseña");
        let datosCompletos = true;

        if (ingEmail.value === "") {
            ingEmail.classList.add("invalid");
            datosCompletos = false;
        }

        if (ingContraseña.value === "") {
            ingContraseña.classList.add("invalid");
            datosCompletos = false;
        }

        if (datosCompletos) {

            getJSONData(USUARIOS_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    usuariosArray = resultObj.data;

                    if (validarUsuario(usuariosArray, ingEmail.value, ingContraseña.value)) {
                        window.location = 'index.html';
                    }
                    else {
                        alert("Usuario o contraseña incorrectas!")
                    }
                }
            });

        }else {
            alert("Debes ingresar los datos!")
        }
    });
});
