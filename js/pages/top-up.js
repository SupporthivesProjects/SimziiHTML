/*
  Checkout / top up: ?esim=<destination id of an active eSIM>&t=<top up id>.
  Signed in only, no cart, active eSIMs only. Total from Store.topUp(t). Discount codes do not apply to
  top ups: the field stays and the catalogue code gets its own message.
*/
(function () {
  'use strict';
  const S = window.Store, F = window.Flow;
  const $ = id => document.getElementById(id);
  const form = $('topup-form');

  if (!S.session()) { location.replace('login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search)); return; }
  const wanted = F.params.get('esim');
  const owned = S.account().esims.find(e => e.destination === wanted);
  if (!owned || owned.status !== 'active' || !S.destination(wanted)) {
    location.replace(owned ? `esim.html?id=${encodeURIComponent(wanted)}` : 'account.html');
    return;
  }
  const esim = wanted;
  const topUp = S.topUp(F.params.get('t')) || S.topUp(S.defaultTopUp());
  const dest = S.destination(esim);
  const user = S.session();

  $('account-name').textContent = `${user.firstName} ${user.lastName}`;
  $('account-email').textContent = user.email;
  $('account-esim').textContent = dest.name;
  $('step-data').href = `esim.html?id=${encodeURIComponent(esim)}`;

  const totals = () => ({ subtotal: topUp.price, discount: 0, code: null, total: topUp.price });
  const line = { destination: esim, plan: { id: topUp.id, data: topUp.data, days: null, price: topUp.price } };

  function render() {
    const t = totals();
    $('summary-lines').innerHTML = F.row(F.lineLabel(line, 'topup'), topUp.price);
    $('summary-totals').innerHTML = F.row('Subtotal', t.subtotal) + F.totalRow('Total', t.total, true);
    UI.fillPrices(form);
  }

  const discountBox = $('discount');
  const NOT_VALID = $('discount-error').textContent;
  $('discount-apply').addEventListener('click', () => {
    const v = $('discount-code').value.trim();
    const d = S.catalogue.discount;
    const known = v && d && v.toUpperCase() === d.code.toUpperCase();
    $('discount-error').textContent = known ? 'This code does not apply to top ups.' : NOT_VALID;
    discountBox.classList.add('discount--error');
    $('discount-error').hidden = false;
  });
  $('discount-code').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); $('discount-apply').click(); } });
  $('discount-code').addEventListener('input', () => { discountBox.classList.remove('discount--error'); $('discount-error').hidden = true; });

  function checkError(box, input, msg, cls) {
    const bad = !input.checked;
    box.classList.toggle(cls, bad);
    $(msg).hidden = !bad;
    return bad;
  }
  form.addEventListener('change', e => {
    if (e.target.id === 'terms' && e.target.checked) checkError($('terms-box'), e.target, 'terms-error', 'checkbox--error');
    if (e.target.id === 'recaptcha' && e.target.checked) checkError($('recaptcha-box'), e.target, 'recaptcha-error', 'recaptcha--error');
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const badTerms = checkError($('terms-box'), $('terms'), 'terms-error', 'checkbox--error');
    const badRobot = checkError($('recaptcha-box'), $('recaptcha'), 'recaptcha-error', 'recaptcha--error');
    if (badTerms || badRobot) { (badTerms ? $('terms') : $('recaptcha')).focus(); return; }
    const t = totals();
    form.querySelectorAll('.checkout__submit').forEach(b => { b.disabled = true; });
    window.startPayment({
      reference: S.newReference(),
      kind: 'topup',
      esim,
      lines: [line],
      subtotal: t.subtotal, discount: t.discount, code: t.code, total: t.total,
      currency: S.currency(),
      email: user.email,
      firstName: user.firstName
    });
  });

  document.addEventListener('store:change', e => { if (e.detail.key === 'simzii.currency') render(); });
  render();
})();
