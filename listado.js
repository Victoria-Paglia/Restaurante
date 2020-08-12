var menuArray = [];

function showMenuList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let menu = array[i];
        

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
            showMenuList(menuArray);
        }
    });

});