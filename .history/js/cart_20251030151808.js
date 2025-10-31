addEventListener("DOMContentLoaded", () => {

    let contenedorCarrito = document.getElementById("CarritoConteiner");


let carritoDeCompras = JSON.parse(localStorage.getItem("productoAlCarrito")) || [];
for (let producto of carritoDeCompras) {
    let contenedor = document.createElement("div");
    contenedor.className = "productoEnCarrito";
    contenedor.innerHTML = `
        <img class="imgCarrito" src="${producto.img}">
        <h3 class="tituloCarrito">${producto.nombre}</h3>
        <p class="precioCarrito">$${producto.precio}</p>
        <p class="cantidadCarrito">Cantidad: ${producto.cantidad}</p>
        <button class="btnEliminar" id="${producto.id}">Eliminar Producto</button>
    `;
    document.getElementById("carritoContenedor").appendChild(contenedor);
}


});// Cierre del DOMContentLoaded -->)