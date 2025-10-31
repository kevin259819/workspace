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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                        </svg>
                    </button>
                </div>
                <div class="col-11">
                    <H3>Producto Agregado al Carrito</H3>
                </div>
            </div>

            <div class="row">
                <div class="col-4">
                    <img class="imgCarrito" src="${producto.img}">
                </div>
                <div class="col-8">
                    <h3 class="tituloCarrito">${producto.nombre}</h3>
                    <p class="precioCarrito">${producto.moneda} ${producto.costo}</p>
                </div>
            </div>
            <div class="row"> 
                <div class="col-12">
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
            </div>
            <p class="cantidadCarrito">Cantidad: ${producto.cantidad}</p>
            <button class="btnEliminar" id="${producto.id}">Eliminar Producto</button>
            
        `;
        // CORRECCIÓN CRÍTICA: Se corrige el ID a "CarritoConteiner" para que coincida con el HTML
        document.getElementById("CarritoConteiner").appendChild(contenedor);
    }


});// Cierre del DOMContentLoaded