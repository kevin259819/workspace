// El ID del usuario se define como constante para construir el endpoint.
// Usamos 25801 como un ID de ejemplo para la URL.
const USER_ID = 25801; 
const CART_URL = `https://japceibal.github.io/emercado-api/user_cart/${USER_ID}.json`;

document.addEventListener('DOMContentLoaded', () => {
    const cartContent = document.getElementById('cart-content');
    
    // Función de ayuda para mostrar el mensaje de "Carrito Vacío" o error.
    const showEmptyCart = (message) => {
        cartContent.innerHTML = `
            <div class="empty-cart-message">
                <p>${message}</p>
            </div>
        `;
    };

    // 1. Realizar la petición GET al endpoint de la API
    fetch(CART_URL)
        .then(response => {
            // Verificación objetiva: si la respuesta no es 200 (OK), es un fallo.
            if (!response.ok) {
                // La realidad (el error del servidor) prevalece sobre la teoría.
                throw new Error(`Fallo en la petición HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // 2. Procesamiento y Verificación Racional de los Datos
            
            const articles = data.articles; // Obtenemos el array de artículos [cite: 82]

            if (articles && articles.length > 0) {
                
                // Objetivo del ejercicio: El prototipo solo mostraba UN producto.
                // Tomamos el primer elemento del array de artículos.
                const product = articles[0]; 
                
                // 3. Cálculos de Costos (Lógica Matemática)
                const subtotal = product.unitCost * product.count;
                const envio = 0; // Se asume Envío $0 según el prototipo inicial.
                const total = subtotal + envio;

                // 4. Renderizado del producto exitoso
                cartContent.innerHTML = generateCartHTML(product, subtotal, envio, total);
                
            } else {
                // La API fue contactada exitosamente, pero no devolvió artículos.
                showEmptyCart('El carrito está vacío. No hay productos cargados en su sesión.');
            }
        })
        .catch(error => {
            // El bloque 'catch' maneja fallos de red o errores de parsing JSON.
            console.error('Error empírico al obtener datos:', error);
            showEmptyCart('⚠️ Error de conexión: No se pudieron cargar los productos desde la API.');
        });
});

// Función auxiliar basada en la maquetación (HTML/CSS) del paso anterior
// Utiliza los campos exactos del modelo de respuesta de la API.
function generateCartHTML(product, subtotal, envio, total) {
    
    // Campos de la API usados: id, name, count, unitCost, currency, image [cite: 84, 86, 88, 90, 92, 94]
    return `
        <div class="product-item">
            <div class="product-details">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h2 class="product-title">${product.name}</h2>
                    <p class="product-price">Precio Unidad: ${product.currency} ${product.unitCost.toLocaleString('en-US')}</p>
                </div>
            </div>

            <div class="quantity-control">
                <button class="quantity-btn">-</button>
                <input type="text" class="quantity-input" value="${product.count}" readonly>
                <button class="quantity-btn">+</button>
            </div>
        </div>

        <div class="summary">
            <p>Pedido</p>
            <p>Subtotal (${product.count} producto): <span>${product.currency} ${subtotal.toLocaleString('en-US')}</span></p>
            <p>Envío: <span>${product.currency} ${envio.toLocaleString('en-US')}</span></p>
            <p class="summary-total">Total: <span>${product.currency} ${total.toLocaleString('en-US')}</span></p>
        </div>

        <div class="action-buttons">
            <button class="btn btn-primary">Finalizar Compra</button>
            <button class="btn btn-secondary">Continuar Comprando</button>
        </div>
    `;
}