/*
  Page motion: the fade between pages, quiet image loading and the default reveal.
  Loaded in <head> on every page, before the body, so the entry fade never flashes.
  Styles live at the end of css/base.css (page motion).

  Page fade: browsers with cross document view transitions use the CSS rule alone.
  Everywhere else (and over file://) this script fades the page in on load and out
  on same site link clicks. Reduced motion turns all of it off.

  Images: <img loading="lazy"> fades in over a placeholder as it arrives. Cached images
  show at once.

  Reveal: on inner pages, blocks below the first screen fade up once as they come into
  view. The homepage keeps its own motion and is left alone. Add data-reveal="off" to
  any element to keep it out.

  Off switch: <html data-motion="off"> plus removing @view-transition from css/base.css.
*/
(function () {
  'use strict';

  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const off = reduce || root.dataset.motion === 'off';
  // over file:// each page is its own origin, so the native path never runs there
  const native = 'CSSViewTransitionRule' in window && location.protocol !== 'file:';
  const fallback = !off && !native;
  const LEAVE_MS = 200;

  window.Motion = { off, native, fallback };
  if (off) { root.classList.add('motion-off'); return; }

  // fallback entry fade, held behind a class so the page is never hidden without JS
  if (fallback) {
    root.classList.add('page-enter');
    const show = () => root.classList.remove('page-enter', 'page-leave');
    const reveal = () => requestAnimationFrame(() => requestAnimationFrame(show));
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', reveal);
    else reveal();
    setTimeout(show, 1200);
    // back and forward cache: the page comes back as it left, so lift the exit fade
    addEventListener('pageshow', e => { if (e.persisted) show(); });
  }

  // fallback exit fade. listens on window so every page script has had its turn first
  function leaving(e) {
    if (!fallback || e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.hasAttribute('download')) return;
    if (a.target && a.target !== '_self') return;
    const raw = a.getAttribute('href');
    if (!raw || raw.charAt(0) === '#' || /^(mailto|tel|javascript):/i.test(raw)) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.protocol !== location.protocol) return;
    if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
    e.preventDefault();
    root.classList.add('page-leave');
    setTimeout(() => { location.href = url.href; }, LEAVE_MS);
  }
  addEventListener('click', leaving);

  // native path: the header holds still between pages only when it is on screen,
  // otherwise it would slide in from where the old page left it
  function headerName(e) {
    const vt = e.viewTransition;
    if (!vt) return;
    // a skipped transition (hidden tab, slow page) is not an error worth reporting
    [vt.ready, vt.finished, vt.updateCallbackDone].forEach(p => p && p.catch(() => {}));
    const h = document.getElementById('site-header');
    if (!h) return;
    const r = h.getBoundingClientRect();
    const steady = r.bottom > 0 && r.top < innerHeight && !h.classList.contains('site-header--menu-open') && !document.body.classList.contains('home');
    h.style.viewTransitionName = steady ? '' : 'none';
  }
  if (native) {
    addEventListener('pageswap', headerName);
    addEventListener('pagereveal', headerName);
  }

  // images
  function watchImage(img) {
    if (img.dataset.motionImg) return;
    img.dataset.motionImg = '1';
    if (img.getAttribute('loading') !== 'lazy') return;
    if (img.complete && img.naturalWidth) return;
    img.classList.add('img-wait');
    const done = () => {
      img.classList.remove('img-wait');
      img.classList.add('img-in');
      img.addEventListener('animationend', () => img.classList.remove('img-in'), { once: true });
    };
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', () => img.classList.remove('img-wait'), { once: true });
  }

  // reveal units: the direct blocks of each section, or the items of a grid or list
  const GRID = /(^|\s)[\w-]*(__grid|-grid|__list|-list)(\s|$)/;
  const SKIP = '[data-reveal="off"], [hidden], script, template, .popup, .tip, .site-header, .site-footer';
  let io;
  function units(scope) {
    const out = [];
    scope.querySelectorAll('main section > .container, main section > .container > [class*="__inner"], main section > [class*="__inner"]').forEach(box => {
      [...box.children].forEach(el => {
        // lazy images bring their own fade
        if (el.matches(SKIP) || /__inner/.test(el.className) || el.matches('img[loading="lazy"]')) return;
        if ((el.tagName === 'UL' || el.tagName === 'OL' || GRID.test(el.className)) && el.children.length > 2) {
          out.push(...el.children);
        } else out.push(el);
      });
    });
    return out;
  }
  function observe(list) {
    const fold = innerHeight;
    list.forEach(el => {
      if (el.dataset.motionReveal || el.closest(SKIP)) return;
      el.dataset.motionReveal = '1';
      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) return;
      if (r.top < fold * 0.92) return;              // already on screen: it arrives with the page
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  function start() {
    document.querySelectorAll('img').forEach(watchImage);
    if (!document.body.classList.contains('home') && 'IntersectionObserver' in window) {
      // items arriving together stagger lightly, in reading order
      io = new IntersectionObserver(entries => {
        entries.filter(en => en.isIntersecting)
          .sort((p, q) => p.boundingClientRect.top - q.boundingClientRect.top || p.boundingClientRect.left - q.boundingClientRect.left)
          .forEach((en, i) => {
            const el = en.target, delay = Math.min(i, 6) * 70;
            io.unobserve(el);
            el.style.setProperty('--reveal-delay', delay + 'ms');
            el.classList.add('reveal--in');
            // hand the element back its own transitions once it has settled
            setTimeout(() => { el.classList.remove('reveal', 'reveal--in'); el.style.removeProperty('--reveal-delay'); }, 700 + delay);
          });
      }, { rootMargin: '0px 0px -8% 0px' });
      observe(units(document));
    }
    // cards and lists rendered later by page scripts
    new MutationObserver(muts => {
      let fresh = false;
      muts.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType !== 1) return;
        if (n.tagName === 'IMG') watchImage(n); else n.querySelectorAll('img').forEach(watchImage);
        fresh = true;
      }));
      if (fresh && io) observe(units(document));
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
