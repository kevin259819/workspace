addEventListener("DOMContentLoaded", () => {

    let carritoContenedor = document.getElementById("CarritoConteiner");

    let carritoDeCompras = JSON.parse(localStorage.getItem("productoAlCarrito")) || [];

    for (let producto of carritoDeCompras) {
        let contenedor = document.createElement("div");
        contenedor.className = "productoEnCarrito row";
        contenedor.innerHTML = `


            <div class="row">
                <div class="col-1">
                    <button class="btnEliminar" id="btnVolver">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                                </svg>
                    </button>
                </div>
                <div class="col-11">
                    <H3 id="tituloCarrito">Producto Seleccionado</H3>
                </div>
            </div>


            <div class="row">
                <div class="col-6" ">
                    <img id="imgCarritoDiv" class="imgCarrito img-fluid" src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="col-6  text-center alin-items-center d-flex flex-column justify-content-center">
                  <dib id="infoCarrito">
                    <dib>  <h3 class="tituloCarrito">${producto.nombre}</h3>
                        <p class="precioCarrito">Precio: ${producto.moneda} ${producto.costo}</p>
                        <p class= "cantidad">Cantidad: ${producto.cantidad} Unds.<p>
                        <p>Subtotal: ${producto.moneda} (${producto.costo * producto.cantidad})</p>
                        <p>Envio: ${producto.moneda} 0 </p>
                        <h4>Total: ${producto.moneda} (${producto.costo * producto.cantidad})</h4>
                    </div>
                  </div>  
                </div>
            </div>


            <div class="row"> 
                <div class="col-6" style="display:flex; justify-content:center; align-items:center;">
                    <button id="botonMas">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                        </svg>
                    </button>
                    <input type="text" id="barraCantidad" class="inputCantidad justify-content:center" size="1" value="${producto.cantidad}">
                    <button id="botonMenos">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
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