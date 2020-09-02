var menuArray = [];
var comentariosArray = [];

function showMenu(array, arrayComments) {

    let verMenu = JSON.parse(localStorage.getItem("menu"));

    for (let i = 0; i < menuArray.length; i++) {
        let menu = array[i];
        let informacion = ""
        let imagenes = ""
        let comentarios = ""


        if (menu.id = verMenu.menuId) {
            informacion += '<h2>' + menu.nombre + '</h2>';
            informacion += '<strong>' + menu.description + '</strong>';
            informacion += '' + menu.ingredientes + '';
            informacion += menu.salsas;
            informacion += '$' + menu.precio;

            imageness += '<img class="img" src="img/"' + menu.nombre + 
            '/1.jpg" width="100px" heigt="100px" alt="">';
            imageness += '<img class="img" src="img/"' + menu.nombre + 
            '/2.jpg" width="100px" heigt="150px" alt="">';
            imagenes += '<img class="img" src="img/"' + menu.nombre + 
            '/3.jpg" width="100px" heigt="150px" alt="">';
        }

    }

    document.getElementById("informacion").innerHTML
    document.getElementById("imagenes").innerHTML = info;
    document.getElementById("comentarios").innerHTML = imgs;

}

document.addEventListener("DOMContentLoaded", function(e){  
    getJSONData(LIST_URL).then(function(resultObj){
      if (resultObj.status === "ok")
        {
            menuArray = resultObj.data;
            
            showMenu(menuArray);
        }
    });
})