const BACKEND_URL = "http://localhost:3000/login";

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

//==============================
//ENTREGA 8 PAUTA 3 
//==============================

// === CÓDIGO  CON FETCH POST ===
async function manejarLogin(user, pass) {
  if (user !== "" && pass !== "") {

    const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
            username: user,
            password: pass
        })
    });

    const data = await response.json(); 

    const token = data.token; 
    
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("authToken", token); 
    localStorage.setItem("username", user); 
    
    redirigir();
  }else{
    alert("Por favor, completa todos los campos.");
  }
}

document.addEventListener("DOMContentLoaded", initLoginPage);
