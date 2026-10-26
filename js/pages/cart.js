/* Cart: lines from Store.cart.lines(), totals from Store.cart.totals(). ?demo=1 loads two sample lines. */
(function () {
  'use strict';
  const S = window.Store, F = window.Flow;

  if (F.params.get('demo') === '1') {
    S.cart.clear();
    S.cart.add('japan', '10gb-30d');
    S.cart.add('europe', '5gb-30d');
    history.replaceState(null, '', location.pathname);
  }

  const $ = id => document.getElementById(id);
  const page = document.querySelector('.cart');

  function lineHtml(l) {
    const d = l.dest;
    return `<li class="cart-line">
      <img class="flag cart-line__flag" src="assets/flags/${F.esc(d.flag)}.svg" alt="" width="48" height="48" loading="lazy" decoding="async">
      <p class="cart-line__name">${F.esc(d.name)}</p>
      <p class="cart-line__type">${F.esc(F.planLabel(d, l.plan))}</p>
      <button class="cart-line__remove" type="button" data-remove="${F.esc(l.key)}" aria-label="Remove ${F.esc(d.name)} ${F.esc(l.plan.data)}">REMOVE</button>
      <p class="cart-line__price" data-usd="${l.price}"></p>
    </li>`;
  }

  function render() {
    const lines = S.cart.lines();
    const empty = !lines.length;
    page.classList.toggle('cart--empty', empty);
    $('cart-empty').hidden = !empty;
    $('cart-summary').hidden = empty;
    document.querySelector('.cart__lines').hidden = empty;
    document.querySelector('.cart__keep').hidden = empty;
    $('cart-title').textContent = empty ? 'Your cart is empty' : `${F.capital(F.countWord(lines.length))} ${lines.length === 1 ? 'plan' : 'plans'} ready to go`;
    if (empty) return;

    const t = S.cart.totals(lines);
    $('cart-list').innerHTML = lines.map(lineHtml).join('');
    $('cart-rows').innerHTML = lines.map(l => F.row(F.lineLabel(l), l.price)).join('');
    $('cart-totals').innerHTML = F.row('Subtotal', t.subtotal) + F.totalRow('Total at checkout', t.subtotal);
    UI.fillPrices(page);
  }

  page.addEventListener('click', e => {
    const btn = e.target.closest('[data-remove]');
    if (btn) S.cart.remove(btn.dataset.remove);
  });
  document.addEventListener('store:change', e => { if (['simzii.cart', 'simzii.currency'].includes(e.detail.key)) render(); });
  render();
})();
