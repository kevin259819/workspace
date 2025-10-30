
const USER_ID = 25801; 
const CART_URL = `https://japceibal.github.io/emercado-api/user_cart/${USER_ID}.json`;

document.addEventListener('DOMContentLoaded', () => {
    const cartContent = document.getElementById('cart-content');
    
    
    fetch(CART_URL)
        .then(response => {
           
            if (!response.ok) {
               
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
           
            const articles = data.articles;

            if (articles && articles.length > 0) {
              
                const product = articles[0]; 
                
             
                const subtotal = product.unitCost * product.count;
                const envio = 0; 
                const total = subtotal + envio;

                
                cartContent.innerHTML = generateCartHTML(product, subtotal, envio, total);
                
            } else {
              
                cartContent.innerHTML = `
                    <div class="empty-cart-message">
                        <p>El carrito está vacío. La API no devolvió productos.</p>
                    </div>
                `;
            }
        })
        .catch(error => {
           
            console.error('Error al obtener datos del carrito desde la API:', error);
            cartContent.innerHTML = `
                <div class="empty-cart-message">
                    <p>⚠️ Error de conexión: No se pudieron cargar los productos.</p>
                </div>
            `;
        });
});


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