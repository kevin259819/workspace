//se ejecuta apenas se carga el script
(function () {
  // Verificamos si el usuario ya inició sesión
  const logged =
    localStorage.getItem("isLoggedIn") === "true";

  // Detectamos si la página actual es "login.html"
  // Así evitamos entrar en un bucle (redirigir estando en el login)
  const isLogin = location.pathname.endsWith("login.html");

  // Si NO está logueado y NO está en login.html
  if (!logged && !isLogin) {
    location.replace("login.html"); //mandamos al login.html
  }
})();

// ==============================
// NUEVAS URLs (backend local)
// ==============================
const BASE_URL = "http://localhost:3000/json/";

const CATEGORIES_URL = BASE_URL + "cats/cat.json";
const PUBLISH_PRODUCT_URL = BASE_URL + "sell/publish.json";
const PRODUCTS_URL = BASE_URL + "cats_products/";
const PRODUCT_INFO_URL = BASE_URL + "products/";
const PRODUCT_INFO_COMMENTS_URL = BASE_URL + "products_comments/";
const CART_INFO_URL = BASE_URL + "user_cart/";
const CART_BUY_URL = BASE_URL + "cart/buy.json";

const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
        result.status = 'ok';
        result.data = response;
        hideSpinner();
        return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// ==============================
//     CERRAR SESIÓN 
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      // Eliminamos datos guardados
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("productoAlCarrito");

      // Redirigimos al login
      location.href = "login.html";
    });
  }
});