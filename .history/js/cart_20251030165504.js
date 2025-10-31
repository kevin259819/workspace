addEventListener("DOMContentLoaded", () => {

    let carritoContenedor = document.getElementById("CarritoConteiner");

    let carritoDeCompras = JSON.parse(localStorage.getItem("productoAlCarrito")) || [];

    for (let producto of carritoDeCompras) {
        let contenedor = document.createElement("div");
        contenedor.className = "productoEnCarrito row";
        contenedor.innerHTML = `


            <div class="row">
                <div class="col-1">
                    <button class="btnEliminar" id="${producto.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4h7.764L13 12.235V5h-2V4H5v1H3.118V12.235z"/>
                        </svg>
                    </button>
                </div>
                <div class="col-11">
                    <H3>Producto Seleccionado</H3>
                </div>
            </div>


            <div class="row">
                <div class="col-6">
                    <img class="imgCarrito img-fluid" src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="col-6 justify-text-center align-items-center">
                    <h3 class="tituloCarrito">${producto.nombre}</h3>
                    <p class="precioCarrito">${producto.moneda} ${producto.costo}</p>
                </div>
            </div>


            <div class="row"> 
                <div class="col-6" style="display:flex; justify-content:center; align-items:center;">
                    <button id="${producto.id}+">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                    </button>
                    <input type="text" class="inputCantidad" size="1" value="${producto.cantidad}">            
                    <button id="${producto.id}-">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                        </svg> 
                    </button>
                </div>
                <div class="col-6"></div>
            </div>
            <button class="btnEliminar" id="${producto.id}">Eliminar Producto</button>
            
        `;
        document.getElementById("CarritoConteiner").appendChild(contenedor);
    }


});// Cierre del DOMContentLoaded