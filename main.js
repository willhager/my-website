document.addEventListener("DOMContentLoaded", () => {
  // Load header
  fetch("/header.html")
    .then(response => response.text())
    .then(data => {
      document.querySelector("header").innerHTML = data;

      // --- Determine current page/folder ---
      let path = window.location.pathname;

      // Normalize (remove trailing slash)
      if (path === "/" || path.endsWith("/")) path = path.slice(0, -1);

      // Extract folder name or file name
      let currentPage = path.split("/").pop();

      // Handle cases:
      // - If empty or "index.html" → home
      // - If folder (like /about) → use folder name
      if (!currentPage || currentPage === "index.html" || currentPage === "") {
        currentPage = "resume";
      }

      // Highlight active nav button
      let foundActive = false;

      document.querySelectorAll(".nav-btn").forEach(btn => {
        if (btn.getAttribute("data-page") === currentPage) {
          btn.classList.add("active");
          foundActive = true;
        }
      });

      // Fallback to home
      if (!foundActive) {
        const homeBtn = document.querySelector('.nav-btn[data-page="index"]');
        if (homeBtn) {
          homeBtn.classList.add("active");
        }
      }

      // --- Theme toggle ---
      const btn = document.querySelector(".theme-toggle");
      const icon = btn.querySelector("i");

      btn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        const isDark = document.documentElement.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");

        icon.classList.toggle("fa-moon", !isDark);
        icon.classList.toggle("fa-sun", isDark);
      });

      // --- Apply saved theme ---
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    })
    .catch(error => console.error("Error loading header:", error));
});
