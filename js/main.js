
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
// Event cards remain static in grid view; all images are used by the gallery modal below.

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

// Event gallery lightbox
(function () {
  const eventCards = document.querySelectorAll(".event-card");
  if (!eventCards.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Event photo gallery");

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "image-lightbox-close";
  closeBtn.setAttribute("aria-label", "Close image");
  closeBtn.innerHTML = "&times;";

  const panel = document.createElement("div");
  panel.className = "image-lightbox-panel";

  const header = document.createElement("div");
  header.className = "image-lightbox-header";

  const title = document.createElement("h2");
  title.className = "image-lightbox-title";

  const gallery = document.createElement("div");
  gallery.className = "image-lightbox-gallery";

  lightbox.appendChild(closeBtn);
  header.appendChild(title);
  panel.appendChild(header);
  panel.appendChild(gallery);
  lightbox.appendChild(panel);
  document.body.appendChild(lightbox);

  function openLightbox(card) {
    const titleText = card.querySelector(".event-card-title")?.innerText.trim() || "Event photos";
    const images = card.querySelectorAll(".event-card-carousel-slide img");
    if (!images.length) return;

    title.textContent = titleText;
    gallery.innerHTML = "";
    images.forEach((sourceImage) => {
      const galleryImage = document.createElement("img");
      galleryImage.src = sourceImage.currentSrc || sourceImage.src;
      galleryImage.alt = sourceImage.alt || titleText;
      gallery.appendChild(galleryImage);
    });
    lightbox.classList.add("open");
    document.body.classList.add("lightbox-open");
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.classList.remove("lightbox-open");
    gallery.innerHTML = "";
  }

  eventCards.forEach((card) => {
    const preview = card.querySelector(".event-card-carousel");
    if (!preview) return;
    preview.addEventListener("click", () => {
      openLightbox(card);
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
