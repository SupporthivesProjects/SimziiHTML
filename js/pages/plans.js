/*
  plans.html: destination grid with type chips and pagination, plus the search states
  (suggestions under the bar, results, no results). ?q= pre fills and runs
  the search, ?type=country|regional|global pre selects a chip.
*/
(function () {
  'use strict';
  const S = window.Store;
  const $ = (sel, root) => (root || document).querySelector(sel);

  const form = $('.plans-search');
  const input = $('#plans-q');
  const suggest = $('#plans-suggest');
  const grid = $('[data-grid]');
  const pages = $('[data-pages]');
  const chips = [...document.querySelectorAll('.plans-filters .chip')];
  const mobile = matchMedia('(max-width: 760px)');
  const POPULAR = ['japan', 'europe', 'turkey', 'global'];
  const TYPES = ['all', 'country', 'regional', 'global'];

  const state = { type: 'all', page: 1, query: '', active: -1, items: [] };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const flagSrc = d => `assets/flags/${d.flag || 'global'}.svg`;
  function planLine(d) {
    const n = S.planCount(d);
    if (!n) return 'Plans coming soon';
    return `${n} ${n === 1 ? 'plan' : 'plans'}${d.areaLabel ? ', ' + d.areaLabel : ''}`;
  }

  function card(d, typeLabel) {
    return `<a class="country-card" href="plan.html?d=${encodeURIComponent(d.id)}">
      <div class="country-card__top"><img class="flag" src="${flagSrc(d)}" alt="" width="48" height="48" loading="lazy" decoding="async"><span class="country-card__type">${esc(typeLabel || d.type.toUpperCase())}</span></div>
      <div class="country-card__copy"><p class="country-card__name">${esc(d.name)}</p><p class="country-card__plans">${esc(planLine(d))}</p></div>
      <div class="country-card__rule"></div>
      <div class="country-card__bottom"><span class="country-card__price" data-from="${d.id}"></span><img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async"></div>
    </a>`;
  }

  /* place and nickname aliases: the catalogue has no aliases field, so they resolve here */
  const ALIASES = {
    tokyo: 'japan', osaka: 'japan', kyoto: 'japan', yokohama: 'japan', sapporo: 'japan', nagoya: 'japan', fukuoka: 'japan', hiroshima: 'japan', nara: 'japan',
    dubai: 'uae', 'abu dhabi': 'uae', uae: 'uae', emirates: 'uae',
    bali: 'indonesia', jakarta: 'indonesia', lombok: 'indonesia',
    uk: 'united-kingdom', britain: 'united-kingdom', 'great britain': 'united-kingdom', england: 'united-kingdom', london: 'united-kingdom', scotland: 'united-kingdom', edinburgh: 'united-kingdom', wales: 'united-kingdom',
    usa: 'united-states', us: 'united-states', america: 'united-states', 'new york': 'united-states', 'los angeles': 'united-states', 'san francisco': 'united-states', 'las vegas': 'united-states', miami: 'united-states',
    bangkok: 'thailand', phuket: 'thailand', 'chiang mai': 'thailand',
    istanbul: 'turkey', 'türkiye': 'turkey', turkiye: 'turkey', antalya: 'turkey',
    rome: 'italy', milan: 'italy', venice: 'italy', florence: 'italy', naples: 'italy',
    lisbon: 'portugal', porto: 'portugal', madeira: 'portugal',
    'mexico city': 'mexico', cancun: 'mexico',
    paris: 'france', nice: 'france', barcelona: 'spain', madrid: 'spain', athens: 'greece', santorini: 'greece',
    hanoi: 'vietnam', 'ho chi minh': 'vietnam', cairo: 'egypt', seoul: 'south-korea', korea: 'south-korea'
  };
  /* aliases for places that are a covered area, not a destination of their own */
  const AREA_ALIASES = { sydney: 'Australia', melbourne: 'Australia' };
  const aliasHit = (a, k) => a.length <= 2 ? a === k : (k.length >= 2 && a.startsWith(k)) || a === k;
  /* Store.search plus the destinations an alias names: whole word aliases match from their start, two letter ones only exactly */
  function find(q) {
    const r = S.search(q);
    const k = q.trim().toLowerCase();
    const extra = Object.keys(ALIASES)
      .filter(a => aliasHit(a, k))
      .map(a => S.destination(ALIASES[a]))
      .filter(d => d && !r.matches.includes(d));
    const matches = [...r.matches, ...new Set(extra)];
    return { matches, country: matches.find(d => d.type === 'country') || null };
  }

  /* areas listed on regional and global plans (areas and areasMinor) that are not destinations themselves,
     matched like Store.search; each carries the plans that list it, regional before global */
  const destNames = new Set(S.destinations().map(d => d.name.toLowerCase()));
  function findAreas(q) {
    const k = q.trim().toLowerCase();
    if (!k) return [];
    const wanted = new Set(Object.keys(AREA_ALIASES).filter(a => aliasHit(a, k)).map(a => AREA_ALIASES[a].toLowerCase()));
    const byName = new Map();
    S.destinations().filter(d => d.type !== 'country')
      .sort((a, b) => (a.type === 'global') - (b.type === 'global'))
      .forEach(reg => [...(reg.areas || []), ...(reg.areasMinor || [])].forEach(name => {
        const key = name.toLowerCase();
        if (destNames.has(key) || !(key.includes(k) || wanted.has(key))) return;
        if (!byName.has(key)) byName.set(key, { name, regions: [] });
        const a = byName.get(key);
        if (!a.regions.includes(reg)) a.regions.push(reg);
      }));
    return [...byName.values()];
  }
  const cheapestOf = list => list.reduce((a, b) => ((S.fromPrice(b.id) ?? Infinity) < (S.fromPrice(a.id) ?? Infinity) ? b : a));
  const andList = names => names.length > 1 ? names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1] : names[0];

  /* search model: the matches plus the regions that cover a matched country or a matched area */
  function results(q) {
    const r = find(q);
    const areas = findAreas(q);
    const out = r.matches.map(d => ({ d, label: d.type.toUpperCase(), match: true }));
    r.matches.filter(d => d.type === 'country').forEach(c => {
      S.regionsCovering(c.id)
        .sort((a, b) => (a.type === 'global') - (b.type === 'global'))
        .forEach(reg => {
          if (!out.some(o => o.d === reg)) out.push({ d: reg, label: `${reg.type.toUpperCase()} · COVERS ${c.name.toUpperCase()}`, cover: c });
        });
    });
    areas.forEach(a => a.regions.forEach(reg => {
      if (!out.some(o => o.d === reg)) out.push({ d: reg, label: `${reg.type.toUpperCase()} · COVERS ${a.name.toUpperCase()}`, area: a });
    }));
    return { list: out, country: r.country, matches: r.matches, areas };
  }

  function highlight(name, q) {
    const i = name.toLowerCase().indexOf(q.toLowerCase());
    if (!q || i < 0) return esc(name);
    return esc(name.slice(0, i)) + '<mark>' + esc(name.slice(i, i + q.length)) + '</mark>' + esc(name.slice(i + q.length));
  }

  /* suggestions */
  function renderSuggest() {
    const q = input.value.trim();
    if (!q) return closeSuggest();
    const { list, areas } = results(q);
    const areaRows = areas.map(a => ({ d: cheapestOf(a.regions), area: a, label: `COVERED BY ${andList(a.regions.map(r => r.name)).toUpperCase()}`, match: true }));
    state.items = [...[...list.filter(o => o.match), ...areaRows].slice(0, 5), ...list.filter(o => !o.match).slice(0, 3)];
    state.active = state.items.length ? 0 : -1;
    const rows = state.items.map((o, i) => {
      const n = o.area ? 0 : S.planCount(o.d);
      const count = n ? `<span class="suggest-item__count"> · ${n} ${n === 1 ? 'plan' : 'plans'}</span>` : '';
      return `<button class="suggest-item${i === state.active ? ' suggest-item--active' : ''}" type="button" role="option" id="sg-${i}" data-index="${i}" aria-selected="${i === state.active}">
        <img class="flag" src="${o.area ? flagSrc({}) : flagSrc(o.d)}" alt="" width="32" height="32">
        <span class="suggest-item__copy"><span class="suggest-item__name">${o.match ? highlight(o.area ? o.area.name : o.d.name, q) : esc(o.d.name)}</span><span class="suggest-item__meta">${esc(o.label)}${count}</span></span>
        <span class="suggest-item__price" data-from="${o.d.id}"></span>
        <img class="suggest-item__arrow" src="assets/icons/arrow-right.svg" alt="">
      </button>`;
    }).join('');
    suggest.innerHTML = rows + `<button class="plans-suggest__all label" type="button" data-all>SEE ALL RESULTS FOR “${esc(q.toUpperCase())}”</button>`;
    UI.fillPrices(suggest);
    suggest.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    input.setAttribute('aria-activedescendant', state.active >= 0 ? 'sg-' + state.active : '');
  }
  function closeSuggest() {
    suggest.hidden = true; suggest.innerHTML = '';
    state.items = []; state.active = -1;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  }
  function setActive(i) {
    const rows = suggest.querySelectorAll('.suggest-item');
    if (!rows.length) return;
    state.active = (i + rows.length) % rows.length;
    rows.forEach((r, k) => { r.classList.toggle('suggest-item--active', k === state.active); r.setAttribute('aria-selected', k === state.active); });
    input.setAttribute('aria-activedescendant', 'sg-' + state.active);
  }

  /* views */
  function setHead(eyebrow, title) {
    $('[data-head-eyebrow]').textContent = eyebrow;
    $('[data-head-title]').textContent = title;
  }
  function show(sel, on) { $(sel).hidden = !on; }

  function pageSize() { return mobile.matches ? 6 : 12; }

  function drawPagination(count) {
    const total = Math.ceil(count / pageSize());
    if (total <= 1) { pages.innerHTML = ''; return; }
    const cur = state.page;
    let list;
    if (total <= 5) list = Array.from({ length: total }, (_, i) => i + 1);
    else if (cur <= 3) list = [1, 2, 3, '…', total];
    else if (cur >= total - 2) list = [1, '…', total - 2, total - 1, total];
    else list = [1, '…', cur, '…', total];
    pages.innerHTML = list.map(p => p === '…'
      ? '<span class="pagination__gap" aria-hidden="true">…</span>'
      : `<button class="pagination__page" type="button" data-page="${p}"${p === cur ? ' aria-current="page"' : ''} aria-label="Page ${p}">${p}</button>`).join('');
  }

  function render() {
    const q = state.query;
    const filter = o => state.type === 'all' || o.d.type === state.type;
    show('[data-head]', true);
    show('[data-empty]', false);
    show('[data-popular]', false);
    show('[data-note]', false);
    show('[data-none]', false);

    if (!q) {
      setHead('ALL DESTINATIONS', 'Find your plan');
      const list = S.destinations(state.type);
      const size = pageSize();
      const max = Math.max(1, Math.ceil(list.length / size));
      if (state.page > max) state.page = max;
      grid.innerHTML = list.slice((state.page - 1) * size, state.page * size).map(d => card(d)).join('');
      drawPagination(list.length);
      show('[data-none]', !list.length);
    } else {
      const r = results(q);
      pages.innerHTML = '';
      if (!r.list.length) {
        show('[data-head]', false);
        show('[data-empty]', true);
        show('[data-popular]', true);
        $('[data-empty-query]').textContent = q;
        $('[data-popular-grid]').innerHTML = POPULAR.map(S.destination).filter(Boolean).map(d => card(d)).join('');
        grid.innerHTML = '';
      } else {
        const named = [...r.matches.map(d => d.name), ...r.areas.map(a => a.name)];
        setHead('SEARCH RESULTS', `Results for “${named.length === 1 ? named[0] : q}”`);
        const shown = r.list.filter(filter);
        grid.innerHTML = shown.map(o => card(o.d, o.label)).join('');
        show('[data-none]', !shown.length);
        /* the note names every matched country whose covering plan is still on screen */
        const covered = r.matches.filter(c => c.type === 'country' && shown.some(o => !o.match && S.regionsCovering(c.id).includes(o.d)));
        if (covered.length) {
          const names = covered.map(c => c.name);
          $('[data-note-name]').textContent = names.length > 1 ? names.slice(0, -1).join(', ') + ' or ' + names[names.length - 1] : names[0];
          $('[data-note-it]').textContent = names.length > 1 ? 'them' : 'it';
          show('[data-note]', true);
        }
      }
    }
    grid.classList.toggle('plans-grid--results', !!q);
    chips.forEach(c => c.setAttribute('aria-pressed', c.dataset.type === state.type));
    UI.fillPrices($('.plans-list'));
    fitTypes();
  }

  /* a type label that cannot fit on one line even under the flag may wrap */
  function fitTypes() {
    document.querySelectorAll('.plans-list .country-card__type').forEach(t => {
      t.classList.remove('country-card__type--wrap');
      if (t.scrollWidth > t.parentNode.clientWidth) t.classList.add('country-card__type--wrap');
    });
  }

  function syncUrl() {
    const u = new URL(location.href);
    state.query ? u.searchParams.set('q', state.query) : u.searchParams.delete('q');
    state.type !== 'all' ? u.searchParams.set('type', state.type) : u.searchParams.delete('type');
    history.replaceState(null, '', u.pathname + u.search + u.hash);
  }

  function runSearch(q) {
    state.query = String(q || '').trim();
    state.page = 1;
    input.value = state.query;
    closeSuggest();
    syncUrl();
    render();
    if (state.query) $('#all').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function openDest(d) { location.href = `plan.html?d=${encodeURIComponent(d.id)}`; }
  /* an area row has no page of its own, so it runs the search for that area */
  function pick(o) { o.area ? runSearch(o.area.name) : openDest(o.d); }

  function clearSearch() {
    state.query = ''; state.page = 1; input.value = '';
    closeSuggest(); syncUrl(); render();
  }

  /* events */
  input.addEventListener('input', renderSuggest);
  input.addEventListener('focus', () => { if (input.value.trim()) renderSuggest(); });
  input.addEventListener('keydown', e => {
    if (suggest.hidden) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(state.active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(state.active - 1); }
    else if (e.key === 'Escape') { closeSuggest(); }
    else if (e.key === 'Enter' && state.active >= 0 && state.items[state.active]) { e.preventDefault(); pick(state.items[state.active]); }
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    runSearch(input.value);
  });
  suggest.addEventListener('mousedown', e => e.preventDefault());
  suggest.addEventListener('click', e => {
    const row = e.target.closest('.suggest-item');
    if (row) { pick(state.items[+row.dataset.index]); return; }
    if (e.target.closest('[data-all]')) runSearch(input.value);
  });
  document.addEventListener('click', e => { if (!form.contains(e.target)) closeSuggest(); });

  chips.forEach(c => c.addEventListener('click', () => {
    state.type = c.dataset.type; state.page = 1; syncUrl(); render();
  }));
  pages.addEventListener('click', e => {
    const b = e.target.closest('[data-page]');
    if (!b) return;
    state.page = +b.dataset.page; render();
    $('#all').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  $('[data-clear]').addEventListener('click', clearSearch);
  $('[data-see-regional]').addEventListener('click', e => {
    e.preventDefault();
    state.type = 'regional'; state.query = ''; state.page = 1; input.value = '';
    syncUrl(); render();
    $('#all').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  function placeholder() {
    if (!input.dataset.placeholderDesktop) input.dataset.placeholderDesktop = input.placeholder;
    input.placeholder = mobile.matches ? input.dataset.placeholderMobile : input.dataset.placeholderDesktop;
  }
  mobile.addEventListener('change', () => { placeholder(); state.page = 1; render(); });
  addEventListener('resize', fitTypes);
  if (document.fonts) document.fonts.ready.then(fitTypes);
  document.addEventListener('store:change', e => { if (e.detail.key === 'simzii.currency') render(); });

  /* first paint from the URL */
  const params = new URLSearchParams(location.search);
  const t = (params.get('type') || '').toLowerCase();
  if (TYPES.includes(t)) state.type = t;
  /* runs before js/partials.js, so the header marks REGIONS current on ?type=regional */
  if (state.type === 'regional') document.body.dataset.nav = 'regions';
  state.query = (params.get('q') || '').trim();
  input.value = state.query;
  placeholder();
  render();
})();
