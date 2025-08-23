function redirigir() {
  window.location.href = "index.html"; // Redirige a la página de inicio
}
    document.addEventListener("DOMContentLoaded", function () {
  const botonIngresar = document.getElementById("boton-ingresar");
  const passwordInput = document.getElementById("Contraseña");
  const userInput = document.getElementById("Usuario");

  botonIngresar.addEventListener("click", function () {
    const user = userInput.value.trim();
    const pass = passwordInput.value.trim();

    if (user !== "" && pass !== "") {
      // Guarda datos en localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", user);

      alert("¡Bienvenido, " + user + "!");
      // Redirigir a la página principal
      window.location.href = "index.html";
    } else {
      alert("Por favor, completa todos los campos.");
    }
  });
});