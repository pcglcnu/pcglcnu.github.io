
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
// Event Card Carousel
(function () {
  const carousels = document.querySelectorAll(".event-card-carousel");
  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".event-card-carousel-track");
    const slides = carousel.querySelectorAll(".event-card-carousel-slide");
    const prevBtn = carousel.querySelector(".event-card-carousel-prev");
    const nextBtn = carousel.querySelector(".event-card-carousel-next");
    const dotsWrap = carousel.querySelector(".event-card-carousel-dots");

    if (!track || slides.length === 0) return;

    const total = slides.length;
    let current = 0;
    let timer;
    const dots = [];

    track.style.transform = "translateX(0%)";

    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "event-card-carousel-dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
      });

      resetTimer();
    }

    function resetTimer() {
      clearInterval(timer);

      if (total > 1) {
        timer = setInterval(() => {
          goTo(current + 1);
        }, 4000);
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => goTo(current - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => goTo(current + 1));
    }

    carousel.addEventListener("mouseenter", () => clearInterval(timer));
    carousel.addEventListener("mouseleave", resetTimer);

    if (total <= 1) {
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      if (dotsWrap) dotsWrap.style.display = "none";
    }

    resetTimer();
  });
})();

//publications 불러오기//
const container = document.getElementById("pub-container");
if (container){
fetch("publications.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("pub-container");

    if (!container) {
      document.body.innerHTML += "<p>container 없음</p>";
      return;
    }
    data.forEach(({year, papers}) => {
      const block = document.createElement("div");
      block.className = "pub-year-block";

      block.innerHTML = `<h3 class = "pub-year">[ ${year} ]</h3> 
                        <ol class = "pub-list">
                        ${papers.map(p => `<li>${p}</li>`).join("")}
                        </ol>
                      `;

      container.appendChild(block);
    });
  })
  .catch(err => {
    console.error(err);
  });
}

// Event image lightbox
(function () {
  const eventImages = document.querySelectorAll(".event-card-carousel-slide img");
  if (!eventImages.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Expanded event image");

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "image-lightbox-close";
  closeBtn.setAttribute("aria-label", "Close image");
  closeBtn.innerHTML = "&times;";

  const image = document.createElement("img");
  image.alt = "";

  lightbox.appendChild(closeBtn);
  lightbox.appendChild(image);
  document.body.appendChild(lightbox);

  function openLightbox(src, alt) {
    image.src = src;
    image.alt = alt || "Expanded event image";
    lightbox.classList.add("open");
    document.body.classList.add("lightbox-open");
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.classList.remove("lightbox-open");
    image.removeAttribute("src");
  }

  eventImages.forEach((eventImage) => {
    eventImage.addEventListener("click", () => {
      openLightbox(eventImage.currentSrc || eventImage.src, eventImage.alt);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
})();
