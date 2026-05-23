// ThrottleX — main.js v2

// ── YouTube lazy facade ──────────────────────
function loadYouTube() {
  const facade = document.getElementById('ytFacade');
  if (!facade) return;
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube.com/embed/vTubq93eGOc?autoplay=1&rel=0';
  iframe.title = 'ThrottleX Real Motorcycle Telemetry on Elder Hill Road';
  iframe.frameBorder = '0';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:0;';
  facade.parentNode.style.position = 'relative';
  facade.parentNode.replaceChild(iframe, facade);
}

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

// ── Lightbox ─────────────────────────────────
function initLightbox() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.innerHTML = `
    <div class="lb-backdrop"></div>
    <div class="lb-content">
      <img class="lb-img" src="" alt="" />
      <button class="lb-close" aria-label="Close">&times;</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const lbImg = overlay.querySelector('.lb-img');
  const lbClose = overlay.querySelector('.lb-close');
  const lbBackdrop = overlay.querySelector('.lb-backdrop');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 300);
  }

  lbClose.addEventListener('click', closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Target every img inside the showcase section
  document.querySelectorAll('.showcase img, .showcase-kml-image img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.title = 'Click to enlarge';
    img.addEventListener('click', function() {
      openLightbox(this.src, this.alt);
    });
  });
}

// Wait for full DOM before initialising
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initLightbox, 0);
} else {
  document.addEventListener('DOMContentLoaded', initLightbox);
}
