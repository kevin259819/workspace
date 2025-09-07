document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.getElementById("lista-autos");
  const searchInput = document.getElementById("search");
  let products = []; // para guardar los productos

  // URL de la API
  const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

  // Llamada a la API con fetch
  fetch(url)
    .then(function (respuesta) {
      return respuesta.json(); // convertimos la respuesta a JSON
    })
    .then(function (datos) {
      products = datos.products || [] //Ahora 'products' queda disponible para el buscador
      mostrarProductos(products); // llamamos a la función con los productos
    })
    .catch(function (error) {
      console.error("Error al cargar los productos:", error);
    });

  // Función para mostrar productos
  function mostrarProductos(productos) {
    contenedor.innerHTML = ""; // limpiar antes de cargar

    productos.forEach(function (prod) {  // recorremos el array "productos"
      
      // columna Bootstrap: que estire a la misma altura
      const col = document.createElement("div");
      col.className = "col d-flex";

      // tarjeta: h-100 para que iguale alturas dentro de la fila
      const card = document.createElement("div");
      card.className = "card h-100"; // en vez de classList.add("card")

      card.innerHTML = `
        <img src="${prod.image}" alt="${prod.name}" class="card-img-top">
        <div class="card-body d-flex flex-column">
          <h3 class="card-title">${prod.name}</h3>
          <p class="card-text">${prod.description}</p>

          <!-- Este bloque se pega al fondo gracias a mt-auto -->
          <div class="mt-auto">
            <p class="precio mb-1">${prod.currency} ${prod.cost}</p>
            <small class="text-white-50">${prod.soldCount} vendidos</small>
          </div>
        </div>
      `;

      //metemos card dentro de la columna
      col.appendChild(card);

      // Agregamos la tarjeta al contenedor principal
      contenedor.appendChild(col);
    });
  }

  //Buscador al presionar enter
  searchInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
      const query = this.value.toLowerCase().trim(); //pasamos a minuscula
    
      const filtrados = products.filter(function(p) //array con los productos coincidentes con la bsuqueda
      {
        return (
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        );
      });
      //mostrar los productos resultantes
      if(query === "")
        mostrarProductos(products);
      else
        mostrarProductos(filtrados);
    }
  });
});