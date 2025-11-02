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
                    <h3 id="tituloCarrito">Producto Seleccionado</h3>
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <img id="imgCarritoDiv" class="imgCarrito img-fluid" src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="col-6 text-center alin-items-center d-flex flex-column justify-content-center">
                    <div id="infoCarrito">
                        <h3 class="tituloCarrito">${producto.nombre}</h3>
                        <p class="precioCarrito">Precio: ${producto.moneda} ${producto.costo}</p>
                        <p class="cantidad">Cantidad: <span class="valorCantidad">${producto.cantidad}</span> Unds.</p>
                        <p class="subtotal">Subtotal: ${producto.moneda} ${producto.costo * producto.cantidad}</p>
                        <p>Envio: ${producto.moneda} 0</p>
                        <h4 class="total">Total: ${producto.moneda} ${producto.costo * producto.cantidad}</h4>
                    </div>
                </div>  
            </div>

            <div class="row"> 
                <div class="col-6" style="display:flex; justify-content:center; align-items:center;">
                    <button class="botonMenos" data-id="${producto.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
                        </svg>
                    </button>
                    <input type="text" class="inputCantidad justify-content-center" size="1" value="${producto.cantidad}" data-id="${producto.id}">
                    <button class="botonMas" data-id="${producto.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                        </svg>
                    </button>
                </div>
                <div class="col-6"></div>
            </div>

            <button class="btnEliminar" id="${producto.id}">Eliminar Producto</button>
        `;

        carritoContenedor.appendChild(contenedor);
    }

    // --- FUNCIONALIDAD DE LOS BOTONES +, -, Y CAMBIO DE INPUT ---
    function actualizarVistaYStorage() {
        saveCartArray(carritoDeCompras);
    }

    function actualizarProducto(id, nuevaCantidad) {
        const producto = carritoDeCompras.find(p => p.id == id);
        if (!producto || nuevaCantidad < 1) return;

        producto.cantidad = nuevaCantidad;

        // Actualizar DOM
        const contenedor = document.querySelector(`.inputCantidad[data-id="${id}"]`).closest(".productoEnCarrito");
        contenedor.querySelector(".valorCantidad").textContent = producto.cantidad;
        contenedor.querySelector(".subtotal").textContent = `Subtotal: ${producto.moneda} ${producto.costo * producto.cantidad}`;
        contenedor.querySelector(".total").textContent = `Total: ${producto.moneda} ${producto.costo * producto.cantidad}`;

        actualizarVistaYStorage();
    }

    // Botón +
    document.querySelectorAll(".botonMas").forEach(btn => {
        btn.addEventListener("click", e => {
            const id = e.currentTarget.dataset.id;
            const input = document.querySelector(`.inputCantidad[data-id="${id}"]`);
            let nuevaCantidad = parseInt(input.value) + 1;
            input.value = nuevaCantidad;
            actualizarProducto(id, nuevaCantidad);
        });
    });

    // Botón -
    document.querySelectorAll(".botonMenos").forEach(btn => {
        btn.addEventListener("click", e => {
            const id = e.currentTarget.dataset.id;
            const input = document.querySelector(`.inputCantidad[data-id="${id}"]`);
            let nuevaCantidad = parseInt(input.value) - 1;
            if (nuevaCantidad < 1) nuevaCantidad = 1;
            input.value = nuevaCantidad;
            actualizarProducto(id, nuevaCantidad);
        });
    });

    // Cambio directo en el input
    document.querySelectorAll(".inputCantidad").forEach(input => {
        input.addEventListener("input", e => {
            const id = e.currentTarget.dataset.id;
            const nuevaCantidad = parseInt(e.currentTarget.value) || 1;
            actualizarProducto(id, nuevaCantidad);
        });
    });
 // --- FUNCIONALIDAD DE ELIMINAR PRODUCTO ---
    document.querySelectorAll(".btnEliminar").forEach(btn => {
        btn.addEventListener("click", e => {
            const id = e.currentTarget.id;

            // Filtrar el carrito, dejando afuera el producto clickeado
            carritoDeCompras = carritoDeCompras.filter(p => p.id != id);

            // Actualizar storage y refrescar badge
            saveCartArray(carritoDeCompras);

            // Eliminar el producto visualmente del DOM
            e.currentTarget.closest(".productoEnCarrito").remove();
        });
    });
}); // Cierre del DOMContentLoaded

// === Utils carrito (cart) ===
function getCartArray() {
  try {
    const raw = localStorage.getItem("productoAlCarrito");
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveCartArray(arr) {
  localStorage.setItem("productoAlCarrito", JSON.stringify(arr));
  if (window.updateCartBadge) window.updateCartBadge();
}

// Por si querés refrescar el badge al entrar a cart.html
document.addEventListener("DOMContentLoaded", () => {
  if (window.updateCartBadge) window.updateCartBadge();
});
