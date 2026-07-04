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
