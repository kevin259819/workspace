// SIMULACIÓN DE CARGA INICIAL PARA PRUEBAS
// Puedes descomentar las siguientes líneas para PROBAR cómo se vería un carrito lleno.
/*
const mockCartData = [
    { id: 1, name: "Chevrolet Onix Joy", count: 1, unitCost: 13500, currency: "USD", image: "https://via.placeholder.com/120x80?text=Onix" },
    { id: 2, name: "Suzuki Celerio", count: 1, unitCost: 12500, currency: "USD", image: "https://via.placeholder.com/120x80?text=Celerio" },
    { id: 3, name: "Bugatti Chiron", count: 1, unitCost: 3500000, currency: "USD", image: "https://via.placeholder.com/120x80?text=Chiron" }
];
localStorage.setItem('cartItems', JSON.stringify(mockCartData));
*/

document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const template = document.getElementById('cart-item-template');

    /**
     * @function loadCartFromLocalStorage
     * Carga y parsea el array de productos del carrito desde localStorage.
     * @returns {Array} Un array de objetos de producto o un array vacío si no hay datos.
     */
    const loadCartFromLocalStorage = () => {
        try {
            const cartJSON = localStorage.getItem('cartItems');
            if (cartJSON) {
                // Validación estricta: aseguramos que el resultado sea un array.
                const items = JSON.parse(cartJSON);
                return Array.isArray(items) ? items : [];
            }
            return [];
        } catch (error) {
            console.error("Error al parsear datos de localStorage:", error);
            // Si la teoría (JSON.parse) difiere de la realidad (datos corruptos), prevalece la realidad.
            return [];
        }
    };

    /**
     * @function renderCart
     * Renderiza los productos en el DOM o muestra el mensaje de carrito vacío.
     */
    const renderCart = () => {
        const cartItems = loadCartFromLocalStorage();

        // 1. Lógica principal: verificar si hay productos.
        if (cartItems.length === 0) {
            // Caso de carrito vacío
            emptyCartMessage.style.display = 'block';
            return;
        }

        // Caso de carrito con productos
        emptyCartMessage.style.display = 'none';

        cartItems.forEach(item => {
            // Clonamos el contenido del template
            const clone = template.content.cloneNode(true);
            const card = clone.querySelector('.cart-item-card');

            // Asignamos los datos a los elementos correspondientes
            const itemName = clone.querySelector('.item-name');
            const itemImage = clone.querySelector('.item-image');
            const itemUnitCost = clone.querySelector('.item-unit-cost');
            const itemCountInput = clone.querySelector('.item-count');
            const itemCountSummary = clone.querySelector('.item-count-summary');
            const itemSubtotal = clone.querySelector('.item-subtotal');
            const itemTotal = clone.querySelector('.item-total');

            // Calculamos el costo total para el subtotal y total (Envío = $0)
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

            // Agregamos la tarjeta del ítem al contenedor principal
            cartContainer.appendChild(clone);
        });

        // NOTA: La lógica de los botones de cantidad (+/-) y la persistencia
        // de cambios en localStorage no están implementadas aquí,
        // ya que la consigna solo pide: "Al cargar la página se debe verificar"
        // y "se debe visualizar tal como se diseñó".
    };

    // Ejecutamos la función de renderizado al cargar el script
    renderCart();
});