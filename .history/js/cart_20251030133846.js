// Definimos el ID del usuario.
// ¡NOTA LÓGICA! Si tu ejercicio requiere un ID dinámico, debes obtenerlo de otra fuente (ej. login).
const USER_ID = 25801; 
const CART_URL = `https://japceibal.github.io/emercado-api/user_cart/${USER_ID}.json`;

document.addEventListener('DOMContentLoaded', () => {
    const cartContent = document.getElementById('cart-content');
    
    // 1. Realizar la petición GET al endpoint de la API
    fetch(CART_URL)
        .then(response => {
            // Verificación objetiva de la respuesta HTTP
            if (!response.ok) {
                // Prevalece la realidad (error HTTP) sobre la teoría (éxito)
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // 2. Procesamiento de los datos (la respuesta es el objeto completo de la API)
            
            const articles = data.articles;

            if (articles && articles.length > 0) {
                // El modelo de la API solo trae UN artículo para este ejemplo,
                // por lo que tomamos el primero (índice 0) para replicar el prototipo.
                const product = articles[0]; 
                
                // 3. Cálculo de los totales basados en la Racionalidad
                const subtotal = product.unitCost * product.count;
                const envio = 0; 
                const total = subtotal + envio;

                // 4. Renderizado del producto (basado en el prototipo anterior)
                cartContent.innerHTML = generateCartHTML(product, subtotal, envio, total);
                
            } else {
                // 5. Caso de Carrito Vacío (Respuesta de la API sin artículos)
                cartContent.innerHTML = `
                    <div class="empty-cart-message">
                        <p>El carrito está vacío. La API no devolvió productos.</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            // 6. Manejo de Fallo (La teoría falla, la realidad es un error de red o JSON)
            console.error('Error al obtener datos del carrito desde la API:', error);
            cartContent.innerHTML = `
                <div class="empty-cart-message">
                    <p>⚠️ Error de conexión: No se pudieron cargar los productos.</p>
                </div>
            `;
        });
});

// Función auxiliar para generar el HTML (similar a la solución anterior)
function generateCartHTML(product, subtotal, envio, total) {
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