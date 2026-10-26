/*
  Small shared behaviours: price fill, accordions, popups, the [data-pending] tooltip.
  Prices in markup carry data attributes and no figures:
    <span data-price="japan:10gb-30d"></span>     one plan
    <span data-from="japan"></span>               "From $0.60", the cheapest plan on the ladder
    <span data-usd="9.40"></span>                 a computed amount (totals), set by page scripts
    <span data-plan-count="japan"></span>        "12 plans"
    <span data-fact="europe:dataRange"></span>   a figure quoted in copy, see Store.fact
*/
(function () {
  'use strict';
  const S = window.Store;

  function fillPrices(root) {
    (root || document).querySelectorAll('[data-price]').forEach(el => {
      const [d, p] = el.dataset.price.split(':');
      const plan = S.plan(d, p);
      el.textContent = plan ? S.format(plan.price) : '';
    });
    (root || document).querySelectorAll('[data-from]').forEach(el => {
      const v = S.fromPrice(el.dataset.from);
      el.textContent = v == null ? '' : (el.hasAttribute('data-bare') ? '' : 'From ') + S.format(v);
    });
    (root || document).querySelectorAll('[data-plan-count]').forEach(el => {
      const d = S.destination(el.dataset.planCount), n = d ? S.planCount(d) : 0;
      el.textContent = n + (n === 1 ? ' plan' : ' plans');
    });
    (root || document).querySelectorAll('[data-usd]').forEach(el => {
      el.textContent = S.format(parseFloat(el.dataset.usd));
    });
    (root || document).querySelectorAll('[data-fact]').forEach(el => {
      const [d, key] = el.dataset.fact.split(':');
      const v = S.fact(d, key);
      el.textContent = el.hasAttribute('data-lower') ? v.toLowerCase() : v;
    });
  }

  let tipEl, tipTimer;
  function tip(target, text) {
    if (!tipEl) { tipEl = document.createElement('div'); tipEl.className = 'tip'; tipEl.setAttribute('role', 'status'); document.body.appendChild(tipEl); }
    tipEl.textContent = text;
    const r = target.getBoundingClientRect();
    tipEl.style.left = '0px'; tipEl.style.top = '0px';
    const w = tipEl.offsetWidth, h = tipEl.offsetHeight;
    let top = r.top - h - 8; if (top < 8) top = r.bottom + 8;
    const left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), innerWidth - w - 8);
    tipEl.style.left = left + 'px'; tipEl.style.top = top + 'px';
    tipEl.classList.add('tip--on');
    clearTimeout(tipTimer); tipTimer = setTimeout(() => tipEl.classList.remove('tip--on'), 1600);
  }
  addEventListener('scroll', () => tipEl && tipEl.classList.remove('tip--on'), { passive: true });

  function openPopup(id) {
    const p = document.getElementById(id);
    if (!p) return;
    p.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    const focus = p.querySelector('.btn, button'); if (focus) focus.focus({ preventScroll: true });
  }
  function closePopup(p) {
    p.hidden = true;
    document.documentElement.style.overflow = '';
  }

  document.addEventListener('click', e => {
    const todo = e.target.closest('[data-pending]');
    if (todo) { e.preventDefault(); tip(todo, todo.dataset.pending); return; }

    const q = e.target.closest('.faq-item__question');
    if (q) {
      const item = q.closest('.faq-item'), group = item.closest('[data-accordion]');
      const open = !item.classList.contains('faq-item--open');
      if (group && group.dataset.accordion === 'single') group.querySelectorAll('.faq-item--open').forEach(x => { x.classList.remove('faq-item--open'); x.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false'); });
      item.classList.toggle('faq-item--open', open);
      q.setAttribute('aria-expanded', open);
      return;
    }

    const opener = e.target.closest('[data-popup-open]');
    if (opener) { e.preventDefault(); openPopup(opener.dataset.popupOpen); return; }
    const closer = e.target.closest('[data-popup-close], .popup__overlay');
    if (closer) { const p = closer.closest('.popup'); if (p) closePopup(p); }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.popup:not([hidden])').forEach(closePopup);
  });

  document.addEventListener('store:change', e => { if (e.detail.key === 'simzii.currency') fillPrices(); });
  document.addEventListener('DOMContentLoaded', () => fillPrices());
  if (document.readyState !== 'loading') fillPrices();

  window.UI = { fillPrices, tip, openPopup, closePopup };
})();
