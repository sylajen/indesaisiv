document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.getElementById('brands-grid');
  const { brands } = window.SITE;
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
});
