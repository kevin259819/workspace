document.addEventListener('DOMContentLoaded', () => {
    const cartContent = document.getElementById('cart-content');
    
    // Función de ayuda para mostrar el mensaje de "Carrito Vacío" o error.
    const showEmptyCart = (message) => {
        cartContent.innerHTML = `<div class="empty-cart-message"><p>${message}</p></div>`;
    };

    fetch(CART_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Fallo en la petición HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const articles = data.articles;

            if (articles && articles.length > 0) {
                
                // --- CAMBIO CLAVE: Procesar todos los productos ---
                
                let productsHTML = ''; // Almacena el HTML de cada producto
                let totalSubtotal = 0; // Acumulador para el subtotal total
                let productCount = 0; // Acumulador para la cantidad total de productos
                const envio = 0; // Asumimos Envío $0 por defecto.
                let currency = ''; // Almacena la moneda del primer producto (asumimos que es única)

                // 1. Iterar sobre el array de artículos
                articles.forEach(product => {
                    const subtotal = product.unitCost * product.count;
                    totalSubtotal += subtotal; // Acumula el costo total de todos los artículos
                    productCount += product.count; // Acumula la cantidad total de unidades
                    currency = product.currency; // Guarda la moneda para usarla en el resumen
                    
                    // 2. Generar el HTML para CADA producto y acumularlo
                    productsHTML += generateProductItemHTML(product);
                });
                
                const total = totalSubtotal + envio;

                // 3. Inyectar el HTML de todos los productos y el resumen
                cartContent.innerHTML = productsHTML + generateSummaryHTML(productCount, totalSubtotal, envio, total, currency);
                
            } else {
                showEmptyCart('El carrito está vacío. La API no devolvió productos.');
            }
        })
        .catch(error => {
            console.error('Error empírico al obtener datos:', error);
            showEmptyCart('⚠️ Error de conexión: No se pudieron cargar los productos desde la API.');
        });
});

// Función para generar el HTML de UN producto (dentro del bucle forEach)
function generateProductItemHTML(product) {
    // Calcula el costo individual del artículo (costo unitario * cantidad)
    const itemCost = product.unitCost * product.count; 
    
    return `
        <div class="product-item">
            <div class="product-details">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h2 class="product-title">${product.name}</h2>
                    <p class="product-price">Precio Unidad: ${product.currency} ${product.unitCost.toLocaleString('en-US')}</p>
                    <p class="product-subtotal">Subtotal Artículo: ${product.currency} ${itemCost.toLocaleString('en-US')}</p> 
                </div>
            </div>

            <div class="quantity-control">
                <button class="quantity-btn">-</button>
                <input type="text" class="quantity-input" value="${product.count}" readonly>
                <button class="quantity-btn">+</button>
            </div>
        </div>
        <hr/> `;
}

// Función para generar el HTML del Resumen (fuera del bucle)
function generateSummaryHTML(productCount, totalSubtotal, envio, total, currency) {
    return `
        <div class="summary">
            <p>Pedido</p>
            <p>Subtotal (${productCount} productos): <span>${currency} ${totalSubtotal.toLocaleString('en-US')}</span></p>
            <p>Envío: <span>${currency} ${envio.toLocaleString('en-US')}</span></p>
            <p class="summary-total">Total: <span>${currency} ${total.toLocaleString('en-US')}</span></p>
        </div>

        <div class="action-buttons">
            <button class="btn btn-primary">Finalizar Compra</button>
            <button class="btn btn-secondary">Continuar Comprando</button>
        </div>
    `;
}