
(function () {
  'use strict';

  function startPayment(order) {
    window.Store.saveOrder({ ...order, paidAt: new Date().toISOString() });
    if (order.kind === 'plans') window.Store.cart.clear();
    const page = order.kind === 'topup' ? 'top-up-complete.html' : 'payment-complete.html';
    location.href = page + '?ref=' + encodeURIComponent(order.reference);
  }

  window.startPayment = startPayment;
})();
