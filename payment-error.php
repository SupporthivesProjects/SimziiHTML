
<?php include 'includes/header.php'; ?>
    <main>
    <div class="result-band"></div>
    <section class="result">
        <div class="result__copy result__copy--wide">
        <img class="result__mark" src="assets/icons/mark-error.svg" alt="" width="80" height="80" data-motion-img="1">
        <p class="eyebrow eyebrow--deep">PAYMENT ERROR</p>
        <h1 class="flow-title">The payment did not go through</h1>
        <p class="result__body">Your cart is saved. Check the card details on the payment page, or try a different card. If it keeps happening, your bank may have blocked the payment.</p>
        <div class="result__summary" id="result-summary">
            <div class="summary-row">
            <span class="summary-row__key">Order</span>
            <span class="summary-row__value">SZ-10482</span>
            </div>
            <div class="summary-row">
            <span class="summary-row__key">Japan, 10GB, 30 days</span>
            <span class="summary-row__value">
                <span data-usd="9.4">$9.40</span>
            </span>
            </div>
            <div class="summary-row">
            <span class="summary-row__key">Europe, 5GB, 30 days</span>
            <span class="summary-row__value">
                <span data-usd="22">$22.00</span>
            </span>
            </div>
            <div class="summary-row">
            <span class="summary-row__key">Discount · SIMZII10</span>
            <span class="summary-row__value summary-row__value--discount">− <span data-usd="3.14">$3.14</span>
            </span>
            </div>
            <div class="summary-rule"></div>
            <div class="summary-row summary-row--total">
            <span class="summary-row__key">Total due</span>
            <span class="summary-row__value" data-usd="28.26">$28.26</span>
            </div>
        </div>
        <div class="result__actions">
            <a class="btn btn--light btn--flow" href="checkout.html">TRY AGAIN</a>
            <a class="result__link" href="contact.html">CONTACT SUPPORT</a>
        </div>
        </div>
    </section>
    </main>
<?php include 'includes/footer.php'; ?>