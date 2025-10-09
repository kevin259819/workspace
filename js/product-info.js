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

// Lógica principal: se ejecuta cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
  const productId = localStorage.getItem('productId');

  if (!productId) {
    console.error('No se encontró el ID del producto.');
    return;
  }

  // URL de la API con el ID del producto
  const productUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
  // URL de comentarios del producto
  const commentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

  // Hacemos la petición a la API
  fetch(productUrl)
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

    // Hacemos la solicitud a la API para traer los comentarios del producto
    fetch(commentsUrl)
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
    })
    
    .catch(error => console.error('Error al cargar comentarios:', error));
});

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