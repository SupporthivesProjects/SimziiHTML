/*
  Account pages: account.html (my eSIMs), esim.html?id=<destination> (eSIM detail) and orders.html.
  Everything renders from catalogue.account through Store. body[data-account] marks the active nav item.
*/
(function () {
  'use strict';

  const S = window.Store;
  // the account is private: a signed out visitor goes to login before any of the fixture renders
  if (!S.session()) { location.replace('login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search)); return; }
  const A = S.account();
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.account;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const shortDate = d => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  const isoDate = iso => { const [y, m, d] = iso.split('-').map(Number); return shortDate(new Date(y, m - 1, d)); };
  const gb = s => parseFloat(s) || 0;
  const fmtGb = n => (Math.round(n * 10) / 10) + 'GB';
  const flag = (d, size) => d.flag ? `<img class="flag${size ? ' ' + size : ''}" src="assets/flags/${d.flag}.svg" alt="" width="48" height="48" loading="lazy" decoding="async">` : '';
  const topUpHref = (esimId, t) => `top-up.html?esim=${encodeURIComponent(esimId)}&t=${encodeURIComponent(t)}`;

  function user() {
    const u = S.session();
    return { ...A.user, ...u, name: u.name || `${u.firstName} ${u.lastName}`, initials: ((u.firstName || 'J')[0] + (u.lastName || 'S')[0]).toUpperCase() };
  }

  /* sidebar on desktop, user strip and tabs on mobile */
  function renderNav() {
    const host = document.querySelector('[data-account-nav]');
    if (!host) return;
    const u = user();
    const cur = id => (id === page ? ' aria-current="page"' : '');
    host.outerHTML = `
<aside class="account-nav" aria-label="Account">
  <div class="account-nav__user">
    <p class="account-nav__eyebrow">SIGNED IN AS</p>
    <p class="account-nav__name">${esc(u.name)}</p>
    <p class="account-nav__email">${esc(u.email)}</p>
  </div>
  <div class="account-nav__rule"></div>
  <nav class="account-nav__links">
    <a class="account-nav__link" href="account.html"${cur('esims')}>MY ESIMS</a>
    <a class="account-nav__link" href="orders.html"${cur('orders')}>ORDER HISTORY</a>
  </nav>
  <div class="account-nav__rule"></div>
  <button class="account-nav__logout" type="button" data-sign-out>LOG OUT</button>
</aside>
<div class="account-strip">
  <span class="account-strip__avatar">${esc(u.initials)}</span>
  <div class="account-strip__copy">
    <p class="account-strip__name">${esc(u.name)}</p>
    <p class="account-strip__email">${esc(u.email)}</p>
  </div>
</div>`;
    const content = document.querySelector('.account-layout__content');
    content.insertAdjacentHTML('afterbegin', `
<nav class="account-tabs" aria-label="Account">
  <a class="account-tabs__tab" href="account.html"${cur('esims')}>MY eSIMS</a>
  <a class="account-tabs__tab" href="orders.html"${cur('orders')}>ORDER HISTORY</a>
</nav>`);
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('[data-sign-out]')) return;
    S.signOut();
    location.href = 'index.html';
  });

  /* account.html */
  const STATUS = {
    active: { label: 'ACTIVE', mod: 'active' },
    'ready to install': { label: 'READY TO INSTALL', mod: 'ready' },
    expired: { label: 'EXPIRED', mod: 'expired' }
  };

  function cardUsage(e, d, topped) {
    if (e.status === 'active') return `${topped ? topped.dataLeft : e.dataLeft} of ${topped ? topped.dataTotal : e.dataTotal || e.data} left · ${e.daysLeft} days left`;
    if (e.status === 'expired') return `Ended ${e.ended}`;
    return `Days start when it first connects in ${d.type === 'country' ? d.name : 'any of the ' + (d.areaLabel || 'covered areas')}`;
  }

  function cardActions(e, d) {
    const details = `<a class="esim-card__details" href="esim.html?id=${d.id}">DETAILS</a>`;
    if (e.status === 'active') return `<a class="btn btn--light esim-card__btn" href="${topUpHref(d.id, S.defaultTopUp())}">TOP UP</a>${details}`;
    if (e.status === 'expired') return `<a class="btn btn--light esim-card__btn" href="plan.html?d=${d.id}">BUY AGAIN</a>`;
    return `<a class="btn btn--light esim-card__btn" href="esim.html?id=${d.id}#install">INSTALL</a>${details}`;
  }

  function renderList() {
    const list = document.querySelector('[data-esim-list]');
    const empty = document.querySelector('[data-esim-empty]');
    const esims = params.get('empty') === '1' ? [] : A.esims;
    if (!esims.length) {
      empty.hidden = false;
      list.hidden = true;
      document.querySelectorAll('[data-esims-only]').forEach(el => (el.hidden = true));
      return;
    }
    list.innerHTML = esims.map(e => {
      const d = S.destination(e.destination);
      if (!d) return '';
      const st = STATUS[e.status] || STATUS['ready to install'];
      const topped = e.status === 'active' ? topUpState(e) : null;
      const left = topped ? topped.dataLeft : e.dataLeft, total = topped ? topped.dataTotal : e.dataTotal;
      const used = e.status === 'active' ? Math.round(100 - (gb(left) / (gb(total) || 1)) * 100) : e.status === 'expired' ? 100 : 0;
      return `
<article class="esim-card esim-card--${st.mod}">
  <div class="esim-card__identity">
    ${flag(d, 'esim-card__flag')}
    <div class="esim-card__copy">
      <h2 class="esim-card__name">${esc(d.name)}</h2>
      <p class="esim-card__plan">${esc(e.plan)}</p>
    </div>
  </div>
  <div class="esim-card__usage">
    <p class="esim-status esim-status--${st.mod}">${st.label}</p>
    <div class="esim-card__bar"><span style="width:${used}%"></span></div>
    <p class="esim-card__note">${esc(cardUsage(e, d, topped))}</p>
  </div>
  <div class="esim-card__actions">${cardActions(e, d)}</div>
</article>`;
    }).join('');
  }

  /* esim.html */
  /*
    The fixture is one moment (catalogue.account.asOf). Top ups paid in this browser for the eSIM are added on top of it,
    newest first; ?topped=1 shows the default top up dated asOf when none was paid. Days left do not change with a top up.
  */
  function topUpState(e) {
    const paid = S.orders().filter(o => o.kind === 'topup' && o.esim === e.destination && o.lines && o.lines[0] && o.lines[0].plan);
    let added = paid.map(o => {
      const p = o.lines[0].plan;
      const option = S.topUp(p.id) || S.topUps().find(t => t.data === p.data) || { data: p.data, price: p.price };
      return { date: o.date ? isoDate(o.date) : '', data: option.data, price: option.price, today: o.date === new Date().toISOString().slice(0, 10) };
    });
    if (!added.length && params.get('topped') === '1') {
      const option = S.topUp(S.defaultTopUp());
      added = [{ date: isoDate(A.asOf), data: option.data, price: option.price, today: true }];
    }
    if (!added.length) return null;
    const extra = added.reduce((n, t) => n + gb(t.data), 0);
    return {
      dataLeft: fmtGb(gb(e.dataLeft) + extra),
      dataTotal: fmtGb(gb(e.dataTotal) + extra),
      banner: added[0].today ? `${added[0].data} ADDED TODAY` : '',
      history: [...added, ...(e.topUps || [])]
    };
  }

  function priceOfTopUp(data, fallback) {
    const t = S.topUps().find(x => x.data === data);
    return t ? t.price : fallback;
  }

  function renderDetail() {
    const host = document.querySelector('[data-esim-detail]');
    const id = params.get('id') || 'turkey';
    const e = A.esims.find(x => x.destination === id);
    const d = e && S.destination(e.destination);
    if (!e || !d) {
      host.innerHTML = `
<div class="account-empty">
  <img class="account-empty__icon" src="assets/icons/globe-frame.svg" alt="" width="80" height="80">
  <h1 class="account-empty__title">No eSIMs yet</h1>
  <a class="btn btn--light account-empty__cta" href="account.html">MY ESIMS</a>
</div>`;
      return;
    }
    document.title = `${d.name} eSIM | Simzii`;

    const x = e;
    const active = e.status === 'active';
    const expired = e.status === 'expired';
    const topped = active ? topUpState(e) : null;
    const left = topped ? topped.dataLeft : x.dataLeft;
    const total = topped ? topped.dataTotal : (x.dataTotal || x.data);
    const fill = expired ? 100 : Math.max(0, Math.min(100, (gb(left) / (gb(total) || 1)) * 100));
    const coverage = x.coverage || (d.type === 'country' ? d.name : d.areaLabel || d.name);
    const statusLabel = active ? 'Active' : expired ? 'Expired' : 'Ready to install';
    const days = active ? `${x.daysLeft} left` : expired ? `Ended ${x.ended}` : x.daysLeft || `${x.days}, from first connection`;
    const history = topped ? topped.history : (e.topUps || []);

    const head = `
<div class="esim-head">
  <p class="esim-head__crumb"><a href="account.html">MY eSIMS</a>&nbsp;&nbsp;/&nbsp;&nbsp;${esc(d.name.toUpperCase())}</p>
  <div class="esim-head__title">${flag(d, 'esim-head__flag')}<h1 class="esim-head__name">${esc(d.name)}</h1></div>
  <p class="esim-head__plan">${esc(e.plan)} · Order ${esc(e.order)}</p>
</div>`;

    const steps = ['Connect to wifi before you travel.', 'Open your camera and scan the code.', `Follow the prompts and name the plan Simzii ${d.name}.`, 'Turn on data roaming for Simzii when you land.'];
    const install = expired ? '' : `
<section class="esim-install" id="install" aria-labelledby="install-title">
  <h2 class="eyebrow eyebrow--deep esim-install__eyebrow" id="install-title">${active ? 'INSTALLATION DETAILS' : 'INSTALL YOUR eSIM'}</h2>
  <div class="esim-install__qr-row">
    <img class="esim-install__qr" src="assets/images/pages/esim-qr.svg" alt="QR code to install the ${esc(d.name)} eSIM" width="234" height="234" loading="lazy" decoding="async">
    <ol class="esim-install__steps">
      ${steps.map((s, i) => `<li class="esim-install__step"><span class="esim-install__numeral">0${i + 1}</span><span>${esc(s)}</span></li>`).join('')}
    </ol>
  </div>
  <div class="esim-phone${active ? ' esim-phone--compact' : ''}">
    <div class="esim-phone__copy">
      <p class="esim-phone__eyebrow"><span class="esim-phone__desktop">ON YOUR PHONE?</span><span class="esim-phone__mobile">ON THIS PHONE?</span></p>
      ${active ? '' : '<p class="esim-phone__title">You can’t scan your own screen.</p>'}
      <p class="esim-phone__body"><span class="esim-phone__desktop">Open this page on your phone and tap Install now. Your phone installs the eSIM itself, no QR code needed.</span><span class="esim-phone__mobile">Tap the button and your phone installs the eSIM itself. No QR code needed.</span></p>
    </div>
    <a class="btn esim-phone__btn" href="#install" data-pending="The install link comes from the eSIM provider">INSTALL NOW</a>
  </div>
  <div class="esim-manual">
    <h3 class="esim-manual__label">MANUAL SETUP</h3>
    <dl>
      <div class="esim-manual__row"><dt>SM-DP+ address</dt><dd>${esc(x.smdp)}</dd></div>
      <div class="esim-manual__row"><dt>Activation code</dt><dd>${esc(x.activationCode)}</dd></div>
      <div class="esim-manual__row"><dt>ICCID</dt><dd>${esc(x.iccid)}</dd></div>
    </dl>
  </div>
</section>`;

    const usage = `
<section class="esim-usage${active ? ' esim-usage--joined' : ''}" aria-labelledby="usage-title">
  <h2 class="eyebrow esim-usage__eyebrow" id="usage-title">DATA LEFT</h2>
  <p class="esim-usage__figure"><span class="esim-usage__value">${esc(left)}</span><span class="esim-usage__of">of ${esc(total)}</span></p>
  <div class="esim-usage__bar${expired ? ' esim-usage__bar--expired' : ''}"><span style="width:${fill}%"></span></div>
  <dl class="esim-usage__rows">
    <div class="esim-usage__row"><dt>Status</dt><dd>${statusLabel}</dd></div>
    <div class="esim-usage__row"><dt>Days</dt><dd>${esc(days)}</dd></div>
    <div class="esim-usage__row"><dt>Coverage</dt><dd>${esc(coverage)}</dd></div>
  </dl>
  ${expired ? `<a class="btn btn--gold btn--block esim-usage__again" href="plan.html?d=${d.id}">BUY AGAIN</a>` : ''}
</section>`;

    const def = S.topUp(S.defaultTopUp());
    const topup = !active ? '' : `
<section class="esim-topup" aria-label="Top up">
  ${history.length ? `
  <h2 class="eyebrow esim-topup__eyebrow esim-topup__eyebrow--history">TOP UP HISTORY</h2>
  <div class="esim-topup__history">
    ${topped && topped.banner ? `<p class="esim-topup__added esim-status esim-status--active">${esc(topped.banner)}</p>` : ''}
    ${history.map(h => `<div class="esim-topup__row"><span>${esc(h.date)} · ${esc(h.data)}</span><span data-usd="${priceOfTopUp(h.data, h.price)}">${S.format(priceOfTopUp(h.data, h.price))}</span></div>`).join('')}
  </div>` : ''}
  <h2 class="eyebrow esim-topup__eyebrow esim-topup__eyebrow--options">TOP UP</h2>
  <div class="esim-topup__options">
    ${S.topUps().map(t => `<a class="esim-topup__option${t.id === def.id ? ' esim-topup__option--selected' : ''}" href="${topUpHref(d.id, t.id)}"><span class="esim-topup__data">${esc(t.data)}</span><span class="esim-topup__price" data-usd="${t.price}">${S.format(t.price)}</span></a>`).join('')}
  </div>
  <a class="btn btn--gold btn--block esim-topup__cta" href="${topUpHref(d.id, def.id)}">TOP UP ${esc(def.data)}</a>
</section>`;

    host.innerHTML = `${head}
<div class="esim-columns${active ? ' esim-columns--topup' : ''}${expired ? ' esim-columns--expired' : ''}">${install}${usage}${topup}</div>`;
  }

  /* orders.html */
  function renderOrders() {
    const host = document.querySelector('[data-order-rows]');
    const todo = 'Invoice PDF comes from the order system';
    // orders paid in this browser first (Store.orders), custom plans marked as in the cart: "Thailand 12GB, 21 days, custom"
    const describe = o => o.kind === 'plans' && o.lines && o.lines.every(l => l.plan && l.plan.data)
      ? o.lines.map(l => `${(S.destination(l.destination) || {}).name || l.destination} ${l.plan.data}, ${l.plan.days} ${l.plan.days === 1 ? 'day' : 'days'}${l.plan.custom ? ', custom' : ''}`)
      : o.description.split(' + ');
    host.innerHTML = S.orders().map(o => {
      const date = o.date ? isoDate(o.date) : '';
      const items = describe(o).map(esc).join('<br>');
      return `
<div class="orders__row" role="row">
  <span class="orders__ref" role="cell">${esc(o.reference)}</span>
  <span class="orders__date" role="cell">${date}</span>
  <span class="orders__items" role="cell">${items}</span>
  <span class="orders__total" role="cell" data-usd="${o.amount}">${S.format(o.amount)}</span>
  <span class="orders__status" role="cell">${esc(o.status)}</span>
  <span class="orders__meta" aria-hidden="true">${date} · ${esc(o.status)}</span>
  <span class="orders__invoice" role="cell"><a class="orders__download" href="#" data-pending="${todo}"><span class="orders__desktop">DOWNLOAD PDF</span><span class="orders__mobile">DOWNLOAD INVOICE</span></a></span>
</div>`;
    }).join('');
  }

  renderNav();
  if (document.querySelector('[data-esim-list]')) renderList();
  if (document.querySelector('[data-esim-detail]')) renderDetail();
  if (document.querySelector('[data-order-rows]')) renderOrders();
  if (location.hash) { const t = document.querySelector(location.hash); if (t) t.scrollIntoView(); }
})();
