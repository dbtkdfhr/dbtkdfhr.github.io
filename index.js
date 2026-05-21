const vibeButton = document.querySelector("#vibeButton");
const toast = document.querySelector("#toast");
const navLinks = [...document.querySelectorAll(".nav a")];
const workItems = [...document.querySelectorAll(".work-item[data-github-url]")];
const sections = navLinks
.map((link) => document.querySelector(link.getAttribute("href")))
.filter(Boolean);

const palettes = [
  { accent: "#caff2f", accent2: "#ff4f9f", accent3: "#4fc3ff", label: "Lime punch" },
  { accent: "#7cf7ff", accent2: "#ffde59", accent3: "#ff4f9f", label: "Cyber soda" },
  { accent: "#ff7a30", accent2: "#7cf7ff", accent3: "#d8ff5f", label: "Tangerine mode" }
];

let paletteIndex = 0;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

vibeButton.addEventListener("click", () => {
  paletteIndex = (paletteIndex + 1) % palettes.length;
  const palette = palettes[paletteIndex];
  document.documentElement.style.setProperty("--accent", palette.accent);
  document.documentElement.style.setProperty("--accent-2", palette.accent2);
  document.documentElement.style.setProperty("--accent-3", palette.accent3);
  showToast(`${palette.label} 적용 완료`);
});

function openWorkItem(item) {
  const githubUrl = item.dataset.githubUrl;
  if (!githubUrl) return;
  window.open(githubUrl, "_blank", "noopener");
}

workItems.forEach((item) => {
  item.addEventListener("click", () => openWorkItem(item));
  item.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openWorkItem(item);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, {
  rootMargin: "-45% 0px -45% 0px",
  threshold: 0
});

sections.forEach((section) => observer.observe(section));
