// /scripts/work.js — collision-free; wrapped in an IIFE and uses local helpers.
(function () {
  const q  = (s, c=document) => c.querySelector(s);
  const qa = (s, c=document) => [...c.querySelectorAll(s)];
  const yThumb = id => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

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

  document.addEventListener('DOMContentLoaded', () => {
    const site = window.SITE || {};
    const videos  = site.videos  || [];
    const designs = site.designs || [];
    const photos  = site.photos  || [];

    const grid        = q('#work-grid');
    const subtabsWrap = q('#video-subtabs');

    // Build unique video categories + "All"
    const categories = Array.from(new Set(videos.map(v => v.category))).sort();
    subtabsWrap.innerHTML = [
      `<button class="subtab active" data-vfilter="all">All</button>`,
      ...categories.map(cat => `<button class="subtab" data-vfilter="${cat}">${cat}</button>`)
    ].join('');

    const render = (filter='all', vFilter='all') => {
      const v = videos
        .filter(x => (vFilter==='all' ? true : x.category===vFilter))
        .map(x => ({
          type:'video',
          title:x.title,
          badge:`video · ${x.category}${x.tags?.length ? ` · ${x.tags.join(", ")}` : ""}`,
          img:yThumb(x.youtubeId),
          onClick:`openVideo('${x.youtubeId}')`
        }));
      const d = designs.map(x => ({
        type:'design', title:x.title, badge:'design', img:x.img, onClick:`openLightbox('${x.img}')`
      }));
      const p = photos.map(x => ({
        type:'photo', title:x.title, badge:'photo', img:x.img, onClick:`openLightbox('${x.img}')`
      }));

      let all = [...v, ...d, ...p];
      if (filter !== 'all') all = all.filter(t => t.type === filter);

      grid.innerHTML = all.map(t => `
        <figure class="tile" role="button" tabindex="0" onclick="${t.onClick}" onkeypress="if(event.key==='Enter'){${t.onClick}}">
          <img src="${t.img}" alt="${t.title}" loading="lazy" />
          <figcaption class="tile-title">${t.title}</figcaption>
          <span class="tile-badge">${t.badge}</span>
        </figure>
      `).join('');
    };

    render();

    // Primary tabs (All / Video / Design / Photo)
    qa('.tab').forEach(btn => btn.addEventListener('click', () => {
      qa('.tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const activeSub = q('.subtab.active')?.dataset.vfilter || 'all';
      render(filter, activeSub);
      q('#video-subtabs').style.display = (filter === 'video' || filter === 'all') ? 'flex' : 'none';
    }));

    // Subtabs (dynamic)
    qa('.subtab').forEach(btn => btn.addEventListener('click', () => {
      qa('.subtab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter  = q('.tab.active')?.dataset.filter || 'all';
      const vFilter = btn.dataset.vfilter;
      render(filter, vFilter);
    }));
  });
})();
