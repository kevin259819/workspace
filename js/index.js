document.addEventListener("DOMContentLoaded", function(){
    const nombreUsuario = localStorage.getItem("username"); // Traigo el nombre del usuario que está guardado en localStorage
if (nombreUsuario) { // Si hay un usuario guardado, lo muestro en el span de la barra
    const nombreElemento = document.getElementById("nombre-usuario"); // Selecciono el elemento <span> de la barra de navegación por su id
    if (nombreElemento) {
        nombreElemento.textContent = nombreUsuario; // Inserto el nombre dentro del <span> para que se muestre en pantalla
    }
}
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});