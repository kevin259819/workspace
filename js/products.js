document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.getElementById("lista-autos");

  // URL de la API
  const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

  // Llamada a la API con fetch
  fetch(url)
    .then(function (respuesta) {
      return respuesta.json(); // convertimos la respuesta a JSON
    })
    .then(function (datos) {
      console.log(datos); // para ver qué devuelve en consola
      mostrarProductos(datos.products); // llamamos a la función con los productos
    })
    .catch(function (error) {
      console.error("Error al cargar los productos:", error);
    });

  // Función para mostrar productos
  function mostrarProductos(productos) {
    contenedor.innerHTML = ""; // limpiar antes de cargar

    productos.forEach(function (prod) {  // recorremos el array "productos"
      
      //columna Bootstrap
      const col = document.createElement("div");
      col.className = "col";

      // Creamos un nuevo <div> para la tarjeta
      const card = document.createElement("div");
      card.classList.add("card");

      // Rellenamos con la info del producto
      card.innerHTML = `
        <img src="${prod.image}" alt="${prod.name}">
        <div>
          <h3>${prod.name}</h3>
          <p>${prod.description}</p>
          <p class="precio">${prod.currency} ${prod.cost}</p>
          <small>${prod.soldCount} vendidos</small>
        </div>
      `;

      //metemos card dentro de la columna
      col.appendChild(card);

      // Agregamos la tarjeta al contenedor principal
      contenedor.appendChild(card);
    });
  }
});