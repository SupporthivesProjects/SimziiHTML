
<?php include 'includes/header.php'; ?>

<main>
  <div class="result-band"></div>
  <section class="result result--photos">
    <img class="result__photo result__photo--kyoto" src="assets/images/pages/result-kyoto.jpg" alt="" width="640" height="840" data-motion-img="1">
    <img class="result__photo result__photo--window" src="assets/images/pages/result-window.jpg" alt="" width="560" height="720" data-motion-img="1">
    <img class="result__photo result__photo--lake" src="assets/images/pages/result-lake.jpg" alt="" width="899" height="600" loading="lazy" decoding="async" data-motion-img="1">
    <img class="result__photo result__photo--peak" src="assets/images/pages/result-peak.jpg" alt="" width="680" height="1020" loading="lazy" decoding="async" data-motion-img="1">
    <div class="result__copy">
      <img class="result__mark" src="assets/icons/mark-success.svg" alt="" width="80" height="80" data-motion-img="1">
      <p class="eyebrow eyebrow--deep">TOP UP COMPLETE</p>
      <h1 class="flow-title">Top up added</h1>
      <p class="result__body" id="result-body">Thank you, John. 3GB is on your Turkey eSIM and ready to use. Same eSIM, nothing new to install. Your receipt is on its way to john@example.com.</p>
      <div class="result__summary" id="result-summary">
        <div class="summary-row">
          <span class="summary-row__key">Order</span>
          <span class="summary-row__value">SZ-10503</span>
        </div>
        <div class="summary-row">
          <span class="summary-row__key">Turkey top up, 3GB</span>
          <span class="summary-row__value">
            <span data-usd="2.84">$2.84</span>
          </span>
        </div>
        <div class="summary-rule"></div>
        <div class="summary-row summary-row--total">
          <span class="summary-row__key">Total paid</span>
          <span class="summary-row__value" data-usd="2.84">$2.84</span>
        </div>
      </div>
      <div class="result__actions">
        <a class="btn btn--light btn--flow" id="esim-link" href="esim.html?id=turkey&amp;topped=1">GO TO MY eSIM</a>
        <a class="result__link" href="orders.html" data-pending="Invoice download comes with the order service">DOWNLOAD INVOICE</a>
      </div>
    </div>
  </section>
</main>
<?php include 'includes/footer.php'; ?>