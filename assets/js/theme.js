/* Shared by About, Publications and Misc; light is the first-visit default. */
(() => {
  "use strict";

  const storageKey = "academic-theme";
  const root = document.documentElement;
  const readTheme = () => {
    try {
      return localStorage.getItem(storageKey) === "dark" ? "dark" : "light";
    } catch {
      // Switching still works when the browser blocks storage.
      return root.dataset.theme === "dark" ? "dark" : "light";
    }
  };
  const applyTheme = theme => {
    root.dataset.theme = theme;
    const dark = theme === "dark";
    const button = document.querySelector(".theme-toggle");
    if (button) {
      button.setAttribute("aria-pressed", String(dark));
      button.title = dark ? "Switch to light mode" : "Switch to dark mode";
    }
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = dark ? "#161c20" : "#ffffff";
  };

  applyTheme(readTheme());
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(readTheme());
    const button = document.querySelector(".theme-toggle");
    if (!button) return;
    button.hidden = false;
    button.addEventListener("click", () => {
      const theme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(theme);
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // No persistence is available; retain the selected theme on this page.
      }
    });
  });
  // Also refresh pages restored from the back/forward cache and other open tabs.
  window.addEventListener("pageshow", () => applyTheme(readTheme()));
  window.addEventListener("storage", event => {
    if (event.key === storageKey || event.key === null) applyTheme(readTheme());
  });
})();
