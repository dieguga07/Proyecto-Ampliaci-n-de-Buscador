//Selectores
const contenedoralerta = document.querySelector("#buscador")

const marca = document.querySelector("#marca")

const year = document.querySelector("#year")

const minimo = document.querySelector("#minimo")

const maximo = document.querySelector("#maximo")

const puertas = document.querySelector("#puertas")

const transmision = document.querySelector("#transmision")

const color = document.querySelector("#color")

const carrito = document.querySelector("#carrito")

const vaciarCarritoBtn = document.querySelector("#vaciar-carrito")

const comprarCarritoBtn = document.querySelector("#comprar-carrito")

const contenedorCarrito = document.querySelector("#lista-carrito tbody")

const contenedor = document.querySelector("#resultado")

const contenedorReseñas = document.querySelector(".listado-reseñas")

const enviarReseñaBtn = document.querySelector("#btn-envia-reseñas")

const contenidoReseña = document.querySelector("#comentario")

const usuarioReseña = document.querySelector("#nombre")

const valoracionReseña = document.querySelector("#calificacion")

const ordenarBtnMayor = document.querySelector("#btn-ordenar-mayor")

const ordenarBtnMenor = document.querySelector("#btn-ordenar-menor")

//Variables

let cochesCarrito = JSON.parse(localStorage.getItem("carrito")) || []


let listadoReseñas = JSON.parse(localStorage.getItem("listadoReseñas")) || []


const modal = new bootstrap.Modal("#modal")

//Eventos

ordenarBtnMayor.addEventListener("click",ordenarPorPrecioMayorAMenor)

ordenarBtnMenor.addEventListener("click",ordenarPorPrecioMenorAMayor)


document.addEventListener("DOMContentLoaded", () => {
    cargarReseñasDesdeLocalStorage();
    guardarCarritoEnLocalStorage();
    mostrarCoches(coches);
    carritoHTML();
    mostrarReseñasEnHTML();
});

enviarReseñaBtn.addEventListener("click", (e) => {
    e.preventDefault();
    validarreseñas();
});

carrito.addEventListener("click",eliminarCoche)

vaciarCarritoBtn.addEventListener("click",()=>{
    cochesCarrito = []
    limpiarCarrito()
    guardarCarritoEnLocalStorage()
})

comprarCarritoBtn.addEventListener("click",()=>{

    calcularImporteCarrito()
    mostrarMesnajeCompraModal()
    cochesCarrito = []
    limpiarCarrito()
    
    
})

marca.addEventListener("input", (e) => {

    datosBusueda.marca = e.target.value
    filtrarCoches()
    
})
    
    
year.addEventListener("input", (e) => {
    
        datosBusueda.year = parseInt(e.target.value)
        filtrarCoches()
})
    
    
minimo.addEventListener("input", (e) => {
    
        datosBusueda.minimo = parseInt(e.target.value)
        filtrarCoches()    
})
    
    
maximo.addEventListener("input", (e) => {
    
        datosBusueda.maximo = parseInt(e.target.value)
        filtrarCoches()    
})
    
puertas.addEventListener("input", (e) => {
    
        datosBusueda.puertas = parseInt(e.target.value)
        filtrarCoches()    
})
    
transmision.addEventListener("input", (e) => {
    
        datosBusueda.transmision = e.target.value
        filtrarCoches()    
})
    
color.addEventListener("input", (e) => {
    
        datosBusueda.color = e.target.value
        filtrarCoches()
            
})


const datosBusueda = {

    marca: ``,
    year: ``,
    minimo: ``,
    maximo: ``,
    puertas: ``,
    transmision: ``,
    color: ``,
    
}

//Crear los años del select

const max = new Date().getFullYear()

const min = max - 10

for (let i = max ; i > min ; i--){

    const option = document.createElement("option")

    option.value = i

    option.textContent = i

    year.appendChild(option)

}

//Funciones

function añadirReseña() {
    const reseña = document.createElement("div");
    reseña.classList.add("resena");
    reseña.innerHTML = `
        <p class="nombre-resena">Reseña de ${usuarioReseña.value}</p>
        <ul>
            <li class="puntuacion-resena">Puntuación: ${valoracionReseña.value}/5</li>
        </ul>
        <p class="opinion-resena">${contenidoReseña.value}</p>
        <br>
    `;
    contenedorReseñas.appendChild(reseña);

    const nuevaReseña = {
        nombre: usuarioReseña.value,
        puntuacion: valoracionReseña.value,
        opinion: contenidoReseña.value
    };
    listadoReseñas.push(nuevaReseña);
}

function mostrarReseñasEnHTML() {
    const contenedorReseñas = document.querySelector(".listado-reseñas");
    
    contenedorReseñas.innerHTML = "";

    listadoReseñas.forEach(reseña => {
        const reseñaElemento = document.createElement("div");
        reseñaElemento.classList.add("resena");
        reseñaElemento.innerHTML = `
            <p class="nombre-resena">Reseña de ${reseña.nombre}</p>
            <ul>
                <li class="puntuacion-resena">Puntuación: ${reseña.puntuacion}/5</li>
            </ul>
            <p class="opinion-resena">${reseña.opinion}</p>
            <br>
        `;
      
        contenedorReseñas.appendChild(reseñaElemento);
    });
}

function calcularImporteCarrito() {
    let precioTotal = 0;

    cochesCarrito.forEach((coche) => {
       
        precioTotal += coche.precio;
        
    });
    return precioTotal
}

function mostrarCoches(coches = []) {

    limpiarHTML(contenedor)

    coches.forEach((coche)=> {


      // Contenedor para las coches
      const contenedorCoches = document.createElement("DIV")


      contenedorCoches.classList.add("row", "mx-auto", "mb-4", "col-md-4")


      // Construimos el card de coches
      const cocheCard = document.createElement("DIV")
      cocheCard.classList.add("card", "mb-4")


      // Creamos la imagen
      const cocheImagen = document.createElement("IMG")
      cocheImagen.classList.add("card-img-top")
      cocheImagen.src = coche.img


      // Body del card
      const cocheCardBody = document.createElement("DIV")
      cocheCardBody.classList.add("card-body");


      // Titulo
      const cocheHeading = document.createElement("H3")
      cocheHeading.classList.add("card-title", "mb-3")
      cocheHeading.textContent = coche.marca + " " + coche.modelo


      // Boton
      const cocheButton = document.createElement("BUTTON")
      cocheButton.classList.add("btn", "btn-info", "w-50")
      cocheButton.textContent = "Añadir al carrito"

      const cocheButton_2 = document.createElement("BUTTON")
      cocheButton_2.classList.add("btn", "btn-warning", "w-50")
      cocheButton_2.textContent = "Ver más detalles"

      cocheButton.onclick = function() {
       cochesCarrito.push(coche) 
       carritoHTML()

      }

      cocheButton_2.onclick = function() {
        
        mostrarCocheModal(coche);
 
       }
      

      cocheCardBody.appendChild(cocheHeading)
      cocheCardBody.appendChild(cocheButton_2)
      cocheCardBody.appendChild(cocheButton)


      cocheCard.appendChild(cocheImagen)
      cocheCard.appendChild(cocheCardBody)


      contenedorCoches.appendChild(cocheCard)


      contenedor.appendChild(contenedorCoches)
      
  })
}

function filtrarCoches(){
    const resultado = coches
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor)

    if(resultado.length){
        mostrarCoches(resultado)
    }else{
        noResultado()
    }
    
}

function noResultado(){
    limpiarHTML()
    const noResultado = document.createElement("div")
    noResultado.classList.add("alerta", "error")
    noResultado.textContent = "No hay resultados"
    contenedor.appendChild(noResultado)
}

function filtrarMarca( coche ){

        if (datosBusueda.marca){
            return coche.marca === datosBusueda.marca
        }

        return coche

}

function filtrarYear( coche ){

    if (datosBusueda.year){
        return coche.year === datosBusueda.year
    }

    return coche

}

function filtrarMinimo( coche ){

    if (datosBusueda.minimo){
        return coche.precio >= datosBusueda.minimo
    }

    return coche

}

function filtrarMaximo( coche ){

    if (datosBusueda.maximo){
        return coche.precio <= datosBusueda.maximo
    }

    return coche

}

function filtrarPuertas( coche ){

    if (datosBusueda.puertas){
        return coche.puertas === datosBusueda.puertas
    }

    return coche

}

function filtrarTransmision( coche ){

    if (datosBusueda.transmision){
        return coche.transmision === datosBusueda.transmision
    }

    return coche

}

function filtrarColor( coche ){

    if (datosBusueda.color){
        return coche.color === datosBusueda.color
    }

    return coche

}

function limpiarHTML(){

    while (contenedor.firstChild) {
        contenedor.firstChild.remove()
    
    }
    
}
  
 function limpiarCarrito(){
    while (contenedorCarrito.firstChild){
        contenedorCarrito.firstChild.remove()
    }
    guardarCarritoEnLocalStorage()
 }

function carritoHTML() {
    limpiarCarrito();
    cochesCarrito.forEach((coche) => {
      const { id,img, marca, precio, modelo, color } = coche
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>
                  <img src="${img}" width="100">
              </td>
              <td>${marca}</td>
              <td>${modelo}</td>
              <td>${color}</td>
              <td>${precio}€</td>
              <td>
                  <a href="#"  class="btn btn-danger borrar-coche" data-id="${id}">Eliminar</a>
              </td>
              `
      contenedorCarrito.appendChild(row)
      guardarCarritoEnLocalStorage()
    })
}

function eliminarCoche(e) {

    if (e.target.classList.contains("borrar-coche")) {
      const id_coche = e.target.getAttribute("data-id")
      cochesCarrito = cochesCarrito.filter((coche) => coche.id !== id_coche);
     
      carritoHTML(cochesCarrito)
      guardarCarritoEnLocalStorage()
     
    }
}

function mostrarCocheModal(coche) {
    
    const modalTitle = document.querySelector(".modal .modal-title");
    const modalBody = document.querySelector(".modal .modal-body");

    modalTitle.textContent = coche.marca + " " + coche.modelo;
    modalBody.innerHTML = `
        <img class="img-fluid" src=${coche.img} alt=${coche.marca + " " + coche.modelo}>
        <h3 class="my-3">Propiedades del coche</h3>
        <ul>
        <li> Este coche tiene ${coche.puertas} puertas</li>
        <li> Transmición ${coche.transmision}</li>
        <li> Fabricado en el año ${coche.year}</li>
        <li>Su precio actual es ${coche.precio} €</li>
        </ul>
        `;
        

    const modalFooter = document.querySelector(".modal-footer");

    const btnCerrar = document.createElement("BUTTON");
    btnCerrar.classList.add("btn", "btn-secondary", "col");
    btnCerrar.textContent = "cerrar";

    modalFooter.appendChild(btnCerrar);

    btnCerrar.onclick = function () {
        modal.hide();
        modalFooter.firstChild.remove();
    };

    modal.show();
}

function mostrarMesnajeCompraModal() {
    const modalTitle = document.querySelector(".modal .modal-title");
    const modalBody = document.querySelector(".modal .modal-body");

    const precioTotal = calcularImporteCarrito();

    modalTitle.textContent = "Compra";
    modalBody.innerHTML = `
        <p>Su compra fue realizada con éxito.</p>
        <p>Precio total: ${precioTotal} €</p>
    `;

    modal.show();

    setTimeout(() => {
        modal.hide();
    }, 2000);
}

function guardarReseñasEnLocalStorage() {
    localStorage.setItem("listadoReseñas", JSON.stringify(listadoReseñas));
}

function cargarReseñasDesdeLocalStorage() {
    const reseñasGuardadas = JSON.parse(localStorage.getItem("listadoReseñas")) || [];
    listadoReseñas = reseñasGuardadas;
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(cochesCarrito))
}

function ordenarPorPrecioMayorAMenor() {
    
    coches.sort((a, b) => b.precio - a.precio);
    mostrarCoches(coches); 
}

function ordenarPorPrecioMenorAMayor() {

    coches.sort((a, b) => a.precio - b.precio);
    mostrarCoches(coches); 
}

function validarreseñas(){
if(contenidoReseña.value.trim() !== "" && usuarioReseña.value.trim() !== ""){
    añadirReseña();
    guardarReseñasEnLocalStorage();
    mostrarReseñasEnHTML();
}
   
}

