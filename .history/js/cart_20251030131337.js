document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://japceibal.github.io/emercado-api/';
    const USER_ID = 25801; // ID de usuario de ejemplo, típicamente usado para obtener un carrito pre-cargado
    const CART_ENDPOINT = `user_cart/${USER_ID}.json`;
    const FULL_URL = API_BASE_URL + CART_ENDPOINT;
    
    const cartContainer = document.getElementById('cart-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const template = document.getElementById('cart-item-template');

    /**
     * @function renderCartItem
     * Crea y añade al DOM la tarjeta de un producto.
     * @param {Object} item - Objeto de producto con la estructura de la API.
     */
    const renderCartItem = (item) => {
        const clone = template.content.cloneNode(true);
        
        // Asignamos los datos (usando la estructura: name, count, unitCost, currency, image)
        const itemName = clone.querySelector('.item-name');
        const itemImage = clone.querySelector('.item-image');
        const itemUnitCost = clone.querySelector('.item-unit-cost');
        const itemCountInput = clone.querySelector('.item-count');
        const itemCountSummary = clone.querySelector('.item-count-summary');
        const itemSubtotal = clone.querySelector('.item-subtotal');
        const itemTotal = clone.querySelector('.item-total');

        // Cálculo racional y objetivo
        const totalCost = item.unitCost * item.count;
        const priceString = `${item.currency} $${item.unitCost.toLocaleString()}`;
        const totalString = `${item.currency} $${totalCost.toLocaleString()}`;

        itemName.textContent = item.name;
        itemImage.src = item.image;
        itemImage.alt = `Imagen de ${item.name}`;
        itemUnitCost.textContent = priceString;
        itemCountInput.value = item.count;
        itemCountSummary.textContent = item.count;
        itemSubtotal.textContent = totalString;
        itemTotal.textContent = totalString;

        cartContainer.appendChild(clone);
    };

    /**
     * @function loadAndRenderCart
     * Realiza el FETCH a la API y maneja la visualización del carrito.
     */
    const loadAndRenderCart = async () => {
        // En un entorno de producción, aquí se cargaría primero el localStorage
        // y la API solo se usaría para complementar o actualizar.
        
        // 1. **Lógica de Carrito Vacío (LocalStorage):**
        // Mantenemos esta parte para cumplir con la consigna original del `localStorage`.
        const storedItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        
        // Si no hay ítems en localStorage, intentamos cargar desde la API.
        if (storedItems.length === 0) {
            try {
                const response = await fetch(FULL_URL);
                
                // Si la teoría (respuesta 200 OK) difiere de la realidad (error o 404), prevalece la realidad (manejo del error).
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                
                const data = await response.json();
                
                // La API retorna un objeto con una clave 'articles' que es un array.
                const apiArticles = data.articles || [];

                if (apiArticles.length === 0) {
                    emptyCartMessage.style.display = 'block';
                } else {
                    // Si se encuentran ítems en la API, los renderizamos
                    apiArticles.forEach(renderCartItem);
                }

            } catch (error) {
                console.error("Error al obtener el carrito de la API:", error);
                // Si falla la conexión o la respuesta de la API, el carrito se considera vacío
                emptyCartMessage.textContent = "Error al cargar el carrito. Intente más tarde.";
                emptyCartMessage.style.display = 'block';
            }
        } else {
            // Si hay ítems en localStorage, los renderizamos primero
            storedItems.forEach(renderCartItem);
            
            // Aquí deberías agregar la lógica para integrar los artículos de la API si fuera necesario
            // (p. ej., si la API trae un ítem diferente al de localStorage, o actualizar precios).
            // Por simplicidad y enfoque en la consigna, solo renderizamos el localStorage si existe.
        }
    };

    loadAndRenderCart();
});