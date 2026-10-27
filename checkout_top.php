<?php include 'includes/header.php'; ?>


        <main>
            <section class="flow-header">
                <div class="container pad_left_right flow-header__inner">
                    <div class="flow-header__copy" data-motion-reveal="1">
                        <p class="eyebrow dif_sizet">TOP UP</p>
                        <h1 class="flow-title">Add more data</h1>
                    </div>
                    <ol class="steps no_leftpad_t no_margin_bottom" aria-label="Purchase steps">
                        <li class="steps__step" data-motion-reveal="1"><a
                                href="cart.html"><span>01</span><span>CART</span></a></li>
                        <li class="steps__rule" aria-hidden="true" data-motion-reveal="1"></li>
                        <li class="steps__step" aria-current="step" data-motion-reveal="1">
                            <span>02</span><span>CHECKOUT</span></li>
                        <li class="steps__rule" aria-hidden="true" data-motion-reveal="1"></li>
                        <li class="steps__step" data-motion-reveal="1"><span>03</span><span>PAYMENT</span></li>
                    </ol>
                </div>
            </section>

            <form class="checkout container pad_left_right" id="checkout-form" novalidate="">
                <div class="checkout__details">
                    <h2 class="h4">Your account</h2>
                    <p class="body-sm text-pine">You are signed in, so there is nothing to fill in. The data goes on the eSIM you already have.</p>
                    <div class="hand-off">
                        <div class="hand-off__head">
                            <h3 class="h5">John Smith</h3>
                        </div>
                        <p class="body-sm text-pine">john.smith@gmail.com  ·  Adding to your Turkey eSIM. The receipt goes to this email.</p>
                    </div>
                    <div class="hand-off">
                        <div class="hand-off__head">
                            <h3 class="h5">Payment</h3>
                            <div class="pay-marks"><img src="assets/icons/visa.svg" alt="Visa" data-motion-img="1"><img
                                    src="assets/icons/mastercard.svg" alt="Mastercard" data-motion-img="1"></div>
                        </div>
                        <p class="body-sm text-pine">You will pay on our payment provider's secure page. Simzii never
                            sees or stores your card details.</p>
                    </div>
                </div>

                <aside class="summary-box checkout__summary" aria-labelledby="summary-title">
                    <h2 class="h5" id="summary-title">Order summary</h2>
                    <div class="checkout__rows" id="summary-lines">
                        <div class="summary-row"><span class="summary-row__key">Japan, 10GB, 30 days</span><span
                                class="summary-row__value"><span data-usd="9.4">$9.40</span></span></div>
                        
                    </div>
                    <div class="discount" id="discount">
                        <div class="field discount__field">
                            <label class="field__label" for="discount-code">DISCOUNT CODE</label>
                            <input class="field__control" id="discount-code" type="text" autocomplete="off"
                                placeholder="Enter code">
                        </div>
                        <button class="discount__btn" type="button" id="discount-apply">APPLY</button>
                        <p class="field__error discount__error" id="discount-error" hidden="">That code is not valid.
                        </p>
                    </div>
                    <div class="summary-rule"></div>
                    <div class="checkout__rows" id="summary-totals">
                        <div class="summary-row"><span class="summary-row__key">Subtotal</span><span
                                class="summary-row__value"><span data-usd="88.4">$88.40</span></span></div>
                        <div class="checkout__rows">
                            <div class="summary-row summary-row--total"><span class="summary-row__key">Total</span><span
                                    class="summary-row__value summary-row__value--large" data-usd="88.4">$88.40</span>
                            </div>
                        </div>

                        <button
                            class="btn btn--light btn--block btn--flow checkout__submit checkout__submit--desktop diff_colort"
                            type="submit">CONTINUE TO SECURE PAYMENT</button>
                </aside>

                <div class="checkout__consent">
                    <div class="checkout__check">
                        <label class="checkbox" id="terms-box"><input type="checkbox" id="terms" name="terms"><span>I
                                agree to the <a href="legal.html?doc=terms">Terms &amp; Conditions</a> and <a
                                    href="legal.html?doc=privacy">Privacy Policy</a></span></label>
                        <p class="field__error" id="terms-error" hidden="">Agree to the Terms &amp; Conditions to
                            continue.</p>
                    </div>
                    <div class="checkout__check">
                        <div class="recaptcha" id="recaptcha-box">
                            <label><input type="checkbox" id="recaptcha" name="recaptcha">I'm not a robot</label>
                            <div class="recaptcha__mark"><span>reCAPTCHA</span><span>Privacy · Terms</span></div>
                        </div>
                        <p class="field__error" id="recaptcha-error" hidden="">Tick the box to show you are not a robot.
                        </p>
                    </div>
                </div>

                <button
                    class="btn btn--light btn--block btn--flow checkout__submit checkout__submit--mobile diff_colort"
                    type="submit">CONTINUE TO SECURE PAYMENT</button>
            </form>
        </main>
<?php include 'includes/footer.php'; ?>