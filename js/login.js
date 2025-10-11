function redirigir() {
  window.location.href = "index.html"; // Redirige a la página de inicio
}

function initLoginPage(){
  const botonIngresar = document.getElementById("boton-ingresar");
  const passwordInput = document.getElementById("Contraseña");
  const userInput = document.getElementById("Usuario");

  botonIngresar.addEventListener("click", function () {
    manejarLogin(userInput.value.trim(),passwordInput.value.trim());
  });
}

// === Lógica de validación e inicio de sesión ===
function manejarLogin(user, pass) {
  if (user !== "" && pass !== "") {
    // Guarda datos en localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", user);

    alert("¡Bienvenido, " + user + "!");
    // Redirigir a la página principal
    redirigir();
  } else {
    alert("Por favor, completa todos los campos.");
  } 
}

document.addEventListener("DOMContentLoaded", initLoginPage);
