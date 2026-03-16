/* ============================================================
   Dr. Akhilesh Kumar Singh — CV Website Script
   ============================================================ */

// ── EXPERIENCE YEAR AUTO-UPDATE ──────────────────────────────
const START_YEAR = 2002;
function updateExperienceYears() {
  const current = new Date().getFullYear();
  const years = current - START_YEAR;
  const el = document.getElementById('expYears');
  if (el) el.textContent = years;
}
updateExperienceYears();

// ── FOOTER YEAR ───────────────────────────────────────────────
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// ── STICKY NAV SHADOW ─────────────────────────────────────────
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}, { passive: true });

// ── MOBILE NAV TOGGLE ─────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) navLinks.classList.remove('open');
  });
}

// ── ACTIVE NAV LINK (SCROLL SPY) ──────────────────────────────
const sections = document.querySelectorAll('section[id], header[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });

// ── SCROLL REVEAL ─────────────────────────────────────────────
function initScrollReveal() {
  const targets = [
    '.summary-card',
    '.skill-card',
    '.timeline-item',
    '.consulting-card',
    '.edu-card',
    '.membership-item',
    '.training-item',
    '.study-tour-card',
    '.research-card',
    '.pub-group',
    '.award-card',
    '.extra-exp-item',
    '.extra-item',
    '.contact-card',
  ];

  const elements = document.querySelectorAll(targets.join(','));
  elements.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}

// ── COLLAPSIBLE PUBLICATION GROUPS ────────────────────────────
document.querySelectorAll('.pub-group-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    const content = btn.nextElementSibling;
    if (expanded) {
      content.classList.remove('open');
    } else {
      content.classList.add('open');
    }
  });
});

// ── SMOOTH SCROLL WITH OFFSET ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = document.getElementById('main-nav').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── PROFILE PHOTO FALLBACK ────────────────────────────────────
const photo = document.querySelector('.profile-photo');
if (photo) {
  photo.addEventListener('error', function() {
    this.style.display = 'none';
    const initials = document.querySelector('.profile-initials');
    if (initials) initials.style.display = 'flex';
  });
}