const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];

document.addEventListener('DOMContentLoaded', () => {
  // Year
  const yearEl = $('#year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sidebar mobile toggle
  const sidebar = $('.sidebar'); 
  const burger = $('.hamburger');
  
  if (burger) {
    // Toggle menu on hamburger click
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
      burger.setAttribute('aria-expanded', sidebar.classList.contains('open'));
    });
  }
  
  // Close menu when clicking nav links or CTA
  $$('.nav a, .sidebar .cta').forEach(a => a.addEventListener('click', () => {
    sidebar.classList.remove('open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }));
  
  // Close menu when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 960 && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && e.target !== burger) {
        sidebar.classList.remove('open');
        if (burger) burger.setAttribute('aria-expanded', 'false');
      }
    }
  });
  
  // Prevent body scroll when mobile menu is open
  const observer = new MutationObserver(() => {
    if (window.innerWidth <= 960) {
      document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    }
  });
  if (sidebar) observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });

  // Home typed & small entrance animation
  if ($('#typed')) {
    new Typed('#typed', {
      strings: window.SITE.heroPhrases, typeSpeed: 46, backSpeed: 26, backDelay: 1200, loop: true, smartBackspace: true
    });
  }
  if (window.gsap) {
    gsap.from('.brand, .nav a, .cta', {opacity:0, y:10, duration:.6, stagger:.05});
  }

  // Contact email (contact page)
  const email = window.SITE?.about?.contactEmail || 'hello@indesaisiv.ca';
  const emailLink = $('#contact-email');
  if (emailLink){ emailLink.href = `mailto:${email}`; emailLink.textContent = email; }
});
