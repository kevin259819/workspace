// Variables para manejar la galería de imágenes
let productImages = [];
let currentImageIndex = 0;

// === Inicialización principal ===
function initProductInfoPage() {
  const productId = localStorage.getItem('productId');

  if (!productId) {
    console.error('No se encontró el ID del producto.');
    return;
  }
  cargarInfoProducto(productId);
  cargarComentariosProducto(productId);
  configurarNuevoComentario(productId);
  botoncomprar(productId);
}

// === Carga los datos del producto ===
function cargarInfoProducto(productId) {
   // Hacemos la petición a la API
  fetch(PRODUCT_INFO_URL + productId + EXT_TYPE)
    .then(response => response.json())
    .then(productData => {
      // Rellenamos el HTML con los datos del producto
      document.getElementById('product-name').textContent = productData.name;
      document.getElementById('product-description').textContent = productData.description;
      document.getElementById('product-sold').textContent = `Vendidos: ${productData.soldCount}`;
      document.getElementById('product-category').textContent = `Categoría: ${productData.category}`;

      // Llenamos la galería de imágenes
      productImages = productData.images;
      if (productImages && productImages.length > 0) {
        showImage(0);
        generateThumbnails(productImages);
      }

      // Agregamos eventos a los botones de la galería
      document.getElementById('prev-image-btn').addEventListener('click', prevImage);
      document.getElementById('next-image-btn').addEventListener('click', nextImage);

      if (productData.relatedProducts && productData.relatedProducts.length > 0){
        mostrarProductosRelacionados(productData.relatedProducts);
      }
    })

    .catch(error => {
      console.error('Hubo un problema con la solicitud:', error);
    });
}

// === Carga los comentarios ===
function cargarComentariosProducto(productId) {
  // Hacemos la solicitud a la API para traer los comentarios del producto
    fetch(PRODUCT_INFO_COMMENTS_URL + productId + EXT_TYPE)
    .then(response => response.json())   // Convertimos la respuesta en JSON
    .then(commentsData => {
      // Seleccionamos el contenedor donde vamos a mostrar los comentarios
      const commentsContainer = document.getElementById('comments-container');
      commentsContainer.innerHTML = '';  // Limpiamos por si había algo antes

      // Recorremos cada comentario del array recibido desde la API
      commentsData.forEach(comment => {
        // Generamos las estrellas según el puntaje (score)
        const stars = '★'.repeat(comment.score) + '☆'.repeat(5 - comment.score);

        // Creamos un div para el comentario
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment-card'); // Clase CSS para estilos

        // Definimos el contenido del comentario con HTML
        commentDiv.innerHTML = `
          <div class="comment-header">
            <span class="comment-user">${comment.user}</span>
            <span class="comment-date">${comment.dateTime}</span>
          </div>
          <div class="comment-body">
            <p>${comment.description}</p>
            <div class="comment-stars">${stars}</div>
          </div>`;

        // Agregamos el comentario al contenedor en el HTML
        commentsContainer.appendChild(commentDiv);
      });
       // Cargar comentarios guardados localmente (simulados)
      const guardados = JSON.parse(localStorage.getItem("comentarios_" + productId)) || [];
      guardados.forEach(c => {
        const stars = '★'.repeat(c.score) + '☆'.repeat(5 - c.score);
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment-card');
        commentDiv.innerHTML = `
          <div class="comment-header">
            <span class="comment-user">${c.user}</span>
            <span class="comment-date">${c.dateTime}</span>
          </div>
          <div class="comment-body">
            <p>${c.description}</p>
            <div class="comment-stars">${stars}</div>
          </div>`;
        commentsContainer.appendChild(commentDiv);
      });
    })
    
    .catch(error => console.error('Error al cargar comentarios:', error));
}
// === Configurar envío de nueva calificación ===
function configurarNuevoComentario(productId) {
  const estrellas = document.querySelectorAll("#estrellas svg");
  const botonEnviar = document.getElementById("enviar-comentario");
  const comentarioInput = document.getElementById("comment-text");
  const contenedorComentarios = document.getElementById("comments-container");

  if (!botonEnviar || !comentarioInput || !contenedorComentarios) return;

  let puntuacion = 0;

  // Permitir seleccionar estrellas (1–5)
  estrellas.forEach((estrella, i) => {
    estrella.addEventListener("click", () => {
      puntuacion = i + 1;
      estrellas.forEach((e, j) =>  e.style.color = j < puntuacion ? "gold" : "gray");
    });
  });

  // Enviar comentario
  botonEnviar.addEventListener("click", (e) => {
    e.preventDefault();
    const texto = comentarioInput.value.trim();
    if (!texto || puntuacion === 0) {
      alert("Por favor, escribe un comentario y selecciona estrellas.");
      return;
    }

    const usuario = localStorage.getItem("username");
    const fecha = new Date().toLocaleString();

    const nuevoComentario = {
      user: usuario,
      description: texto,
      score: puntuacion,
      dateTime: fecha
    };

    // Guardar en localStorage
    const key = "comentarios_" + productId;
    const guardados = JSON.parse(localStorage.getItem(key)) || [];
    guardados.push(nuevoComentario);
    localStorage.setItem(key, JSON.stringify(guardados));

    // Mostrarlo inmediatamente en pantalla (como uno más)
    const stars = '★'.repeat(puntuacion) + '☆'.repeat(5 - puntuacion);
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment-card');
    commentDiv.innerHTML = `
      <div class="comment-header">
        <span class="comment-user">${usuario}</span>
        <span class="comment-date">${fecha}</span>
      </div>
      <div class="comment-body">
        <p>${texto}</p>
        <div class="comment-stars">${stars}</div>
      </div>`;
    contenedorComentarios.appendChild(commentDiv);
    
    // Limpiar el formulario
    comentarioInput.value = "";
    puntuacion = 0;
    estrellas.forEach(e => e.style.color = "gray");
  });
}


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

 //Productos relacionados
function mostrarProductosRelacionados(relatedProductsArray) {
  const relatedContainer = document.getElementById('related-products-container');
  relatedContainer.innerHTML = ''; 

  // Usamos el array que viene del fetch principal (productData.relatedProducts)
  relatedProductsArray.forEach(related => {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('col-md-6', 'col-lg-4', 'col-xl-3', 'mb-4'); 
    cardContainer.style.cursor = 'pointer';

    cardContainer.innerHTML = `
      <div class="card shadow-sm h-100">
        <img src="${related.image}" alt="${related.name}" class="card-img-top object-fit-cover" style="height: 150px;">
        <div class="card-body p-2">
          <p class="card-title text-center fw-bold mb-0">${related.name}</p>
        </div>
      </div>
    `;

    // Actualiza el ID y recarga la página
    cardContainer.addEventListener('click', () => {
      localStorage.setItem('productId', related.id);
      location.reload(); 
    });

    relatedContainer.appendChild(cardContainer);
  });
}

// === Agregamos la funcionalidad del botón COMPRAR ===
function botoncomprar(productId){
  const buyBtn = document.getElementById("buy-btn")
  if (!buyBtn) return;
  buyBtn.addEventListener("click", () => {
    fetch(PRODUCT_INFO_URL + productId + EXT_TYPE)
      .then(response => response.json())
      .then(productData => {
        const productoSeleccionado = {
          id: productId,
          nombre: productData.name,
          descripcion: productData.description,
          categoria: productData.category,
          imagen: productData.images[0],
          costo: productData.cost,
          moneda: productData.currency,
          cantidad: 1,
          subtotal: productData.cost * 1
          productoAlCarrito = []
          productoAlCarrito.push(productoSeleccionado);
        };

      // Guardamos en localStorage
      localStorage.setItem("productoAlCarrito", JSON.stringify(productoAlCarrito));

      // Redirigimos al carrito
      window.location.href = "cart.html";
    })
  });
}

// === Inicializa cuando se carga el documento ===
document.addEventListener('DOMContentLoaded', initProductInfoPage);