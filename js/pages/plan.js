/*
  plan.html?d=<destination id>: one template for every destination.
  Countries use the country layout (photo beside the name, custom builder, upsell to the
  regions that cover it); regional and global destinations use the regional layout with the
  full area list. Runs before js/partials.js so data-nav is set before the header renders.
*/
(function () {
  'use strict';
  const S = window.Store;
  const all = (sel, root) => [...(root || document).querySelectorAll(sel)];
  const one = (sel, root) => (root || document).querySelector(sel);

  if (!S || typeof S.destination !== 'function') {
      console.error('Store is not loaded. Check catalogue.js and store.js script order.');
      return;
  }

  const id = new URLSearchParams(location.search).get('d');
  const d = S.destination(id);

  if (!d) {
      console.error('Destination not found. URL parameter d =', id);
      location.replace('404.html');
      return;
  }

  const isCountry = d.type === 'country';
  const live = S.isLive(d);
  document.body.dataset.nav = isCountry ? 'destinations' : 'regions';
  document.title = `${d.name} | Simzii`;

  /* bespoke photography for japan and europe, the rest use the catalogue image */
  const PHOTOS = {
    japan: { hero: 'assets/images/pages/japan-kyoto.jpg', large: 'assets/images/pages/japan-kyoto-night.jpg', small: 'assets/images/pages/japan-street.jpg' },
    europe: { hero: 'assets/images/pages/europe-landscape.jpg' }
  };
  const REGION_FALLBACK = 'assets/images/pages/europe-landscape.jpg';
  const photos = PHOTOS[d.id] || {};
  const flagSrc = x => `assets/flags/${x.flag || 'global'}.svg`;
  const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const days = n => `${n} ${n === 1 ? 'day' : 'days'}`;
  const count = S.planCount(d);

  /* hero */
  const hero = one(`[data-layout="${isCountry ? 'country' : 'regional'}"]`);
const unusedHero = one(`[data-layout="${isCountry ? 'regional' : 'country'}"]`);

if (!hero) {
    console.error('Required hero layout is missing:', isCountry ? 'country' : 'regional');
    return;
}

if (unusedHero) unusedHero.remove();
hero.hidden = false;

  one('[data-photo]', hero).src = photos.hero || d.image || d.cardImage || REGION_FALLBACK;
  all('[data-name]').forEach(el => { el.textContent = d.name; });
  all('[data-name-inline]').forEach(el => { el.textContent = d.name; });
  all('[data-name-upper]').forEach(el => { el.textContent = d.name.toUpperCase(); });
  all('[data-flag]').forEach(el => { el.src = flagSrc(d); });
  all('[data-count]').forEach(el => { el.textContent = `${count} ${count === 1 ? 'PLAN' : 'PLANS'}`; });
  all('[data-from-bare]').forEach(el => { el.dataset.from = d.id; el.setAttribute('data-bare', ''); });
  all('[data-areas]').forEach(el => { el.textContent = d.areaLabel || `${(d.areas || []).length} areas`; });
  all('[data-areas-upper]').forEach(el => { el.textContent = (d.areaLabel || `${(d.areas || []).length} areas`).toUpperCase(); });
  if (d.type === 'global') one('[data-region-eyebrow]').textContent = 'GLOBAL PLAN';
  if (!count) all('.plan-hero__tagline, .plan-hero__rail--right').forEach(el => el.remove());

  /* ladder and summary */
  const choose = one('#choose');
  choose.hidden = false;
  if (!isCountry) one('[data-choose-title]').textContent = `${WORDS[count] || count} plans for the whole ${d.type === 'global' ? 'world' : 'region'}`;

  const ladder = one('[data-ladder]');
  const summary = one('[data-summary]');
  let selected = S.defaultPlan(d);

  if (live) {
    ladder.innerHTML = d.plans.map(p => `
      <label class="plan-option">
        <input type="radio" name="plan" value="${esc(p.id)}"${selected && p.id === selected.id ? ' checked' : ''}>
        <span class="plan-option__top"><span class="plan-option__data">${esc(p.data)}</span><span class="plan-option__radio"></span></span>
        <span class="plan-option__validity">${days(p.days)}</span>
        <span class="plan-option__rule"></span>
        <span class="plan-option__price" data-price="${d.id}:${esc(p.id)}"></span>
      </label>`).join('');
    ladder.addEventListener('change', e => {
      if (e.target.name !== 'plan') return;
      selected = S.plan(d.id, e.target.value);
      fillSummary();
    });
  } else {
    ladder.remove();
    summary.remove();
    one('[data-gap]').hidden = false;
  }

  function fillSummary() {
    if (!selected || !summary.isConnected) return;
    one('[data-sum-data]').textContent = selected.data;
    one('[data-sum-days]').textContent = days(selected.days);
    one('[data-sum-coverage]').textContent = isCountry ? d.name : (d.areaLabel || `${(d.areas || []).length} areas`);
    one('[data-sum-price]').textContent = S.format(selected.price);
  }
  fillSummary();

  one('[data-add]') && one('[data-add]').addEventListener('click', () => {
    if (!selected) return;
    S.cart.add(d.id, selected.id);
    location.href = 'cart.html';
  });

  /* custom plan builder: countries only */
  const cp = S.customPlan();
  const custom = one('[data-custom]');
  if (isCountry && cp && custom) {
    custom.hidden = false;
    const gb = one('#custom-gb'), dy = one('#custom-days');
    gb.min = cp.gbMin; gb.max = cp.gbMax; gb.value = cp.example ? cp.example.gb : cp.gbMin;
    dy.min = cp.daysMin; dy.max = cp.daysMax; dy.value = cp.example ? cp.example.days : cp.daysMin;
    one('[data-gb-min]').textContent = cp.gbMin + 'GB';
    one('[data-gb-max]').textContent = cp.gbMax + 'GB';
    one('[data-days-min]').textContent = days(cp.daysMin);
    one('[data-days-max]').textContent = days(cp.daysMax);
    const paint = () => {
      [gb, dy].forEach(r => r.style.setProperty('--pct', ((r.value - r.min) / (r.max - r.min) * 100) + '%'));
      one('[data-gb-value]').textContent = gb.value + 'GB';
      one('[data-days-value]').textContent = days(+dy.value);
      one('[data-custom-price]').textContent = S.format(S.customPrice(+gb.value, +dy.value));
    };
    gb.addEventListener('input', paint);
    dy.addEventListener('input', paint);
    paint();
    one('[data-add-custom]').addEventListener('click', () => {
      S.cart.add(d.id, null, { gb: +gb.value, days: +dy.value });
      location.href = 'cart.html';
    });
    document.addEventListener('store:change', e => { if (e.detail.key === 'simzii.currency') paint(); });
  } else {
    custom.remove();
  }

  /* regional and global: every area, never truncated */
  if (!isCountry && (d.areas || []).length) {
    const sec = one('[data-areas-section]');
    sec.hidden = false;
    one('[data-areas-title]').textContent = `EVERY AREA ON THE ${d.name.toUpperCase()} PLAN`;
    const list = one('[data-areas-list]');
    list.style.setProperty('--rows4', Math.ceil(d.areas.length / 4));
    list.style.setProperty('--rows2', Math.ceil(d.areas.length / 2));
    list.innerHTML = d.areas.map(a => `<li>${esc(a)}</li>`).join('');
    if (d.areasNote) list.insertAdjacentHTML('afterend', `<p class="plan-areas__note">${esc(d.areasNote)}</p>`);
  } else {
    one('[data-areas-section]').remove();
  }

  /* country: upsell to the regions that cover it, then Global */
  if (isCountry) {
    const regions = S.regionsCovering(d.id).sort((a, b) => (a.type === 'global') - (b.type === 'global'));
    const further = one('[data-further]');
    if (regions.length) {
      further.hidden = false;
      const large = photos.large || d.image || d.cardImage;
      const small = photos.small || (d.cardImage && d.cardImage !== large ? d.cardImage : null);
      one('[data-further-large]').src = large;
      if (small) one('[data-further-small]').src = small;
      else { one('[data-further-small]').remove(); one('.plan-further__collage').classList.add('plan-further__collage--single'); }
      one('[data-upsell]').innerHTML = regions.map(r => {
        const n = S.planCount(r);
        return `<a class="country-card" href="plan.html?d=${encodeURIComponent(r.id)}">
          <div class="country-card__top"><img class="flag" src="${flagSrc(r)}" alt="" width="48" height="48" loading="lazy" decoding="async"><span class="country-card__type">${r.type.toUpperCase()}</span></div>
          <div class="country-card__copy"><p class="country-card__name">${esc(r.name)}</p><p class="country-card__plans">${n} ${n === 1 ? 'plan' : 'plans'}${r.areaLabel ? ', ' + esc(r.areaLabel) : ''}</p></div>
          <div class="country-card__rule"></div>
          <div class="country-card__bottom"><span class="country-card__price" data-from="${r.id}"></span><img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async"></div>
        </a>`;
      }).join('');
    } else {
      further.remove();
    }
  } else {
    one('[data-further]').remove();
  }

  document.addEventListener('store:change', e => { if (e.detail.key === 'simzii.currency') fillSummary(); });
  UI.fillPrices();
})();
