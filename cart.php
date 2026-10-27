<?php include 'includes/header.php'; ?>

    <main>
      <section class="flow-header">
        <div class="container pad_left_right flow-header__inner">
          <div class="flow-header__copy" data-motion-reveal="1">
            <p class="eyebrow dif_sizet">YOUR CART</p>
            <h1 class="flow-title" id="cart-title">Two plans ready to go</h1>
          </div>
          <ol class="steps no_leftpad_t no_margin_bottom" aria-label="Purchase steps">
            <li class="steps__step" aria-current="step" data-motion-reveal="1"><span>01</span><span>CART</span></li>
            <li class="steps__rule" aria-hidden="true" data-motion-reveal="1"></li>
            <li class="steps__step" data-motion-reveal="1"><span>02</span><span>CHECKOUT</span></li>
            <li class="steps__rule" aria-hidden="true" data-motion-reveal="1"></li>
            <li class="steps__step" data-motion-reveal="1"><span>03</span><span>PAYMENT</span></li>
          </ol>
        </div>
      </section>

      <section class="cart container pad_left_right">
        <div class="cart__lines">
          <div class="cart__head"><span>PLAN</span><span>PRICE</span></div>
          <ul class="cart__list no_leftpad_t2 no_margin_bottom" id="cart-list">
            <li class="cart-line">
              <img class="flag cart-line__flag" src="assets/flags/japan.svg" alt="" width="48" height="48"
                loading="lazy" decoding="async" data-motion-img="1">
              <p class="cart-line__name">Japan</p>
              <p class="cart-line__type">Country plan · 10GB · 30 days</p>
              <button class="cart-line__remove" type="button" data-remove="mvmn4jqcqj4u"
                aria-label="Remove Japan 10GB">REMOVE</button>
              <p class="cart-line__price" data-usd="9.4">$9.40</p>
            </li>
            <li class="cart-line">
              <img class="flag cart-line__flag" src="assets/flags/europe.svg" alt="" width="48" height="48"
                loading="lazy" decoding="async" data-motion-img="1">
              <p class="cart-line__name">Europe</p>
              <p class="cart-line__type">Regional plan · 5GB · 30 days</p>
              <button class="cart-line__remove" type="button" data-remove="mvmn4s48zdzk"
                aria-label="Remove Europe 5GB">REMOVE</button>
              <p class="cart-line__price" data-usd="22">$22.00</p>
            </li>
          </ul>
        </div>

        <aside class="summary-box cart__summary" id="cart-summary" aria-labelledby="cart-summary-title">
          <h2 class="h5" id="cart-summary-title">Summary</h2>
          <div class="cart__rows" id="cart-rows">
            <div class="summary-row"><span class="summary-row__key">Japan, 10GB, 30 days</span><span
                class="summary-row__value"><span data-usd="9.4">$9.40</span></span></div>
            <div class="summary-row"><span class="summary-row__key">Europe, 5GB, 30 days</span><span
                class="summary-row__value"><span data-usd="22">$22.00</span></span></div>
          </div>
          <div class="summary-rule"></div>
          <div id="cart-totals">
            <div class="summary-row"><span class="summary-row__key">Subtotal</span><span
                class="summary-row__value"><span data-usd="31.4">$31.40</span></span></div>
            <div class="summary-row summary-row--total"><span class="summary-row__key">Total at checkout</span><span
                class="summary-row__value" data-usd="31.4">$31.40</span></div>
          </div>
          <a class="btn btn--light btn--block btn--flow diff_colort" href="checkout.html">CONTINUE TO CHECKOUT</a>
          <p class="caption text-pine">Discount codes go in at checkout.</p>
        </aside>

        <div class="cart-empty" id="cart-empty" hidden="">
          <p class="body-lg text-pine">No plans in your cart yet. Pick a destination to see its plans.</p>
          <a class="btn btn--light btn--flow" href="plans.html">BROWSE DESTINATIONS</a>
        </div>

        <a class="cart__keep" href="plans.html"><img src="assets/icons/arrow-left.svg" alt="" width="17" height="11"
            data-motion-img="1">KEEP BROWSING</a>
      </section>
    </main>
<?php include 'includes/footer.php'; ?>