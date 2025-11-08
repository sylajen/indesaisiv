const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];

document.addEventListener('DOMContentLoaded', () => {
  // Year
  const yearEl = $('#year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sidebar mobile toggle
  const sidebar = $('.sidebar'); const burger = $('.hamburger');
  if (burger) burger.addEventListener('click', () => sidebar.classList.toggle('open'));
  $$('.nav a').forEach(a => a.addEventListener('click', () => sidebar.classList.remove('open')));

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
