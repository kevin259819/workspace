document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profileForm");
  const emailInput = document.getElementById("email");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const phoneInput = document.getElementById("phone");
  const imageInput = document.getElementById("imageInput");
  const profileImage = document.getElementById("profileImage");
  const changeImageBtn = document.getElementById("changeImageBtn");
  const editButtons = document.querySelectorAll(".edit-btn");

 const storedUserEmail = localStorage.getItem("userEmail") || localStorage.getItem("username");
const defaultEmail = storedUserEmail || "usuario@ejemplo.com";

  // Cargar datos guardados si existen
  const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
  if (storedProfile) {
    firstNameInput.value = storedProfile.firstName || "";
    lastNameInput.value = storedProfile.lastName || "";
    emailInput.value = storedProfile.email || defaultEmail;
    phoneInput.value = storedProfile.phone || "";
  } else {
    emailInput.value = defaultEmail;
  }

  // Guardar datos
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const profileData = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    };
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    alert("Datos guardados correctamente.");
  });

  // Cambiar imagen
  changeImageBtn.addEventListener("click", () => {
    imageInput.click();
  });

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profileImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // 🔹 NUEVO: funcionalidad de los lápices
  editButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const fieldId = btn.getAttribute("data-field");
      const input = document.getElementById(fieldId);

      if (input.hasAttribute("readonly")) {
        input.removeAttribute("readonly");
        input.focus();
        btn.innerHTML = '<i class="bi bi-check-lg text-success"></i>'; // cambia el ícono a check
      } else {
        input.setAttribute("readonly", true);
        btn.innerHTML = '<i class="bi bi-pencil"></i>'; // vuelve al lápiz
      }
    });
  });
});