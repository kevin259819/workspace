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