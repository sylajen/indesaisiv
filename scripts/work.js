// /scripts/work.js — collision-free; wrapped in an IIFE and uses local helpers.
(function () {
  const q  = (s, c=document) => c.querySelector(s);
  const qa = (s, c=document) => [...c.querySelectorAll(s)];
  const yThumb = id => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  const yOEmbed = id => `https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${id}`;

  // Cache YouTube titles to avoid repeat network calls across tab switches
  const titleCache = new Map();

  async function fetchYouTubeTitle(id){
    if (titleCache.has(id)) return titleCache.get(id);
    try{
      const res = await fetch(yOEmbed(id));
      if(!res.ok) throw new Error('oEmbed failed');
      const data = await res.json();
      // Strip anything after a pipe, hyphen, en dash (–), or em dash (—)
      const raw = (data.title || '');
      const separators = ['|','-','–','—'];
      let cut = raw.length;
      separators.forEach(sep => {
        const idx = raw.indexOf(sep);
        if (idx !== -1 && idx < cut) cut = idx;
      });
      const clean = raw.slice(0, cut).trim();
      titleCache.set(id, clean || data.title || '');
      return titleCache.get(id);
    }catch(e){
      // network/cors fallback: leave as-is
      titleCache.set(id, '');
      return '';
    }
  }

  // expose only these four on window for onclick handlers
  function openVideo(id){
    const url = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    q('#video-iframe').src = url;
    q('#videobox').classList.add('open');
    q('#videobox').setAttribute('aria-hidden','false');
    // Hide hamburger menu on mobile
    const burger = document.querySelector('.hamburger');
    if (burger) burger.style.display = 'none';
  }
  function closeVideo(){
    q('#video-iframe').src = '';
    q('#videobox').classList.remove('open');
    q('#videobox').setAttribute('aria-hidden','true');
    // Show hamburger menu again
    const burger = document.querySelector('.hamburger');
    if (burger) burger.style.display = '';
  }
  function openLightbox(src){
    q('#lightbox-img').src = src;
    q('#lightbox').classList.add('open');
    q('#lightbox').setAttribute('aria-hidden','false');
    // Hide hamburger menu on mobile
    const burger = document.querySelector('.hamburger');
    if (burger) burger.style.display = 'none';
  }
  function closeLightbox(){
    q('#lightbox').classList.remove('open');
    q('#lightbox').setAttribute('aria-hidden','true');
    // Show hamburger menu again
    const burger = document.querySelector('.hamburger');
    if (burger) burger.style.display = '';
  }
  window.openVideo = openVideo;
  window.closeVideo = closeVideo;
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;

  // Add ESC key listener to close video/lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (q('#videobox')?.classList.contains('open')) {
        closeVideo();
      } else if (q('#lightbox')?.classList.contains('open')) {
        closeLightbox();
      }
    }
  });

  document.addEventListener('DOMContentLoaded', async () => {
    const site = window.SITE || {};
    const videos  = site.videos  || [];
    const designs = site.designs || [];
    // Photos can come from external JSON for easy updates
    async function getPhotos(){
      try{
        const res = await fetch('/assets/photos/photos.json', {cache:'no-store'});
        if(res.ok){ const arr = await res.json(); if(Array.isArray(arr)) return arr; }
      }catch(e){ /* fall back to inline */ }
      return site.photos || [];
    }
    let photos = await getPhotos();

  const featuredWrap  = q('#featured-work');
  const filtersWrap   = q('#filters-wrap');
  const grid          = q('#work-grid');
  const heroThumb     = q('#work-hero-thumb');
  const playShowreel  = q('#play-showreel');

  const cardMarkup = (t, addClass='') => `
    <figure class="tile ${addClass}" role="button" tabindex="0" data-type="${t.type}" ${t.youtubeId ? `data-yid="${t.youtubeId}"` : ''} onclick="${t.onClick}" onkeypress="if(event.key==='Enter'){${t.onClick}}">
      <img src="${t.img}" alt="${t.title}" loading="lazy" />
      <figcaption class="tile-title" data-role="title">${t.title}</figcaption>
      <span class="tile-badge">${t.badge}</span>
    </figure>
  `;

  const videoCards = videos.map(x => ({
    type:'video',
    title:x.title,
    badge:`video · ${x.category}${x.tags?.length ? ` · ${x.tags.join(', ')}` : ''}`,
    img:yThumb(x.youtubeId),
    youtubeId:x.youtubeId,
    category:x.category,
    onClick:`openVideo('${x.youtubeId}')`
  }));
  const designCards = designs.map(x => ({
    type:'design',
    title:x.title,
    badge:'design',
    img:x.img,
    youtubeId:null,
    category:'Design',
    onClick:`openLightbox('${x.img}')`
  }));
  const photoCards = photos.map(x => ({
    type:'photo',
    title:x.title,
    badge:`photo${x.category?` · ${x.category}`:''}`,
    img:x.img,
    youtubeId:null,
    category:x.category || 'Photos',
    onClick:`openLightbox('${x.img}')`
  }));

  const allCards = [...videoCards, ...designCards, ...photoCards];

  let displayLimit = 9;

  const showreelId = 'BtmS_yjgInQ';
  if (heroThumb){
    heroThumb.innerHTML = `
      <button class="hero-thumb" onclick="openVideo('${showreelId}')" aria-label="Play showreel">
        <img src="${yThumb(showreelId)}" alt="Showreel" />
        <span class="play-badge">▶</span>
      </button>
    `;
    if (playShowreel) playShowreel.addEventListener('click', () => openVideo(showreelId));
  }

  const featuredIds = ['gBGtoQuhYlg', 'KpfO3oaktHw', 'KWOB9Ri3VZo'];
  const featured = videoCards.filter(v => featuredIds.includes(v.youtubeId));

  const categories = Array.from(new Set(allCards.map(c => c.category).filter(Boolean)));

  const renderFeatured = () => {
    if (!featured.length){ featuredWrap.innerHTML=''; return; }
    featuredWrap.innerHTML = `
      <div class="section-header mini">
        <h3>Featured highlights</h3>
        <p class="section-kicker">Recent pieces clients loved</p>
      </div>
      <div class="grid featured-grid">${featured.map(c => cardMarkup(c,'featured')).join('')}</div>
    `;
  };

  const renderFilters = () => {
    const typeFilters = ['all','video','photo','design'];
    filtersWrap.innerHTML = `
      <div class="filter-group centered">
        <div class="chip-row" id="filter-type">
          ${typeFilters.map((f,i) => `<button class="chip ${i===0?'active':''}" data-type="${f}">${f.charAt(0).toUpperCase()+f.slice(1)}</button>`).join('')}
        </div>
      </div>
    `;

    qa('#filter-type .chip').forEach(btn => btn.addEventListener('click', () => {
      qa('#filter-type .chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid();
    }));
  };

  const renderGrid = () => {
    const activeType = q('#filter-type .chip.active')?.dataset.type || 'all';

    let list = allCards.slice();
    if (activeType !== 'all') list = list.filter(c => c.type === activeType);

    const displayedList = list.slice(0, displayLimit);
    const hasMore = list.length > displayLimit;

    grid.innerHTML = displayedList.map(c => cardMarkup(c)).join('');

    const loadMoreBtn = q('#load-more-btn');
    if (hasMore) {
      if (loadMoreBtn) loadMoreBtn.style.display = 'flex';
    } else {
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    }

    qa('figure.tile[data-type="video"]').forEach(async fig => {
      const id = fig.getAttribute('data-yid');
      if(!id) return;
      const cap = q('[data-role="title"]', fig);
      const fetched = await fetchYouTubeTitle(id);
      if (fetched) cap.textContent = fetched;
    });
  };

  renderFeatured();
  renderFilters();
  renderGrid();

  const loadMoreBtn = q('#load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      displayLimit += 9;
      renderGrid();
    });
  }
  });
})();
