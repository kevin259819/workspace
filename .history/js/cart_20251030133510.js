// Objeto de producto simulado, basado en el prototipo
const simulatedProduct = {
    name: "Suzuki Celerio",
    unitPrice: 12500,
    quantity: 1,
    imageURL: "./images/suzuki-celerio.jpg" // Necesitas una imagen con este nombre
};

// --- SIMULACIÓN DE ALMACENAMIENTO ---
// Ejecuta esta línea en la consola de tu navegador (F12)
// para simular que hay un producto cargado y probar el renderizado:
// localStorage.setItem('cartProduct', JSON.stringify(simulatedProduct));
//
// O ejecuta esta línea para simular un carrito vacío:
// localStorage.removeItem('cartProduct');
// ------------------------------------


document.addEventListener('DOMContentLoaded', () => {
    const cartContent = document.getElementById('cart-content');
    const storedProductJSON = localStorage.getItem('cartProduct');

    if (storedProductJSON) {
        // --- Condición Científicamente Correcta: El dato existe y es válido. ---
        try {
            const product = JSON.parse(storedProductJSON);
            const subtotal = product.unitPrice * product.quantity;
            const envio = 0; // Asumimos envío $0 por defecto según prototipo
            const total = subtotal + envio;

            // Uso de Template Strings para generar el HTML (la manera más limpia)
            cartContent.innerHTML = `
                <div class="product-item">
                    <div class="product-details">
                        <img src="${product.imageURL}" alt="${product.name}" class="product-image">
                        <div class="product-info">
                            <h2 class="product-title">${product.name}</h2>
                            <p class="product-price">Precio Unidad: USD $${product.unitPrice.toLocaleString('en-US')}</p>
                        </div>
                    </div>

                    <div class="quantity-control">
                        <button class="quantity-btn">-</button>
                        <input type="text" class="quantity-input" value="${product.quantity}" readonly>
                        <button class="quantity-btn">+</button>
                    </div>
                </div>

                <div class="summary">
                    <p>Pedido</p>
                    <p>Subtotal (${product.quantity} producto): <span>USD $${subtotal.toLocaleString('en-US')}</span></p>
                    <p>Envío: <span>USD $${envio.toLocaleString('en-US')}</span></p>
                    <p class="summary-total">Total: <span>USD $${total.toLocaleString('en-US')}</span></p>
                </div>

                <div class="action-buttons">
                    <button class="btn btn-primary">Finalizar Compra</button>
                    <button class="btn btn-secondary">Continuar Comprando</button>
                </div>
            `;
            
            // Nota: Se omiten las funciones de los botones (+/-) ya que no estaban en el alcance del requerimiento.

        } catch (error) {
            // Manejo de error si el JSON es inválido (prevalece la realidad sobre la teoría)
            console.error("Error al parsear el producto de localStorage:", error);
            cartContent.innerHTML = `
                <div class="empty-cart-message">
                    <p>⚠️ Error de datos: No se pudo cargar la información del producto.</p>
                </div>
            `;
        }
    } else {
        // --- Condición Objetiva: El dato no existe (null). ---
        cartContent.innerHTML = `
            <div class="empty-cart-message">
                <p>El carrito está vacío. No hay productos cargados en su sesión.</p>
            </div>
        `;
    }
});