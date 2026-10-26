/*
  Payment error: the gateway returns here with ?ref=<reference>. The cart is still saved, so the summary
  shows the cart with its discount; with an empty cart it shows the sample order SZ-10482 under the ?ref= reference.
*/
(function () {
  'use strict';
  const S = window.Store, F = window.Flow;
  const box = document.getElementById('result-summary');

  function order() {
    const lines = S.cart.lines();
    const ref = F.params.get('ref');
    if (!lines.length) { const o = F.sampleOrder(); return ref ? { ...o, reference: ref } : o; }
    const t = S.cart.totals(lines);
    return { reference: ref || 'SZ-10482', kind: 'plans', lines: F.orderLines(lines), subtotal: t.subtotal, discount: t.discount, code: t.code, total: t.total };
  }
  const render = () => { box.innerHTML = F.resultRows(order(), 'Total due'); UI.fillPrices(box); };
  document.addEventListener('store:change', e => { if (['simzii.cart', 'simzii.currency'].includes(e.detail.key)) render(); });
  render();
})();
