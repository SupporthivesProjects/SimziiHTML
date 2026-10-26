/*
  Legal template. legal.html holds the Terms & Conditions (?doc=terms or no doc).
  ?doc=privacy and ?doc=refunds swap in the documents below, laid out on the same template.
  The contents list scrolls to its clause and follows the scroll.
*/
(function () {
  'use strict';

  const EMAIL = 'info@simzii.com';

  const DOCS = {
    privacy: {
      title: 'Privacy Policy',
      description: 'How Simzii collects, uses and keeps your personal data, and the rights you have over it.',
      updated: 'LAST UPDATED 2 OCTOBER 2026',
      intro: 'This policy explains how Simzii handles your personal data. We collect only what we need to sell you an eSIM and look after your account.',
      clauses: [
        ['who-we-are', 'Who we are', [
          'Simzii sells prepaid travel eSIMs on simzii.com. We handle your personal data in line with applicable data protection law.'
        ]],
        ['what-we-collect', 'What we collect', [
          'When you create an account or buy an eSIM, we collect your name, your email address and your country of residence. We also keep the details of each order: what you bought, the amount, the date and the order reference.',
          'Card details are handled by our payment provider on its own secure page. Simzii never sees or stores them.'
        ]],
        ['why-we-collect-it', 'Why we collect it', [
          'We use your data to run your account, deliver your eSIM and its QR code, send your order confirmations and invoices, answer your questions and keep our records in order. We do not sell your data.'
        ]],
        ['cookies', 'Cookies and local storage', [
          'The site uses a small number of cookies and your browser’s local storage to keep your cart and your signed in session between visits. The site needs them to work.',
          'You can clear them in your browser settings at any time. Your cart will then be empty and you will need to log in again.'
        ]],
        ['how-long-we-keep-it', 'How long we keep it', [
          'We keep your account details while your account is open. We keep order records for as long as we need them for our accounts and as the law requires, then delete them. When you close your account, we delete the rest of your personal data.'
        ]],
        ['your-rights', 'Your rights', [
          'You can ask for a copy of the personal data we hold about you, ask us to correct anything that is wrong and ask us to delete it. Applicable data protection law may give you further rights, depending on where you live.',
          'To make a request, write to ' + EMAIL + ' from the email address on your account.'
        ]],
        ['changes', 'Changes to this policy', [
          'We may update this policy from time to time. The date at the top of this page shows when it last changed.'
        ]],
        ['contact', 'Contact', [
          'Questions about this policy or your data can be sent to ' + EMAIL + '.'
        ]]
      ]
    },
    refunds: {
      title: 'Refunds',
      description: 'When Simzii gives a refund on an eSIM and how to ask for one.',
      updated: 'LAST UPDATED 2 OCTOBER 2026',
      intro: 'All eSIM sales are final. This page explains the few cases where we give a refund and how to ask for one.',
      clauses: [
        ['sales-are-final', 'All sales are final', [
          'Once an order is paid, it cannot be cancelled or refunded, except in the cases below. Please check that your phone supports eSIM and is carrier unlocked before you buy.'
        ]],
        ['when-we-refund', 'When we give a refund', [
          'We give a refund if your eSIM was not delivered because of a system error, or if its QR code is invalid and cannot be installed.'
        ]],
        ['time-limit', 'Time limit', [
          'Send your request within 14 days of purchase. We cannot look at requests made after that.'
        ]],
        ['top-ups', 'Top ups', [
          'Top ups are not refundable once they have been added to an eSIM.'
        ]],
        ['how-to-ask', 'How to ask for a refund', [
          'Write to ' + EMAIL + ' with your order reference and a short note of what went wrong. You will find the reference in your order confirmation and in your order history.'
        ]],
        ['changes', 'Changes to this page', [
          'We may update this page from time to time. The date at the top shows when it last changed. Purchases are covered by the rules in place at the time of purchase.'
        ]]
      ]
    }
  };

  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const withMail = s => esc(s).replace(EMAIL, '<a class="link" href="mailto:' + EMAIL + '">' + EMAIL + '</a>');
  const num = i => String(i + 1).padStart(2, '0');

  const doc = new URLSearchParams(location.search).get('doc');
  const data = DOCS[doc];
  if (data) {
    document.title = data.title + ' | Simzii';
    document.querySelector('meta[name="description"]').content = data.description;
    document.querySelector('.legal-title__h1').textContent = data.title;
    document.querySelector('.legal-title__updated').textContent = data.updated;
    document.querySelector('.legal-toc__list').innerHTML = data.clauses.map(([id, head], i) =>
      '<li><a class="legal-toc__item' + (i ? '' : ' legal-toc__item--active') + '" href="#' + id + '" data-clause-link="' + id + '">' +
      '<span class="legal-toc__numeral">' + num(i) + '</span><span>' + esc(head) + '</span></a></li>').join('');
    document.querySelector('.legal-article').innerHTML =
      '<p class="legal-article__intro">' + esc(data.intro) + '</p>' +
      data.clauses.map(([id, head, paras], i) =>
        '<section class="legal-clause" id="' + id + '" data-clause="' + id + '">' +
        '<h2 class="legal-clause__head"><span class="legal-clause__numeral">' + num(i) + '</span> ' + esc(head) + '</h2>' +
        paras.map(p => '<p>' + withMail(p) + '</p>').join('') + '</section>').join('');
  }

  const clauses = [...document.querySelectorAll('[data-clause]')];
  const links = [...document.querySelectorAll('[data-clause-link]')];
  let lock = 0;

  function setActive(id) {
    links.forEach(a => {
      const on = a.dataset.clauseLink === id;
      a.classList.toggle('legal-toc__item--active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }

  function go(id, smooth) {
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    lock = Date.now();
    el.scrollIntoView({ behavior: smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto', block: 'start' });
  }

  links.forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    go(a.dataset.clauseLink, true);
    history.replaceState(null, '', location.search + '#' + a.dataset.clauseLink);
  }));

  addEventListener('scroll', () => {
    if (Date.now() - lock < 900) return;
    const line = innerHeight * 0.3;
    let current = clauses[0];
    clauses.forEach(c => { if (c.getBoundingClientRect().top <= line) current = c; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) current = clauses[clauses.length - 1];
    setActive(current.dataset.clause);
  }, { passive: true });

  const hash = location.hash.slice(1);
  if (hash) go(hash, false);
})();
