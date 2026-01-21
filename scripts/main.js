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

  // Reveal-on-scroll animations for sections below the hero
  const revealEls = $$('.reveal-on-scroll');
  if (revealEls.length){
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion){
      revealEls.forEach(el => el.classList.add('is-visible'));
    } else if ('IntersectionObserver' in window){
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting){
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin:'0px 0px -12% 0px', threshold:0.2 });

      revealEls.forEach(el => io.observe(el));
    } else {
      // Fallback: show immediately on older browsers
      revealEls.forEach(el => el.classList.add('is-visible'));
    }
  }
    const wrap = document.getElementById('brands-grid-home');
    if (wrap) {
      wrap.innerHTML = brands.map(b => `
        <article class="brand-card">
          <img src="${b.img}" alt="${b.title}" loading="lazy" />
          <div class="brand-body">
            <div class="brand-tag gold-chip">${b.tag}</div>
            <h3 class="brand-title">${b.title}</h3>
            <p class="brand-desc">${b.desc}</p>
            <a class="cta luxe" href="${b.url}" target="_blank" rel="noopener">Visit ${b.title}</a>
          </div>
        </article>
      `).join('');
    }
});
