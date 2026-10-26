/* Payment complete: renders Store.lastOrder() (plans), or the sample order SZ-10482 when the browser holds none. */
(function () {
  'use strict';
  const S = window.Store, F = window.Flow;
  const last = S.lastOrder();
  const order = last && last.kind === 'plans' ? last : F.sampleOrder();
  const n = order.lines.length;
  const name = order.firstName || (S.session() || S.account().user).firstName;
  const what = n === 1 ? 'Your eSIM is in your account with the QR code to install it.' : `Your ${F.countWord(n)} eSIMs are in your account with the QR codes to install them.`;

  document.getElementById('result-body').textContent = `Thank you, ${name}. ${what} A copy of the receipt is on its way to ${order.email}.`;
  const box = document.getElementById('result-summary');
  const render = () => { box.innerHTML = F.resultRows(order, 'Total paid'); UI.fillPrices(box); };
  document.addEventListener('store:change', e => { if (e.detail.key === 'simzii.currency') render(); });
  render();
})();
