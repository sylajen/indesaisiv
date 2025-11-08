document.addEventListener('DOMContentLoaded', () => {
  const { about } = window.SITE;
  $('#about-text').innerHTML = about.paragraphs.map(p => `<p>${p.replace(/\n/g,'<br/>')}</p>`).join('');
  $('#about-cards').innerHTML = about.pillars.map(p => `<article class="card"><h3>${p.title}</h3><p>${p.text}</p></article>`).join('');
});
