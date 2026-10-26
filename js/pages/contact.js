/* Contact form: validates on submit, shows the error state, then the message sent popup. Posts nowhere. */
(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function wrapOf(input) {
    return input.type === 'checkbox' ? input.closest('.contact-form__check') : input.closest('.field');
  }

  function isValid(input) {
    if (input.type === 'checkbox') return input.checked;
    const v = input.value.trim();
    if (!v) return false;
    return input.type === 'email' ? EMAIL.test(v) : true;
  }

  function mark(input, bad) {
    const wrap = wrapOf(input);
    if (input.type === 'checkbox') {
      const box = input.closest('.checkbox');
      if (box) box.classList.toggle('checkbox--error', bad);
    } else {
      wrap.classList.toggle('field--error', bad);
    }
    let msg = wrap.querySelector('.field__error');
    if (bad && !msg) {
      msg = document.createElement('p');
      msg.className = 'field__error';
      msg.id = (input.id || input.name) + '-error';
      msg.textContent = input.dataset.error;
      wrap.appendChild(msg);
      input.setAttribute('aria-describedby', msg.id);
    }
    if (!bad && msg) { msg.remove(); input.removeAttribute('aria-describedby'); }
    input.setAttribute('aria-invalid', bad);
  }

  const inputs = [...form.querySelectorAll('[required]')];
  inputs.forEach(input => {
    const evt = input.type === 'checkbox' || input.tagName === 'SELECT' ? 'change' : 'input';
    input.addEventListener(evt, () => { if (input.getAttribute('aria-invalid') === 'true') mark(input, !isValid(input)); });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let first = null;
    inputs.forEach(input => {
      const bad = !isValid(input);
      mark(input, bad);
      if (bad && !first) first = input;
    });
    if (first) { first.focus(); return; }
    form.reset();
    inputs.forEach(input => input.removeAttribute('aria-invalid'));
    UI.openPopup('popup-sent');
  });
})();
