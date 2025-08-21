function redirigir() {
  window.location.href = "index.html"; // Redirige a la página de inicio
}


    document.addEventListener("DOMContentLoaded", function() {
      let botonIngresar = document.getElementById("boton-ingresar");
      let passwordInput = document.getElementById("Contraseña");
      let userInput = document.getElementById("Usuario");
      botonIngresar.addEventListener("click", function() {
        if((userInput.value !== "") && (passwordInput.value !== "")) {
          alert("¡Bienvenido!");
          redirigir();
        } else {
          alert("Por favor, completa todos los campos.");
        };})
  
      });