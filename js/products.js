document.addEventListener("DOMContentLoaded", function () {
  const contenedor = document.getElementById("lista-autos");
  const searchInput = document.getElementById("search");
  let products = []; // para guardar los productos

  // URL de la API
  const url = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json"; // Arma la URL completa para pedir los productos correctos según la categoría elegida

  // Llamada a la API con fetch
  fetch(url)
    .then(function (respuesta) {
      return respuesta.json(); // convertimos la respuesta a JSON
    })
    .then(function (datos) {
      products = datos.products || [] //guarda el array original
      aplicarFiltrosYOrden(); // llamamos a la función con los productos
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
      aplicarFiltrosYOrden();
    }
  });

  /* ==== Filtros y orden para products.html ==== */
  var inputMin = document.getElementById("precio-min");
  var inputMax = document.getElementById("precio-max");
  var radiosOrden = document.querySelectorAll('input[name="orden"]');

  /** Devuelve el arreglo filtrado por buscador y precio, y ordenado según el radio elegido */
  function obtenerFiltradosYOrdenados() {
    var lista = products.slice(0); // copia para no tocar el original

    // --- Buscador (lo tomamos del input actual)
    var q = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    if (q !== "") {
      lista = lista.filter(function (p) {
        return (
          String(p.name).toLowerCase().includes(q) ||
          String(p.description).toLowerCase().includes(q)
        );
      });
    }

    // --- Filtro por precio
    var min = parseInt(inputMin && inputMin.value, 10);
    var max = parseInt(inputMax && inputMax.value, 10);
    if (isNaN(min)) min = null;
    if (isNaN(max)) max = null;

    if (min !== null) {
      lista = lista.filter(function (p) { return Number(p.cost) >= min; });
    }
    if (max !== null) {
      lista = lista.filter(function (p) { return Number(p.cost) <= max; });
    }

    // --- Orden
    var criterio = "relevante"; // coincide con "Más relevantes"
    for (var i = 0; i < radiosOrden.length; i++) {
      if (radiosOrden[i].checked) {
        criterio = radiosOrden[i].value; // "menor" | "mayor" | "relevante"
        break;
      }
    }

    if (criterio === "menor") {
      lista.sort(function (a, b) { return Number(a.cost) - Number(b.cost); });
    } else if (criterio === "mayor") {
      lista.sort(function (a, b) { return Number(b.cost) - Number(a.cost); });
    } else { // "relevante"
      lista.sort(function (a, b) { return Number(b.soldCount) - Number(a.soldCount); });
    }

    return lista;
  }

  function aplicarFiltrosYOrden() {
    var resultado = obtenerFiltradosYOrdenados();
    if (typeof mostrarProductos === "function") {
      mostrarProductos(resultado);
    } else {
      console.warn("No se encontró mostrarProductos(resultado)");
    }
  }

  /* ==== Listeners ==== */
  // Precio: aplicamos en vivo al tipear/cambiar
  if (inputMin) inputMin.addEventListener("input", aplicarFiltrosYOrden);
  if (inputMax) inputMax.addEventListener("input", aplicarFiltrosYOrden);

  // Orden: al cambiar el radio
  for (var r = 0; r < radiosOrden.length; r++) {
    radiosOrden[r].addEventListener("change", aplicarFiltrosYOrden);
  }
});
