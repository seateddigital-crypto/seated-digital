// Scroll-reveal: fade/slide elements in as they enter the viewport
const revealEls = document.querySelectorAll(".reveal");

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => revealObserver.observe(el));

// Nav: add a raised/opaque state once the page has scrolled past the hero
const nav = document.querySelector(".nav");

function updateNavState() {
  if (window.scrollY > 40) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNavState, { passive: true });
updateNavState();

// Hero: crossfade background photos as the hero scrolls past (no pinning)
const heroScroll = document.querySelector(".hero-scroll");
const heroLayers = document.querySelectorAll(".hero-bg-layer");

function updateHeroBg() {
  if (!heroScroll || heroLayers.length === 0) return;
  const rect = heroScroll.getBoundingClientRect();
  const heroHeight = heroScroll.offsetHeight;
  if (heroHeight <= 0) return;

  const progress = Math.min(Math.max(-rect.top / heroHeight, 0), 1);
  const activeIndex = Math.min(
    heroLayers.length - 1,
    Math.floor(progress * heroLayers.length)
  );

  heroLayers.forEach((layer, i) => layer.classList.toggle("active", i === activeIndex));
}

window.addEventListener("scroll", updateHeroBg, { passive: true });
window.addEventListener("resize", updateHeroBg);
updateHeroBg();
