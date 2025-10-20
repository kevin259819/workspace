/* theme.js */
(function () {
  const STORAGE_KEY = "pref-theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
    updateToggle(theme);
  }

  function getInitial() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function updateToggle(theme) {
    const btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    btn.setAttribute("aria-pressed", theme === "dark");
  }

  // Inicializa
  const initial = getInitial();
  applyTheme(initial);

  // Click en botón
  window.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || initial;
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  });

  // Cambios del sistema (solo si el usuario no guardó nada)
  try {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", (e) => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) applyTheme(e.matches ? "dark" : "light");
    });
  } catch {}

  // Sincroniza entre pestañas
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      document.documentElement.setAttribute("data-theme", e.newValue);
      updateToggle(e.newValue);
    }
  });
})();
