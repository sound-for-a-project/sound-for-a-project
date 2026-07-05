/*==================================================
  SOUND FOR A PROJECT
  Main JavaScript
==================================================*/

const body = document.body;
const header = document.querySelector(".site-header");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleIcon = document.querySelector(".theme-toggle-icon");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

const THEME_KEY = "sfap-theme";

function applyTheme(theme) {
    body.classList.remove("light", "dark");
    body.classList.add(theme);

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        );
    }

    if (themeToggleIcon) {
        themeToggleIcon.textContent = theme === "dark" ? "●" : "○";
    }
}

function getInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    return body.classList.contains("dark") ? "dark" : "light";
}

function toggleTheme() {
    const currentTheme = body.classList.contains("dark") ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
}

function updateHeaderOnScroll() {
    if (!header) {
        return;
    }

    header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeMenu() {
    body.classList.remove("menu-open");

    if (menuToggle) {
        menuToggle.setAttribute("aria-label", "Open menu");
        menuToggle.setAttribute("aria-expanded", "false");
    }
}

function toggleMenu() {
    const isOpen = body.classList.toggle("menu-open");

    if (menuToggle) {
        menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    }
}

applyTheme(getInitialTheme());
updateHeaderOnScroll();

if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
}

if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.addEventListener("click", toggleMenu);
}

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", updateHeaderOnScroll);

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
        closeMenu();
    }
});
