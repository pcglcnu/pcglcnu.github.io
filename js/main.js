// Navbar
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("nav-links");
if (hamburger) hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (nav) nav.style.background = window.scrollY > 50 ? "rgba(26,26,46,1)" : "rgba(26,26,46,.93)";
});

// Carousel
(function () {
  const track  = document.getElementById("carouselTrack");
  if (!track) return;
  const slides = track.querySelectorAll(".carousel-slide");
  const total  = slides.length;
  let current  = 0;
  let timer;

  // build dots
  const dotsWrap = document.getElementById("carouselDots");
  const dots = [];
  slides.forEach((_, i) => {
    const d = document.createElement("button");
    d.className = "carousel-dot" + (i === 0 ? " active" : "");
    d.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(d);
    dots.push(d);
  });

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  document.getElementById("carouselPrev").addEventListener("click", () => goTo(current - 1));
  document.getElementById("carouselNext").addEventListener("click", () => goTo(current + 1));

  // pause on hover
  track.closest(".hero-carousel").addEventListener("mouseenter", () => clearInterval(timer));
  track.closest(".hero-carousel").addEventListener("mouseleave", resetTimer);

  resetTimer();
})();
