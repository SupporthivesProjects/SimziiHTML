/*
  Shared header and footer, injected into <div data-partial="header"> and <div data-partial="footer">.
  Kept in JS so the site runs from file:// with no server.
  Body attributes drive the header:
    data-nav="destinations|regions|how|support"   current item
    data-auth="signed-in"                           forces the signed in nav (account pages)
    data-cart="off"                                 hides the cart icon (top up checkout)
*/
(function () {
  'use strict';

  const body = document.body;
  const S = window.Store;
  const user = () => (body.dataset.auth === 'signed-in' ? (S.session() || S.account().user) : S.session());

  const NAV = [
    { id: 'destinations', label: 'DESTINATIONS', menu: 'Destinations', href: 'plans.html' },
    { id: 'regions', label: 'REGIONS', menu: 'Regions', href: 'plans.html?type=regional#all' },
    { id: 'how', label: 'HOW IT WORKS', menu: 'How it works', href: 'index.html#how' },
    { id: 'support', label: 'SUPPORT', menu: 'Support', href: 'help.html' }
  ];
  const SOCIALS = [['instagram', 'Instagram'], ['tiktok', 'TikTok'], ['x', 'X']];
  // home keeps the MENU text control, other pages use the icon
  const MENU_TEXT = body.dataset.page === 'home';
  const initials = u => (u.firstName[0] + u.lastName[0]).toUpperCase();

  function socials(cls, lazy) {
    return `<div class="socials ${cls || ''}">${SOCIALS.map(([k, n]) =>
      `<a class="socials__link" href="#" data-pending="Social link to be supplied" aria-label="${n}"><img src="assets/icons/${k}.svg" alt="" width="14" height="14"${lazy ? ' loading="lazy" decoding="async"' : ''}></a>`).join('')}</div>`;
  }

  function currencyLabel(c) { return S.currencies[c] + ' ' + c; }

//   function header() {
//     const current = body.dataset.nav;
//     const u = user();
//     const count = body.dataset.cart === 'off' ? 0 : S.cart.count();
//     const cur = S.currency();
//     const aria = id => (id === current ? ' aria-current="page"' : '');
//     const cart = count ? `<a class="cart-link" href="cart.html" aria-label="Cart, ${count} ${count === 1 ? 'plan' : 'plans'}"><img class="cart-link__icon" src="assets/icons/cart.svg" alt=""><span class="cart-link__count">${count}</span></a>` : '';
//     const account = u
//       ? `<a class="account-link" href="account.html"><span class="account-link__avatar">${initials(u)}</span>MY ACCOUNT</a>`
//       : `<a class="btn btn--gold btn--small" href="login.html">MY ACCOUNT</a>`;

//     return `
// <header class="site-header" id="site-header">
//   <div class="site-header__bar">
//     <a class="logo" href="index.html" aria-label="Simzii home">SIMZII</a>
//     <nav class="site-nav" aria-label="Main">
//       ${NAV.map(n => `<a class="site-nav__link" href="${n.href}"${aria(n.id)}>${n.label}</a>`).join('')}
//       ${cart}
//       <div class="currency" data-currency>
//         <button class="currency__toggle" type="button" aria-haspopup="listbox" aria-expanded="false">${currencyLabel(cur)}</button>
//         <div class="currency__list" role="listbox" aria-label="Currency">
//           ${Object.keys(S.currencies).map(c => `<button class="currency__option" type="button" role="option" data-set-currency="${c}" aria-selected="${c === cur}">${currencyLabel(c)}</button>`).join('')}
//         </div>
//       </div>
//       ${account}
//     </nav>
//     <div class="site-header__actions">
//       ${cart}
//       ${MENU_TEXT
//         ? `<button class="menu-toggle menu-toggle--text" type="button" aria-expanded="false" aria-controls="mobile-menu">MENU</button>`
//         : `<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><img src="assets/icons/menu.svg" alt=""></button>`}
//     </div>
//   </div>
//   <div class="mobile-menu" id="mobile-menu">
//     <nav class="mobile-menu__links" aria-label="Main">
//       ${NAV.map(n => `<a class="mobile-menu__link" href="${n.href}"${aria(n.id)}>${n.menu}<img src="assets/icons/arrow-right-gold.svg" alt=""></a>`).join('')}
//     </nav>
//     <div class="mobile-menu__utilities">
//       <p class="label text-mist">CURRENCY</p>
//       <div class="mobile-menu__currencies">
//         ${Object.keys(S.currencies).map(c => `<button class="mobile-menu__currency" type="button" data-set-currency="${c}" aria-pressed="${c === cur}">${currencyLabel(c)}</button>`).join('')}
//       </div>
//     </div>
//     <a class="btn btn--gold btn--block" href="${u ? 'account.html' : 'login.html'}">MY ACCOUNT</a>
//     ${socials('mobile-menu__socials')}
//   </div>
// </header>`;
//   }

//   function footer() {
//     const signedIn = !!user();
//     return `
// <footer class="site-footer">
//   <div class="container">
//     <div class="site-footer__columns"${body.dataset.page === 'home' ? ' data-speed="-4" data-end' : ''}>
//       <div class="site-footer__brand">
//         <a class="logo logo--large" href="index.html">SIMZII</a>
//         <p>Prepaid travel eSIMs for single countries and whole regions.</p>
//       </div>
//       <div class="site-footer__pair">
//         <div class="site-footer__column">
//           <p class="site-footer__heading">QUICK LINKS</p>
//           <div class="site-footer__links">
//             <a href="plans.html">Destinations</a>
//             <a href="plans.html?type=regional#all">Regions</a>
//             <a href="index.html#how">How it works</a>
//             <a href="about.html">About us</a>
//           </div>
//         </div>
//         <div class="site-footer__column">
//           <p class="site-footer__heading">SUPPORT</p>
//           <div class="site-footer__links">
//             <a href="help.html">Help centre</a>
//             <a href="compatibility.html">Compatibility</a>
//             <a href="contact.html">Contact us</a>
//             <a href="${signedIn ? 'account.html' : 'login.html'}">My account</a>
//           </div>
//         </div>
//       </div>
//       <div class="site-footer__column">
//         <p class="site-footer__heading">CONTACTS</p>
//         <div class="site-footer__links">
//           <a href="mailto:info@simzii.com">info@simzii.com</a>
//           <a href="tel:+78005005640">8 (800) 500-56-40</a>
//           <a href="legal.html?doc=terms">Terms &amp; Conditions</a>
//           <a href="legal.html?doc=privacy">Privacy Policy</a>
//         </div>
//       </div>
//     </div>
//     <div class="site-footer__rule"></div>
//     <div class="site-footer__bottom">
//       ${socials('', true)}
//       <p class="site-footer__copyright">© 2026 Simzii. All rights reserved.</p>
//       <div class="pay-marks"><img src="assets/icons/visa.svg" alt="Visa" width="46" height="32" loading="lazy" decoding="async"><img src="assets/icons/mastercard.svg" alt="Mastercard" width="46" height="32" loading="lazy" decoding="async"></div>
//     </div>
//   </div>
// </footer>`;
//   }

//   function render() {
//     const h = document.querySelector('[data-partial="header"]');
//     const f = document.querySelector('[data-partial="footer"]');
//     if (h) h.innerHTML = header();
//     if (f) f.innerHTML = footer();
//   }

  /* one set of delegated listeners survives every re-render */
  document.addEventListener('click', e => {
    const toggle = e.target.closest('.currency__toggle');
    const box = document.querySelector('[data-currency]');
    if (toggle) {
      const open = box.classList.toggle('currency--open');
      toggle.setAttribute('aria-expanded', open);
      return;
    }
    if (box && !box.contains(e.target)) box.classList.remove('currency--open');

    const set = e.target.closest('[data-set-currency]');
    if (set) {
      if (!S.setCurrency(set.dataset.setCurrency) && set.dataset.setCurrency !== 'USD') {
        window.UI && UI.tip(set, 'Prices show in USD for now');
      }
      if (box) box.classList.remove('currency--open');
      return;
    }

    const menu = e.target.closest('.menu-toggle');
    if (menu) {
      const hd = document.getElementById('site-header');
      const open = hd.classList.toggle('site-header--menu-open');
      menu.setAttribute('aria-expanded', open);
      if (MENU_TEXT) {
        menu.innerHTML = open ? '<img src="assets/icons/close-light.svg" alt="">' : 'MENU';
        menu.classList.toggle('menu-toggle--text', !open);
        menu.setAttribute('aria-label', open ? 'Close menu' : '');
        if (!open) menu.removeAttribute('aria-label');
      } else {
        menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        menu.querySelector('img').src = open ? 'assets/icons/close-light.svg' : 'assets/icons/menu.svg';
      }
      document.documentElement.style.overflow = open ? 'hidden' : '';
      document.documentElement.classList.toggle('menu-open', open);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const hd = document.getElementById('site-header');
    if (hd && hd.classList.contains('site-header--menu-open')) hd.querySelector('.menu-toggle').click();
    const box = document.querySelector('[data-currency]');
    if (box) box.classList.remove('currency--open');
  });
  document.addEventListener('store:change', e => {
    if (['simzii.cart', 'simzii.session', 'simzii.currency'].includes(e.detail.key)) render();
  });

  //render();
})();
