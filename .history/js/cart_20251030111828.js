
// no vi que en ningún lugar donde se menciona el id del usuario asi que use este de ejemplo A007
let usuarioID = A007; //Esta cmo constante por si más adelante se quiere o necesita cambiar o se puede obtener de algún lado
let URL = `https://japceibal.github.io/emercado-api/user_cart/${usuarioID}.json`;


document.addEventListener('DOMContentLoaded', () => {
    let cartContent = document.getElementById('cart-content');
    
    // por si el carrito esta vacio
    let carritoVacio = (alertaCarritoVacio) => {
        cartContent.innerHTML = `
            <div class="empty-cart-message">
                <p>${alertaCarritoVacio}</p>
            </div>
        `;
    };
    // el fetch
    fetch(URL)
        .then(response => {
         
            if (!response.ok) {
               
                throw new Error(`Fallo en la petición HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            
            
            const articles = data.articles; 
            if (articles && articles.length > 0) {
                
            
                let product = articles; 
                
                let id
                let name = product.name;
                let count = product.count;
                let unitCost = product.unitCost;
                let currency = product.currency;
                let image = product.image;
                let subtotal = product.unitCost * product.count;
                
                

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