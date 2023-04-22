/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

// Plantilla de datosArqueros vacíos
Plantilla.datosArquerosNulos = {
    nombre: "undefined",
    apellido: "undefined",
    id: "undefined",
    nacionalidad: "undefined",
    edad: "undefined",
    disparo: "undefined",
    puntuaciones_de_la_tanda: "undefined"
}

// Plantilla de tags 
Plantilla.plantillaTags = {

    "NOMBRE": "### NOMBRE ###",
    "APELLIDO": "### APELLIDO ###",
    "ID": "### ID ###",
    "NACIONALIDAD": "### NACIONALIDAD ###",
    "EDAD": "### EDAD ###",
    "DISPARO": "### DISPARO ###",
    "PUNTUACIONES_DE_LA_TANDA": "### PUNTUACIONES DE LA TANDA ###"
  
}




/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}


// Plantilla para poner los datos de varios arqueros dentro de una tabla
Plantilla.plantillaTablaArqueros = {}

// Cabecera de la tabla para solo los nombres
Plantilla.plantillaTablaArqueros.cabeceraNombres = `<table width="100%" class="listado_arqueros">
<thead>
    <th width="15%">Nombre</th>
    <th width="15%">Apellido</th>
</thead>
<tbody>`;

// Cabecera de la tabla para todos los datos
Plantilla.plantillaTablaArqueros.cabeceraCompleta = `<table width="100%" class="listado_arqueros_completo">
<thead>
    <th >Id</th>
    <th >Nombre</th>
    <th >Apellido</th>
    <th >Nacionalidad</th>
    <th >Edad</th>
    <th >Disparo</th>
    <th >Puntuaciones de la Tanda</th>

</thead>
<tbody>`;

//Elementos RT que muestra los nombre y apellido de un Arquero
Plantilla.plantillaTablaArqueros.cuerpoNombres = `
<tr title="${Plantilla.plantillaTags.NOMBRE}">
    
    <td>${Plantilla.plantillaTags.NOMBRE}</td>
    <td>${Plantilla.plantillaTags.APELLIDO}</td>
    <td>
    <div></div>
</td>
</tr>
`;
//Elementos RT que muestra los datos de un Arquero
Plantilla.plantillaTablaArqueros.cuerpoCompleto = `
<tr title="${Plantilla.plantillaTags.NOMBRE}">
    <td>${Plantilla.plantillaTags.ID}</td>
    <td>${Plantilla.plantillaTags.NOMBRE}</td>
    <td>${Plantilla.plantillaTags.APELLIDO}</td>
    <td>${Plantilla.plantillaTags.NACIONALIDAD}</td>
    <td>${Plantilla.plantillaTags.EDAD}</td>
    <td>${Plantilla.plantillaTags.DISPARO}</td>
    <td>${Plantilla.plantillaTags["PUNTUACIONES_DE_LA_TANDA"]}</td>
    <td>
    <div></div>
</td>
</tr>
`;
//pie de la tabla 
Plantilla.plantillaTablaArqueros.pie = `</tbody>
</table>
`;

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos del arquero que se le pasa
 * @param {String} plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Plantilla} arquero Objeto con los datos del arquero que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */ 
Plantilla.sustituyeTags = function (plantilla, arquero) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), arquero.data.id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), arquero.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDO, 'g'), arquero.data.apellido)
        .replace(new RegExp(Plantilla.plantillaTags.NACIONALIDAD, 'g'), arquero.data.nacionalidad)
        .replace(new RegExp(Plantilla.plantillaTags.EDAD, 'g'), arquero.data.edad)
        .replace(new RegExp(Plantilla.plantillaTags.DISPARO, 'g'), arquero.data.disparo.tipo_de_arco +", "+arquero.data.disparo.distancia_de_tiro+", "+arquero.data.disparo.tipo_de_flecha)
        .replace(new RegExp(Plantilla.plantillaTags["PUNTUACIONES_DE_LA_TANDA"], 'g'), arquero.data.puntuaciones_de_la_tanda)
        
}
/**
 * Actualiza el cuerpo de la tabla con los datos del arquero que se le pasa
 * @param {arquero} arquero Objeto con los datos de la persona que queremos escribir el TR
 * @returns La plantilla de cuerpo de la tabla con los datos actualizados
 */
Plantilla.plantillaTablaArqueros.actualizaNombres = function (arquero) {
    return Plantilla.sustituyeTags(this.cuerpoNombres, arquero)
}
/**
 * Actualiza el cuerpo de la tabla con los datos de el arquero que se le pasa
 * @param {arquero} arquero Objeto con los datos de la persona que queremos escribir el TR
 * @returns La plantilla des cuerpo de la tabla con los datos actualizados
 */
Plantilla.plantillaTablaArqueros.actualiza = function (arquero) {
    return Plantilla.sustituyeTags(this.cuerpoCompleto, arquero)
}

/**
 * Actualiza el cuerpo de la tabla con los datos del arquero que se le pasa
 * @param {arquero} arquero Objeto con los datos de la persona que queremos escribir el TR
 * @returns La plantilla de cuerpo de la tabla con los datos actualizados
 */
Plantilla.plantillaTablaArqueros.actualizaNombresOrdenados = function (arquero) {
    return Plantilla.sustituyeTags(this.cuerpoNombres, arquero)
}

/**
 * Función que recuperar todos los arqueros llamando al MS Plantilla
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Plantilla.recupera = async function (callBackFn, direccion) {
    let response = null

    // Intento conectar con el microservicio 
    try {
        const url = Frontend.API_GATEWAY + direccion
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los arqueros que se han descargado
    let vectorArqueros = null
    if (response) {
        vectorArqueros  = await response.json()
        callBackFn(vectorArqueros.data)
    }
}

/**
 * Función para mostrar solo los nombre de todos los arqueros
 * que se recuperan de la BBDD
 * @param {vector_de_arqueros} vector 
 */
Plantilla.imprimeSoloNombres = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaArqueros.cabeceraNombres
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += Plantilla.plantillaTablaArqueros.actualizaNombres(e));
    }
    msj += Plantilla.plantillaTablaArqueros.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Plantilla del listado de los nombres de todos los arqueros", msj)
}

/**
 * Función para mostrar solo los nombre de todos los arqueros
 * que se recuperan de la BBDD
 * @param {vector_de_arqueros} vector 
 */
Plantilla.imprimeCompleto = function (vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaArqueros.cabeceraCompleta
    if (vector && Array.isArray(vector)) {
        vector.forEach(e => msj += Plantilla.plantillaTablaArqueros.actualiza(e));
    }
    msj += Plantilla.plantillaTablaArqueros.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Plantilla del listado de todos los datos de todos los arqueros", msj)
}

/**
 * Función que imprime todos los datos de todos los jugadores que se recuperan de la BBDD ordenados alfabéticamente
 * @param {vector_de_arqueros} vector 
 */
Plantilla.imprimeOrdenados = function(vector) {
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaArqueros.cabeceraNombres
    if (vector && Array.isArray(vector)) {
        vector.sort(function(a, b) {
            let nombreA = a.data.nombre.toUpperCase(); 
            let nombreB = b.data.nombre.toUpperCase(); 
            if (nombreA > nombreB) {
                return 1;
            }
            if (nombreA < nombreB) {
                return -1;
            }
            return 0;
        });

        vector.forEach(e => msj += Plantilla.plantillaTablaArqueros.actualizaNombresOrdenados(e));
    }
    msj += Plantilla.plantillaTablaArqueros.pie

    // Borrar toda la información del Article y la sustituyo por la que ma interesa
    Frontend.Article.actualizar("Plantilla del listado de los nombres de todos los arqueros ordenados", msj)
}



/**
 * Función que imprime todos los datos de todos los jugadores que se recuperan de la BBDD ordenados alfabéticamente
 * @param {vector_de_arqueros} vector 
 */
Plantilla.Ordena = function(vector) {

    vector.sort(function(min, max) {
        let nameMin = min.data.name.toUpperCase(); 
        let nameMax = max.data.name.toUpperCase(); 
        if (nameMin < nameMax) {
            return -1;
        }
        if (nameMin > nameMax) {
            return 1;
        }
        return 0;
    });

}

/**
 * Función principal para recuperar solo los nombres de los arqueros desde el MS, y posteriormente imprimirlos
 */
Plantilla.procesarListaNombre = function () {
    Plantilla.recupera(Plantilla.imprimeSoloNombres,"/plantilla/get_arqueros");
}

/**
 * Función principal para recuperar solo los nombres de los arqueros desde el MS, y posteriormente imprimirlos
 */
Plantilla.procesarListaEntera = function () {
    Plantilla.recupera(Plantilla.imprimeCompleto,"/plantilla/get_arqueros_completos");
}

/**
 * Funcion que lista los nombres de los arqueros ordenados alfabéticamente
 */
Plantilla.procesarListaNombreOrdenado = function() {
    Plantilla.recupera(Plantilla.imprimeOrdenados,"/plantilla/get_arqueros");
}
