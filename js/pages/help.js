/* Help centre: topic rail and chips scroll to their group and follow the scroll; the search filters questions (?q= pre fills it). */
(function () {
  'use strict';

  const groups = [...document.querySelectorAll('[data-topic]')];
  const links = [...document.querySelectorAll('[data-topic-link]')];
  const form = document.querySelector('[data-help-search]');
  const input = document.getElementById('help-q');
  const empty = document.querySelector('[data-help-empty]');

  function setActive(id) {
    links.forEach(a => {
      const on = a.dataset.topicLink === id;
      a.classList.toggle(a.classList.contains('chip') ? 'chip--selected' : 'help-rail__link--active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      if (on && a.classList.contains('chip')) a.parentNode.scrollTo({ left: a.offsetLeft - 24, behavior: 'smooth' });
    });
  }

  let lock = 0;
  links.forEach(a => a.addEventListener('click', e => {
    const target = document.getElementById(a.dataset.topicLink);
    if (!target || target.hidden) return;
    e.preventDefault();
    setActive(a.dataset.topicLink);
    lock = Date.now();
    target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + a.dataset.topicLink);
  }));

  function onScroll() {
    if (Date.now() - lock < 900) return;
    const line = innerHeight * 0.3;
    let current = groups.find(g => !g.hidden) || groups[0];
    groups.forEach(g => { if (!g.hidden && g.getBoundingClientRect().top <= line) current = g; });
    if (current) setActive(current.dataset.topic);
  }
  addEventListener('scroll', onScroll, { passive: true });

  function filter(query) {
    const q = query.trim().toLowerCase();
    let shown = 0;
    groups.forEach(g => {
      let n = 0;
      g.querySelectorAll('.faq-item').forEach(item => {
        const hit = !q || item.textContent.toLowerCase().includes(q);
        item.hidden = !hit;
        if (hit) n++;
      });
      g.hidden = n === 0;
      shown += n;
    });
    empty.hidden = shown > 0;
    links.forEach(a => {
      const g = document.getElementById(a.dataset.topicLink);
      a.hidden = !!(g && g.hidden);
    });
  }

  input.addEventListener('input', () => filter(input.value));
  form.addEventListener('submit', e => {
    e.preventDefault();
    filter(input.value);
    const first = groups.find(g => !g.hidden);
    (first || empty).scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const mq = matchMedia('(max-width: 760px)');
  const desktopPlaceholder = input.placeholder;
  const setPlaceholder = () => { input.placeholder = mq.matches ? input.dataset.placeholderMobile : desktopPlaceholder; };
  mq.addEventListener('change', setPlaceholder);
  setPlaceholder();

  const q = new URLSearchParams(location.search).get('q');
  if (q) { input.value = q; filter(q); }
  if (location.hash && document.getElementById(location.hash.slice(1))) setActive(location.hash.slice(1));
})();
