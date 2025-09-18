// Variables para manejar la galería de imágenes
let productImages = [];
let currentImageIndex = 0;

// Función para mostrar la imagen principal y resaltar la miniatura
function showImage(index) {
  const mainImage = document.getElementById('main-product-image');
  if (productImages.length > 0 && mainImage) {
    mainImage.src = productImages[index];
    const thumbnails = document.querySelectorAll('.thumbnail-gallery img');
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }
}

// Función para cambiar a la siguiente imagen
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % productImages.length;
  showImage(currentImageIndex);
}

// Función para cambiar a la imagen anterior
function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
  showImage(currentImageIndex);
}

// Función para generar las miniaturas de las imágenes
function generateThumbnails(imagesArray) {
  const thumbnailContainer = document.getElementById('image-thumbnails');
  thumbnailContainer.innerHTML = '';
  imagesArray.forEach((imageUrl, index) => {
    const thumbImg = document.createElement('img');
    thumbImg.src = imageUrl;
    thumbImg.alt = `Miniatura ${index + 1}`;
    thumbImg.addEventListener('click', () => {
      currentImageIndex = index;
      showImage(currentImageIndex);
    });
    thumbnailContainer.appendChild(thumbImg);
  });
}

// --- Desafíate ---
var comentariosBase = []; 
function storageKeyFor(productId){ return "myComments_" + productId; } // Clave única por producto
function cargarComentariosLocales(productId){ //
  try {
    var raw = localStorage.getItem(storageKeyFor(productId)); 
    return raw ? JSON.parse(raw) : []; // Devuelve un array vacío si no hay datos
  } catch(e){ return []; } // En caso de error, devuelve un array vacío
}
function guardarComentariosLocales(productId, arr){
  localStorage.setItem(storageKeyFor(productId), JSON.stringify(arr || [])); //gGuarda el array en localStorage
}
function estrellas(score){
  score = Number(score)||0; // Asegura que score es un número
  return '★'.repeat(score) + '☆'.repeat(5 - score); //Genera una cadena de estrellas
}
function renderComentarios(productId){ 
  var commentsContainer = document.getElementById('comments-container');
  if (!commentsContainer) return; //Si no existe el contenedor, salir
  commentsContainer.innerHTML = '';
  var locales = cargarComentariosLocales(productId);
  var todos = (comentariosBase || []).concat(locales); // Combina comentarios de la API y locales
  todos.forEach(function(comment){ // Recorre cada comentario
    var stars = estrellas(comment.score); // Genera las estrellas
    var commentDiv = document.createElement('div'); // Crea un div para el comentario
    commentDiv.classList.add('comment-card'); 
    commentDiv.innerHTML = `
      <div class="comment-header">
        <span class="comment-user">${comment.user || 'Anónimo'}</span>
        <span class="comment-date">${comment.dateTime || ''}</span>
      </div>
      <div class="comment-body">
        <p>${comment.description || ''}</p>
        <div class="comment-stars">${stars}</div>
      </div>`;
    commentsContainer.appendChild(commentDiv); // Agrega el comentario al contenedor
  });
}


// Lógica principal: se ejecuta cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
  const productId = localStorage.getItem('productId') || localStorage.getItem('productID'); // Por las dudas que le hayamos pifeado

  if (!productId) {
    console.error('No se encontró el ID del producto.');
    return;
  }

  // URL de la API con el ID del producto
  const productUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
  // URL de comentarios del producto
  const commentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

  // Desafíate
const form = document.getElementById('comment-form');
if (form) { // Si el formulario existe
  form.addEventListener('submit', function (e) { 
    e.preventDefault();
    const txtEl = document.getElementById('comment-text'); // Campo de texto del comentario
    const scoreEl = document.getElementById('comment-score'); // Campo del puntaje
    const texto = (txtEl && txtEl.value ? txtEl.value.trim() : ''); // Texto del comentario
    const score = parseInt(scoreEl && scoreEl.value, 10); // Puntaje como entero
    if (!texto || isNaN(score) || score < 1 || score > 5) return; // Validación básica

    const user = localStorage.getItem('username') || 'Tú'; // Usuario del comentario
    const d = new Date(); // Fecha y hora actual
    const fecha = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0') // Fecha en formato YYYY-MM-DD
                + ' ' + String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0') + ':' + String(d.getSeconds()).padStart(2,'0'); // Hora en formato HH:MM:SS

    const nuevo = { user: user, score: score, description: texto, dateTime: fecha }; // Nuevo comentario
    const locales = cargarComentariosLocales(productId); // Carga comentarios locales
    locales.push(nuevo); // Agrega el nuevo comentario
    guardarComentariosLocales(productId, locales); // Guarda los comentarios actualizados

    if (txtEl) txtEl.value = ''; //Limpia el campo de texto
    if (scoreEl) scoreEl.value = ''; // Limpia el campo del puntaje
    renderComentarios(productId); // Vuelve a renderizar los comentarios
  });
}

  // Hacemos la petición a la API
  fetch(productUrl)
    .then(response => response.json())
    .then(productData => {
      // Rellenamos el HTML con los datos del producto
      document.getElementById('product-name').textContent = productData.name;
      document.getElementById('product-description').textContent = productData.description;
      document.getElementById('product-sold').textContent = `Vendidos: ${productData.soldCount}`;
      document.getElementById('product-category').textContent = `Categoría: ${productData.category}`;

      // Productos relacionados
      const relGrid = document.getElementById('related-products');
      if (relGrid && Array.isArray(productData.relatedProducts) && productData.relatedProducts.length) { // Si hay productos relacionados
        relGrid.innerHTML = ''; // Limpiamos por si había algo antes
        productData.relatedProducts.forEach(function(rp){ 
          const col = document.createElement('div'); // Creamos una columna para cada producto relacionado
          col.className = 'col'; // Clase de Bootstrap para columnas
          col.innerHTML = ` 
            <div class="card h-100 related-item" data-id="${rp.id}">
              <img class="card-img-top" src="${rp.image}" alt="${rp.name}">
              <div class="card-body"><h6 class="card-title mb-0">${rp.name}</h6></div>
            </div>`;
          relGrid.appendChild(col); // Agregamos la columna al grid
        });
        relGrid.addEventListener('click', function(ev){ // Evento de clic para manejar la navegación
          let t = ev.target; // Elemento clickeado
          while (t && t !== relGrid) { // Subimos en el DOM hasta encontrar el contenedor o el grid
            if (t.classList && t.classList.contains('related-item')) { // Si encontramos un item relacionado
              const id = t.getAttribute('data-id'); // Obtenemos su ID
              localStorage.setItem('productId', id); // Guardamos el ID en localStorage
              localStorage.setItem('productID', id); // Por las dudas que le hayamos pifeado nuevamente
              window.location.href = 'product-info.html'; // Navegamos a la página del producto
              break; // Salimos del bucle
            }
            t = t.parentNode; // Subimos un nivel en el DOM - Este while requirió ayuda de IA para hacerlo funcionar.
          }
        });
      }

      // Llenamos la galería de imágenes
      productImages = productData.images;
      if (productImages && productImages.length > 0) {
        showImage(0);
        generateThumbnails(productImages);
      }

      // Agregamos eventos a los botones de la galería
      document.getElementById('prev-image-btn').addEventListener('click', prevImage);
      document.getElementById('next-image-btn').addEventListener('click', nextImage);
    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud:', error);
    });

// Hacemos la solicitud a la API para traer los comentarios del producto
  fetch(commentsUrl)
    .then(function(response){ return response.json(); })
    .then(function(commentsData){
      comentariosBase = Array.isArray(commentsData) ? commentsData : [];
      renderComentarios(productId);
    })
    .catch(function(error){ console.error('Error al cargar comentarios:', error); });
  });

