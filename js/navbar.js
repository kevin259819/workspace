document.addEventListener("DOMContentLoaded", function () {
  // Traigo el nombre de usuario guardado en localStorage durante el login
  const nombreUsuario = localStorage.getItem("username");

  // Si hay un usuario, lo pongo en el span de la barra
  if (nombreUsuario) {
    const nombreElemento = document.getElementById("nombre-usuario");
    if (nombreElemento) {
      nombreElemento.textContent = nombreUsuario;
    }
  }
});

// --- Carrito y badge ---
// Lee el carrito como array
function getCartItems() {
  try {
    const raw = localStorage.getItem("productoAlCarrito");
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    console.error("Error leyendo carrito:", e);
    return [];
  }
}

// Suma total de unidades
function getCartTotalCount() {
  return getCartItems().reduce((acc, p) => acc + (parseInt(p.cantidad, 10) || 0), 0);
}

// Inserta el link "Mi carrito" con badge si no existe y lo actualiza
function ensureCartLinkAndBadge() {
  // UL principal de la navbar
  const ul = document.querySelector(".navbar .navbar-nav.w-100");
  if (!ul) return;

  let li = document.querySelector("#nav-cart-item");
  if (!li) {
    li = document.createElement("li");
    li.className = "nav-item";
    li.id = "nav-cart-item";
    li.innerHTML = `<a id="nav-cart-link" class="nav-link position-relative" href="cart.html">
        Mi carrito <span id="cart-badge" class="badge bg-danger ms-1">0</span>
      </a>`;

    const dropdown = ul.querySelector(".nav-item.dropdown");
    if (dropdown) {
      ul.insertBefore(li, dropdown);
    } else {
      ul.appendChild(li);
    }
  }
  updateCartBadge();
}

// Actualiza el número del badge
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const total = getCartTotalCount();
  badge.textContent = total;
  badge.style.display = (total > 0) ? "inline-block" : "none";
}

// Global para que otras páginas lo llamen
window.updateCartBadge = updateCartBadge;

document.addEventListener("DOMContentLoaded", ensureCartLinkAndBadge);

window.addEventListener("storage", (e) => {
  if (e.key === "productoAlCarrito") updateCartBadge();
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("productoAlCarrito");

      location.href = "login.html";
    });
  }
});