/*
  Helpers shared by the purchase flow pages (cart, checkout, payment results, top up).
  Order records follow the shape documented in js/payment.js.
*/
(function () {
  'use strict';
  const S = window.Store;

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  const countWord = n => WORDS[n] || String(n);
  const capital = s => s.charAt(0).toUpperCase() + s.slice(1);
  const TYPE = { country: 'Country plan', regional: 'Regional plan', global: 'Global plan' };
  const typeLabel = d => TYPE[d.type] || 'Plan';
  const params = new URLSearchParams(location.search);

  const dayWord = n => `${n} ${n === 1 ? 'day' : 'days'}`;
  /* "Country plan · 10GB · 30 days", or "Custom plan · 12GB · 21 days" for a line built in the custom plan builder */
  const planLabel = (d, plan) => `${plan.custom ? 'Custom plan' : typeLabel(d)} · ${plan.data} · ${dayWord(plan.days)}`;

  /* one summary format: "Japan, 10GB, 30 days", "Thailand, 12GB, 21 days, custom" for a custom plan, "Turkey top up, 3GB" for a top up */
  function lineLabel(line, kind) {
    const d = S.destination(line.destination);
    const name = d ? d.name : line.destination;
    if (kind === 'topup') return `${name} top up, ${line.plan.data}`;
    return `${name}, ${S.planName(line.plan)}${line.plan.custom ? ', custom' : ''}`;
  }

  const orderLines = cartLines => cartLines.map(l => ({
    destination: l.destination,
    plan: { id: l.plan.id, data: l.plan.data, days: l.plan.days, price: l.price, ...(l.plan.custom ? { custom: true } : {}) }
  }));

  /* sample paid order, used when the browser holds none */
  function sampleOrder() {
    const lines = [['japan', '10gb-30d'], ['europe', '5gb-30d']].map(([d, p]) => {
      const plan = S.plan(d, p);
      return { destination: d, plan: { id: plan.id, data: plan.data, days: plan.days, price: plan.price } };
    });
    const disc = S.catalogue.discount;
    const subtotal = round(lines.reduce((s, l) => s + l.plan.price, 0));
    const off = disc ? round(subtotal * disc.percent / 100) : 0;
    const u = S.account().user;
    return { reference: 'SZ-10482', kind: 'plans', lines, subtotal, discount: off, code: disc ? disc.code : null, total: round(subtotal - off), currency: S.currency(), email: u.email, firstName: u.firstName };
  }

  /* sample paid top up */
  function sampleTopUp() {
    const t = S.topUp('3gb');
    const u = S.account().user;
    return { reference: S.account().topUpCheckout.reference, kind: 'topup', esim: 'turkey', lines: [{ destination: 'turkey', plan: { id: t.id, data: t.data, days: null, price: t.price } }], subtotal: t.price, discount: 0, code: null, total: t.price, currency: S.currency(), email: u.email, firstName: u.firstName };
  }
  const round = n => Math.round(n * 100) / 100;

  const row = (key, usd, mod) => `<div class="summary-row"><span class="summary-row__key">${esc(key)}</span><span class="summary-row__value${mod ? ' summary-row__value--' + mod : ''}">${mod === 'discount' ? '−' : ''}<span data-usd="${usd}"></span></span></div>`;
  const textRow = (key, value) => `<div class="summary-row"><span class="summary-row__key">${esc(key)}</span><span class="summary-row__value">${esc(value)}</span></div>`;
  const totalRow = (key, usd, large) => `<div class="summary-row summary-row--total"><span class="summary-row__key">${esc(key)}</span><span class="summary-row__value${large ? ' summary-row__value--large' : ''}" data-usd="${usd}"></span></div>`;

  /* rows for the bordered order summary on the result pages */
  function resultRows(order, totalKey) {
    return [
      textRow('Order', order.reference),
      ...order.lines.map(l => row(lineLabel(l, order.kind), l.plan.price)),
      order.discount ? row(`Discount · ${order.code}`, order.discount, 'discount') : '',
      '<div class="summary-rule"></div>',
      totalRow(totalKey, order.total)
    ].join('');
  }

  window.Flow = { esc, countWord, capital, typeLabel, planLabel, lineLabel, orderLines, sampleOrder, sampleTopUp, row, textRow, totalRow, resultRows, params };
})();
