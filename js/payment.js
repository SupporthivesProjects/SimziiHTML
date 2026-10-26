/*
  Payment gateway hand off. startPayment() is the single place the gateway plugs in.

  It receives an order record:
    { reference: 'SZ-10482', kind: 'plans' | 'topup',
      lines: [{ destination, plan: { id, data, days, price } }],
      subtotal, discount, code, total, currency, email, esim (top ups only) }

  Today it stores the order and redirects to the confirmation page with the reference.
  With a real gateway it must: create the payment session server side for order.total
  in order.currency, redirect the buyer to the hosted payment page (Simzii never sees
  card details), and send the buyer back to the confirmation page on success or to
  payment-error.html on failure, carrying ?ref=<reference>.
*/
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
