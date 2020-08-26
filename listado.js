const ORDER_ASC_BY_PRECIO = "precio -> PRECIO"
const ORDER_DESC_BY_PRECIO = "PRECIO -> precio"
const ORDER_DESC_BY_ID = "ID -> id"

var menuArray = [];

var precioMin= undefined;
var precioMax= undefined;

function sortMenuList (criterio, array){
    let result = [];

    if (criterio === ORDER_ASC_BY_PRECIO){
        result = array.sort(function (a, b){
            if (a.precio < b.precio) {return -1;}
            if (a.precio > b.precio) {return 1;}
            return 0;
        });
    }
    else if (criterio === ORDER_DESC_BY_PRECIO){
        result = array.sort(function (a, b){
            if (a.precio > b.precio) {return -1;}
            if (a.precio < b.precio) {return 1;}
            return 0;
        });
    }
    else if (criterio === ORDER_DESC_BY_ID){
        result = array.sort(function (a, b){
            if (a.id > b.id) {return -1;}
            if (a.id < b.id) {return 1;}
            return 0;
        });
    }
    return result;
}

function showMenuList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let menu = array[i];
        
        if (((precioMin == undefined) || (precioMin !== undefined && parseInt(menu.precio) >= precioMin)) && 
        ((precioMax == undefined) || (precioMax !== undefined && parseInt(menu.precio) <= precioMax)))

        htmlContentToAppend += `
        <p><b>Nombre:</b> `+ menu.nombre +`</p>
        <p><b>Descripción</b>: `+ menu.description +`</p>
        <p><b>Precio</b>: `+ menu.precio +`</p>
        <hr>
        `

        document.getElementById("informacion").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){  
    getJSONData(LIST_URL).then(function(resultObj){
      if (resultObj.status === "ok")
        {
            menuArray = resultObj.data;
            //Muestro las categorías ordenadas

            menuArray = sortMenuList(ORDER_ASC_BY_PRECIO, menuArray)


            showMenuList(menuArray);
        }
    });

    document.getElementById("precioAsc").addEventListener("click", function (){
        
        menuArray = sortMenuList(ORDER_ASC_BY_PRECIO, menuArray)

        showMenuList(menuArray);
    });

    document.getElementById("precioDesc").addEventListener("click", function (){
        
        menuArray = sortMenuList(ORDER_DESC_BY_PRECIO, menuArray)

        showMenuList(menuArray);
    });

    document.getElementById("idDesc").addEventListener("click", function (){
        
        menuArray = sortMenuList(ORDER_DESC_BY_ID, menuArray)

        showMenuList(menuArray);
    });

    document.getElementById("añadir").addEventListener("click", function () {

        precioMin= document.getElementById("precio-min").value;
        precioMax= document.getElementById("precio-max").value;

        if ((precioMin !== undefined) && (precioMin !== "") && (parseInt(precioMin)) >= 0) {
            precioMin = parseInt(precioMin)
        } 
        else {
            precioMin = undefined
        }

        if ((precioMax !== undefined) && (precioMax !== "") && (parseInt(precioMax)) >= 0) {
            precioMax = parseInt(precioMax)
        } 
        else {
            precioMax = undefined
        }

        showMenuList(menuArray);

    });


    document.getElementById("borrar").addEventListener("click", function () { 
        document.getElementById("precio-min").value = "";
        document.getElementById("precio-max").value = "";

        precioMin = undefined;
        precioMax = undefined;

        showMenuList(menuArray);

    });
});