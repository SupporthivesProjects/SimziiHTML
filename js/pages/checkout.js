/*
  Checkout: details form, discount code, terms and reCAPTCHA placeholder, then startPayment(order).
  An empty cart sends the visitor back to cart.html, a signed out visitor to login.html?next=checkout.html; ?demo=1 loads a sample order (two plans, SIMZII10).
*/
(function () {
  'use strict';
  const S = window.Store, F = window.Flow;
  const $ = id => document.getElementById(id);
  const form = $('checkout-form');

  if (F.params.get('demo') === '1') {
    S.cart.clear();
    S.cart.add('japan', '10gb-30d');
    S.cart.add('europe', '5gb-30d');
    S.cart.applyCode(S.catalogue.discount.code);
    history.replaceState(null, '', location.pathname);
  }
  if (!S.cart.count()) { location.replace('cart.html'); return; }
  // an account is required to buy (Terms 02): the cart stays in storage and login brings the buyer back here
  if (!S.session()) { location.replace('login.html?next=checkout.html'); return; }

  /* country of residence: ISO 3166 regions named by the browser */
  const REGIONS = 'AF AX AL DZ AS AD AO AI AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BA BW BR BN BG BF BI CV KH CM CA KY CF TD CL CN CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG MK NO OM PK PW PS PA PG PY PE PH PL PT PR QA RE RO RU RW KN LC VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA KR SS ES LK SD SR SE CH SY TW TJ TZ TH TL TG TO TT TN TR TM TC TV UG UA AE GB US UY UZ VU VA VE VN VG VI YE ZM ZW'.split(' ');
  let names;
  try { const dn = new Intl.DisplayNames(['en-GB'], { type: 'region' }); names = REGIONS.map(c => dn.of(c)); }
  catch (e) { names = ['United Kingdom', 'United States', 'France', 'Germany', 'Spain', 'Italy']; }
  names = [...new Set(names)].sort((a, b) => a.localeCompare(b, 'en-GB'));
  $('country').insertAdjacentHTML('beforeend', names.map(n => `<option>${F.esc(n)}</option>`).join(''));

  const u = S.session();
  if (u) {
    $('first-name').value = u.firstName || '';
    $('last-name').value = u.lastName || '';
    $('email').value = u.email || '';
    if (u.countryOfResidence && names.includes(u.countryOfResidence)) $('country').value = u.countryOfResidence;
  }

  const discountBox = $('discount');
  function setApplied(code) {
    discountBox.classList.add('discount--applied');
    discountBox.classList.remove('discount--error');
    $('discount-error').hidden = true;
    $('discount-code').value = code;
    $('discount-apply').innerHTML = '<img src="assets/icons/check.svg" alt="">APPLIED';
  }
  function render() {
    const lines = S.cart.lines();
    const t = S.cart.totals(lines);
    $('summary-lines').innerHTML = lines.map(l => F.row(F.lineLabel(l), l.price)).join('');
    $('summary-totals').innerHTML = F.row('Subtotal', t.subtotal) + (t.discount ? F.row(`Discount · ${t.code}`, t.discount, 'discount') : '') + F.totalRow('Total', t.total, true);
    if (t.code) setApplied(t.code);
    UI.fillPrices(form);
  }

  $('discount-apply').addEventListener('click', () => {
    const code = $('discount-code').value.trim();
    if (code && S.cart.applyCode(code)) { render(); return; }
    discountBox.classList.add('discount--error');
    $('discount-error').hidden = false;
  });
  $('discount-code').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); $('discount-apply').click(); } });
  $('discount-code').addEventListener('input', () => { discountBox.classList.remove('discount--error'); $('discount-error').hidden = true; });

  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function fieldError(input, bad) {
    const field = input.closest('.field');
    field.classList.toggle('field--error', bad);
    let msg = field.querySelector('.field__error');
    if (bad && !msg) { msg = document.createElement('p'); msg.className = 'field__error'; msg.id = input.id + '-error'; msg.textContent = input.dataset.error; field.appendChild(msg); input.setAttribute('aria-describedby', msg.id); }
    if (msg) msg.hidden = !bad;
    input.setAttribute('aria-invalid', bad);
    return bad;
  }
  function checkError(box, input, msg, cls) {
    const bad = !input.checked;
    box.classList.toggle(cls, bad);
    $(msg).hidden = !bad;
    return bad;
  }
  function validate() {
    const bad = [
      fieldError($('first-name'), !$('first-name').value.trim()) && $('first-name'),
      fieldError($('last-name'), !$('last-name').value.trim()) && $('last-name'),
      fieldError($('email'), !EMAIL.test($('email').value.trim())) && $('email'),
      fieldError($('country'), !$('country').value) && $('country'),
      checkError($('terms-box'), $('terms'), 'terms-error', 'checkbox--error') && $('terms'),
      checkError($('recaptcha-box'), $('recaptcha'), 'recaptcha-error', 'recaptcha--error') && $('recaptcha')
    ].filter(Boolean);
    if (bad.length) bad[0].focus();
    return !bad.length;
  }
  form.addEventListener('input', e => {
    const f = e.target.closest('.field');
    if (f && f.classList.contains('field--error') && e.target.dataset.error) fieldError(e.target, false);
  });
  form.addEventListener('change', e => {
    if (e.target.id === 'country') fieldError(e.target, false);
    if (e.target.id === 'terms' && e.target.checked) checkError($('terms-box'), e.target, 'terms-error', 'checkbox--error');
    if (e.target.id === 'recaptcha' && e.target.checked) checkError($('recaptcha-box'), e.target, 'recaptcha-error', 'recaptcha--error');
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;
    const lines = S.cart.lines();
    const t = S.cart.totals(lines);
    form.querySelectorAll('.checkout__submit').forEach(b => { b.disabled = true; });
    window.startPayment({
      reference: S.newReference(),
      kind: 'plans',
      lines: F.orderLines(lines),
      subtotal: t.subtotal, discount: t.discount, code: t.code, total: t.total,
      currency: S.currency(),
      email: $('email').value.trim(),
      firstName: $('first-name').value.trim(),
      lastName: $('last-name').value.trim(),
      country: $('country').value
    });
  });

  document.addEventListener('store:change', e => { if (e.detail.key === 'simzii.currency') render(); });
  render();
})();
