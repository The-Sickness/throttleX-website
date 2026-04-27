// ThrottleX — main.js v2

// ── Nav scroll ───────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(5,5,7,0.97)'
    : 'rgba(5,5,7,0.85)';
});

// ── Mobile menu ──────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// ── Mode switcher ────────────────────────────
function switchMode(btn, imgSrc, title, text, highlights) {
  // Update tab active state
  document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  // Swap image with fade
  const screen = document.getElementById('modesScreen');
  screen.classList.add('fade');
  setTimeout(() => {
    screen.src = imgSrc;
    screen.onload = () => screen.classList.remove('fade');
    // If already cached, onload may not fire
    if (screen.complete) screen.classList.remove('fade');
  }, 220);

  // Update text
  document.getElementById('modeTitle').textContent = title;
  document.getElementById('modeText').textContent = text;

  const ul = document.getElementById('modeHighlights');
  ul.innerHTML = highlights.map(h => `<li>${h}</li>`).join('');
}

// ── FAQ accordion ────────────────────────────
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  document.querySelectorAll('.faq-q').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

// ── Contact form ─────────────────────────────
function handleSubmit(event) {
  // Let Netlify handle the actual submission
  // Just show success message after a short delay
  const form = event.target;
  const success = document.getElementById('formSuccess');
  const btn = form.querySelector('button[type="submit"]');

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Let the form submit naturally to Netlify
  setTimeout(() => {
    success.classList.add('show');
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }, 1000);
}

// ── Scroll reveal ────────────────────────────
const revealEls = document.querySelectorAll(
  '.feature-row, .faq-item, .pricing-card, .pill, .mode-tab, .modes-display'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ${i * 0.04}s ease, transform 0.5s ${i * 0.04}s ease`;
  observer.observe(el);
});
