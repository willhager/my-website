document.addEventListener("DOMContentLoaded", () => {
  fetch("/header.html")
    .then(response => response.text())
    .then(data => {
      document.querySelector("header").innerHTML = data;

      let path = window.location.pathname;
      let segments = path.split("/").filter(Boolean);
      let currentPage = segments.pop() || "index"; // e.g. "about", "resume", or "index"

      // Highlight the current nav button
      let foundActive = false;

      document.querySelectorAll(".nav-btn").forEach(btn => {
        if (btn.getAttribute("data-page") === currentPage) {
          btn.classList.add("active");
          foundActive = true;
        }
      });

      if (!foundActive) {
        const homeBtn = document.querySelector('.nav-btn[data-page="index"]');
        if (homeBtn) homeBtn.classList.add("active");
      }

      const btn = document.querySelector(".theme-toggle");
      const icon = btn.querySelector("i");

      btn.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        const isDark = document.documentElement.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");

        icon.classList.toggle("fa-moon", !isDark);
        icon.classList.toggle("fa-sun", isDark);
      });

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
