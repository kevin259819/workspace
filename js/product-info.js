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
    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud:', error);
    });
});