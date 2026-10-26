/* Top up complete: renders Store.lastOrder() (top up), or the sample top up SZ-10503 when the browser holds none. */
(function () {
  'use strict';
  const S = window.Store, F = window.Flow;
  if (!S.session()) { location.replace('login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search)); return; }
  const last = S.lastOrder();
  const order = last && last.kind === 'topup' ? last : F.sampleTopUp();
  const line = order.lines[0];
  const dest = S.destination(order.esim);
  const name = order.firstName || S.session().firstName;

  document.getElementById('result-body').textContent = `Thank you, ${name}. ${line.plan.data} is on your ${dest ? dest.name : ''} eSIM and ready to use. Same eSIM, nothing new to install. Your receipt is on its way to ${order.email}.`;
  document.getElementById('esim-link').href = `esim.html?id=${encodeURIComponent(order.esim)}&topped=1`;
  const box = document.getElementById('result-summary');
  const render = () => { box.innerHTML = F.resultRows(order, 'Total paid'); UI.fillPrices(box); };
  document.addEventListener('store:change', e => { if (e.detail.key === 'simzii.currency') render(); });
  render();
})();
