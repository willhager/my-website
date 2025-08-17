document.addEventListener("DOMContentLoaded", () => {
  // Load header
  fetch("header.html")
    .then(response => response.text())
    .then(data => {
      document.querySelector("header").innerHTML = data;

      // Highlight active nav button
      const currentPage = window.location.pathname.split("/").pop();
      document.querySelectorAll(".nav-btn").forEach(btn => {
        if (btn.getAttribute("data-page") === currentPage) {
          btn.classList.add("active");
        }
      });

      // Theme toggle
      const btn = document.querySelector(".theme-toggle");
      const icon = btn.querySelector("i");

      btn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        const isDark = document.documentElement.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");

        // Update icon
        icon.classList.toggle("fa-moon", !isDark);
        icon.classList.toggle("fa-sun", isDark);
      });

      // Ensure correct icon on page load
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    })
    .catch(error => console.error("Error loading header:", error));
});