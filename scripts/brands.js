document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.getElementById('brands-grid');
  const { brands } = window.SITE;
  
  wrap.innerHTML = brands.map((b) => `
    <a href="${b.url}" target="_blank" rel="noopener" class="brand-card" style="--brand-color: ${b.color}">
      <div class="brand-logo">
        <img src="${b.img}" alt="${b.title}" loading="lazy" />
      </div>
      <div class="brand-body">
        <h3 class="brand-title">${b.title}</h3>
        <p class="brand-desc">${b.desc}</p>
        <span class="cta-link">Learn More</span>
      </div>
    </a>
  `).join('');
});
