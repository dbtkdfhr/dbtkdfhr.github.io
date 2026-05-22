const navLinks = [...document.querySelectorAll(".nav a")];
const hashLinks = [...document.querySelectorAll('a[href^="#"]')];
const workItems = [...document.querySelectorAll(".work-item[data-github-url]")];
const slides = [...document.querySelectorAll(".hero, .section")];

let activeIndex = Math.max(0, slides.findIndex((slide) => `#${slide.id}` === window.location.hash));
let isTransitioning = false;
let touchStartY = 0;

function openWorkItem(item) {
  const githubUrl = item.dataset.githubUrl;
  if (!githubUrl) return;
  window.open(githubUrl, "_blank", "noopener");
}

function setActiveNav(activeSlide) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeSlide.id}`);
  });
}

function showSlide(nextIndex) {
  if (nextIndex < 0 || nextIndex >= slides.length || nextIndex === activeIndex || isTransitioning) return;

  const currentSlide = slides[activeIndex];
  const nextSlide = slides[nextIndex];
  isTransitioning = true;

  currentSlide.classList.remove("is-active");
  currentSlide.classList.add("is-exiting");
  nextSlide.classList.add("is-active");
  setActiveNav(nextSlide);
  history.replaceState(null, "", `#${nextSlide.id}`);

  window.setTimeout(() => {
    currentSlide.classList.remove("is-exiting");
    activeIndex = nextIndex;
    isTransitioning = false;
  }, 650);
}

function moveSlide(direction) {
  showSlide(activeIndex + direction);
}

slides.forEach((slide, index) => {
  slide.classList.toggle("is-active", index === activeIndex);
});
setActiveNav(slides[activeIndex]);

hashLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const nextIndex = slides.findIndex((slide) => `#${slide.id}` === targetId);
    if (nextIndex === -1) return;
    event.preventDefault();
    showSlide(nextIndex);
  });
});

workItems.forEach((item) => {
  item.addEventListener("click", () => openWorkItem(item));
  item.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openWorkItem(item);
  });
});

window.addEventListener("wheel", (event) => {
  if (Math.abs(event.deltaY) < 18) return;
  event.preventDefault();
  moveSlide(event.deltaY > 0 ? 1 : -1);
}, { passive: false });

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "PageDown") {
    event.preventDefault();
    moveSlide(1);
  }

  if (event.key === "ArrowUp" || event.key === "PageUp") {
    event.preventDefault();
    moveSlide(-1);
  }
});

window.addEventListener("touchstart", (event) => {
  touchStartY = event.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchend", (event) => {
  const touchEndY = event.changedTouches[0].clientY;
  const distance = touchStartY - touchEndY;
  if (Math.abs(distance) < 48) return;
  moveSlide(distance > 0 ? 1 : -1);
}, { passive: true });
