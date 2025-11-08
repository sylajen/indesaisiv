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
  }
  function closeVideo(){
    q('#video-iframe').src = '';
    q('#videobox').classList.remove('open');
    q('#videobox').setAttribute('aria-hidden','true');
  }
  function openLightbox(src){
    q('#lightbox-img').src = src;
    q('#lightbox').classList.add('open');
    q('#lightbox').setAttribute('aria-hidden','false');
  }
  function closeLightbox(){
    q('#lightbox').classList.remove('open');
    q('#lightbox').setAttribute('aria-hidden','true');
  }
  window.openVideo = openVideo;
  window.closeVideo = closeVideo;
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;

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

  const grid        = q('#work-grid');
  const subtabsWrap = q('#subtabs');

    // Build unique categories
  const videoCats = Array.from(new Set(videos.map(v => v.category))).sort();
  let photoCats = Array.from(new Set(photos.map(p => p.category).filter(Boolean))).sort();

    const setSubtabs = (scope='video', active='all') => {
      // Support an 'all' scope that merges video + photo categories so that if desired
      // we can keep showing categories while the user is on the All tab. For now the
      // All tab will retain whichever categories were last set (video by default).
      const merged = Array.from(new Set([...videoCats, ...photoCats])).sort();
      let cats;
      if (scope === 'photo') cats = photoCats;
      else if (scope === 'video') cats = videoCats;
      else if (scope === 'all') cats = merged;
      else cats = videoCats;
      if (!cats.length){ subtabsWrap.innerHTML = ''; subtabsWrap.style.display='none'; return; }
      subtabsWrap.innerHTML = [
        `<button class="subtab active" data-filter="${scope}" data-sfilter="all">All</button>`,
        ...cats.map(cat => `<button class="subtab" data-filter="${scope}" data-sfilter="${cat}">${cat}</button>`)
      ].join('');
      qa('#subtabs .subtab').forEach(b => b.addEventListener('click', () => {
        qa('#subtabs .subtab').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const scopeSel = b.dataset.filter;
        const subSel = b.dataset.sfilter;
        render(scopeSel, subSel);
      }));
      subtabsWrap.style.display = 'flex';
    };

    const render = (filter='all', sub='all') => {
      let vFilter = 'all', pFilter = 'all';
      if (filter==='video') vFilter = sub;
      if (filter==='photo') pFilter = sub;
      // When viewing "all" and a sub category is chosen (from merged tabs), apply it to videos + photos.
      if (filter==='all' && sub !== 'all'){ vFilter = sub; pFilter = sub; }
      const v = videos
        .filter(x => (vFilter==='all' ? true : x.category===vFilter))
        .map(x => ({
          type:'video',
          title:x.title,
          badge:`video · ${x.category}${x.tags?.length ? ` · ${x.tags.join(", ")}` : ""}`,
          img:yThumb(x.youtubeId),
          youtubeId:x.youtubeId,
          onClick:`openVideo('${x.youtubeId}')`
        }));
      const d = designs.map(x => ({
        type:'design', title:x.title, badge:'design', img:x.img, onClick:`openLightbox('${x.img}')`
      }));
      const p = photos
        .filter(x => (pFilter==='all' ? true : x.category===pFilter))
        .map(x => ({
          type:'photo', title:x.title, badge:`photo${x.category?` · ${x.category}`:''}`, img:x.img, onClick:`openLightbox('${x.img}')`
        }));

      let all = [...v, ...d, ...p];
      if (filter !== 'all') all = all.filter(t => t.type === filter);

      grid.innerHTML = all.map(t => `
        <figure class="tile" role="button" tabindex="0" data-type="${t.type}" ${t.youtubeId ? `data-yid="${t.youtubeId}"` : ''} onclick="${t.onClick}" onkeypress="if(event.key==='Enter'){${t.onClick}}">
          <img src="${t.img}" alt="${t.title}" loading="lazy" />
          <figcaption class="tile-title" data-role="title">${t.title}</figcaption>
          <span class="tile-badge">${t.badge}</span>
        </figure>
      `).join('');

      // After render, replace video titles with actual YouTube titles (with "|" trimmed)
      // Fallback to existing title if fetch fails or is blocked.
      qa('figure.tile[data-type="video"]').forEach(async fig => {
        const id = fig.getAttribute('data-yid');
        if(!id) return;
        const cap = q('[data-role="title"]', fig);
        const fetched = await fetchYouTubeTitle(id);
        if (fetched) cap.textContent = fetched;
      });
    };

  render();

    // Primary tabs (All / Video / Design / Photo)
    qa('.tab').forEach(btn => btn.addEventListener('click', () => {
      qa('.tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      if (filter === 'video'){ setSubtabs('video'); render('video','all'); }
      else if (filter === 'photo'){ setSubtabs('photo'); render('photo','all'); }
      // On "All", keep the subfilters visible and show a merged list of categories
      // that can filter across both videos and photos.
      else { setSubtabs('all'); subtabsWrap.style.display='flex'; render('all'); }
    }));
    // Initialize subtabs for Video on first load (default scope)
    setSubtabs('video');
  });
})();
