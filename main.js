// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("nav-links");
if (hamburger) hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (nav) nav.style.background = window.scrollY > 50
    ? "rgba(26,26,46,1)" : "rgba(26,26,46,.92)";
});
