/*
  Auth forms: login, sign up, forgot password, reset password.
  Each control carries its rule and its error copy:
    data-rule="required | email | min8 | match:<id> | checked"   data-error="..."
  The form's data-auth says what a valid submit does. Nothing is posted: the auth
  service plugs in where Store.signIn is called and where the popups open.
*/
(function () {
  'use strict';

  const form = document.querySelector('form[data-auth]');
  if (!form) return;

  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* ?next= returns the visitor where they were going (checkout, an account page); only a page of this site, by relative file name */
  const nextRaw = new URLSearchParams(location.search).get('next') || '';
  const next = /^[a-z0-9][a-z0-9-]*\.html(\?[\w=&%.-]*)?(#[\w-]*)?$/i.test(nextRaw) ? nextRaw : '';
  if (next) {
    document.querySelectorAll('a[href="sign-up.html"], a[href="login.html"]').forEach(a => {
      if (!a.closest('header, footer, [data-partial]')) a.href = a.getAttribute('href') + '?next=' + encodeURIComponent(next);
    });
  }

  function valid(input) {
    const rule = input.dataset.rule || '';
    const v = input.type === 'checkbox' ? input.checked : input.value.trim();
    if (rule === 'checked') return v;
    if (rule === 'email') return EMAIL.test(v);
    if (rule === 'min8') return input.value.length >= 8;
    if (rule.startsWith('match:')) { const other = document.getElementById(rule.slice(6)); return !!input.value && other && input.value === other.value; }
    return !!v;
  }

  function show(input, ok) {
    if (input.type === 'checkbox') {
      const box = input.closest('.checkbox');
      if (box) box.classList.toggle('checkbox--error', !ok);
      input.setAttribute('aria-invalid', String(!ok));
      return;
    }
    const field = input.closest('.field');
    let msg = field.querySelector('.field__error');
    field.classList.toggle('field--error', !ok);
    input.setAttribute('aria-invalid', String(!ok));
    if (!ok) {
      if (!msg) {
        msg = document.createElement('p');
        msg.className = 'field__error';
        msg.id = input.id + '-error';
        field.appendChild(msg);
      }
      msg.textContent = input.dataset.error || '';
      input.setAttribute('aria-describedby', msg.id);
    } else if (msg) {
      msg.remove();
      input.removeAttribute('aria-describedby');
    }
  }

  const controls = [...form.querySelectorAll('[data-rule]')];

  controls.forEach(input => {
    const evt = input.type === 'checkbox' ? 'change' : 'input';
    input.addEventListener(evt, () => {
      if (input.getAttribute('aria-invalid') === 'true') show(input, valid(input));
    });
  });

  const done = {
    login() {
      Store.signIn(form.elements.email.value.trim());
      location.href = next || 'account.html';
    },
    signup() {
      Store.signIn(form.elements.email.value.trim());
      const first = form.elements.name.value.trim().split(/\s+/)[0];
      const slot = document.querySelector('[data-first-name]');
      if (slot && first) slot.textContent = first;
      const cta = document.querySelector('#popup-created .btn');
      if (next && cta) { cta.href = next; cta.textContent = next.startsWith('checkout.html') ? 'CONTINUE TO CHECKOUT' : 'CONTINUE'; }
      UI.openPopup('popup-created');
    },
    forgot() { UI.openPopup('popup-sent'); },
    reset() { UI.openPopup('popup-updated'); }
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    let first = null;
    controls.forEach(input => {
      const ok = valid(input);
      show(input, ok);
      if (!ok && !first) first = input;
    });
    if (first) { first.focus(); return; }
    done[form.dataset.auth]();
  });
})();
