<?php include 'includes/header.php'; ?>
<main class="account">
  <div class="account__band"></div>
  <div class="account-layout">
    <aside class="account-nav" aria-label="Account">
      <div class="account-nav__user">
        <p class="account-nav__eyebrow">SIGNED IN AS</p>
        <p class="account-nav__name">John Smith</p>
        <p class="account-nav__email">figma@supporthives.com</p>
      </div>
      <div class="account-nav__rule"></div>
      <nav class="account-nav__links">
        <a class="account-nav__link" href="account.html" aria-current="page">MY ESIMS</a>
        <a class="account-nav__link" href="orders.html">ORDER HISTORY</a>
      </nav>
      <div class="account-nav__rule"></div>
      <button class="account-nav__logout" type="button" data-sign-out="">LOG OUT</button>
    </aside>
    <div class="account-strip">
      <span class="account-strip__avatar">JS</span>
      <div class="account-strip__copy">
        <p class="account-strip__name">John Smith</p>
        <p class="account-strip__email">figma@supporthives.com</p>
      </div>
    </div>
    <div class="account-layout__content">
      <nav class="account-tabs" aria-label="Account">
        <a class="account-tabs__tab" href="account.html" aria-current="page">MY eSIMS</a>
        <a class="account-tabs__tab" href="orders.html">ORDER HISTORY</a>
      </nav>
      <div data-esim-detail="">
        <div class="esim-head">
          <p class="esim-head__crumb">
            <a href="account.html">MY eSIMS</a>&nbsp;&nbsp;/&nbsp;&nbsp;TURKEY
          </p>
          <div class="esim-head__title">
            <img class="flag esim-head__flag" src="assets/flags/turkey.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
            <h1 class="esim-head__name">Turkey</h1>
          </div>
          <p class="esim-head__plan">Country plan · 5GB · 30 days · Order SZ-10457</p>
        </div>
        <div class="esim-columns esim-columns--topup">
          <section class="esim-install" id="install" aria-labelledby="install-title">
            <h2 class="eyebrow eyebrow--deep esim-install__eyebrow" id="install-title">INSTALLATION DETAILS</h2>
            <div class="esim-install__qr-row">
              <img class="esim-install__qr" src="assets/images/pages/esim-qr.svg" alt="QR code to install the Turkey eSIM" width="234" height="234" loading="lazy" decoding="async" data-motion-img="1">
              <ol class="esim-install__steps">
                <li class="esim-install__step">
                  <span class="esim-install__numeral">01</span>
                  <span>Connect to wifi before you travel.</span>
                </li>
                <li class="esim-install__step">
                  <span class="esim-install__numeral">02</span>
                  <span>Open your camera and scan the code.</span>
                </li>
                <li class="esim-install__step">
                  <span class="esim-install__numeral">03</span>
                  <span>Follow the prompts and name the plan Simzii Turkey.</span>
                </li>
                <li class="esim-install__step">
                  <span class="esim-install__numeral">04</span>
                  <span>Turn on data roaming for Simzii when you land.</span>
                </li>
              </ol>
            </div>
            <div class="esim-phone esim-phone--compact">
              <div class="esim-phone__copy">
                <p class="esim-phone__eyebrow">
                  <span class="esim-phone__desktop">ON YOUR PHONE?</span>
                  <span class="esim-phone__mobile">ON THIS PHONE?</span>
                </p>
                <p class="esim-phone__body">
                  <span class="esim-phone__desktop">Open this page on your phone and tap Install now. Your phone installs the eSIM itself, no QR code needed.</span>
                  <span class="esim-phone__mobile">Tap the button and your phone installs the eSIM itself. No QR code needed.</span>
                </p>
              </div>
              <a class="btn esim-phone__btn" href="#install" data-pending="The install link comes from the eSIM provider">INSTALL NOW</a>
            </div>
            <div class="esim-manual">
              <h3 class="esim-manual__label">MANUAL SETUP</h3>
              <dl>
                <div class="esim-manual__row">
                  <dt>SM-DP+ address</dt>
                  <dd>rsp.simzii.com</dd>
                </div>
                <div class="esim-manual__row">
                  <dt>Activation code</dt>
                  <dd>TR-7Q2M-51KD-30PX</dd>
                </div>
                <div class="esim-manual__row">
                  <dt>ICCID</dt>
                  <dd>8988 3000 0011 2741 552</dd>
                </div>
              </dl>
            </div>
          </section>
          <section class="esim-usage esim-usage--joined" aria-labelledby="usage-title">
            <h2 class="eyebrow esim-usage__eyebrow" id="usage-title">DATA LEFT</h2>
            <p class="esim-usage__figure">
              <span class="esim-usage__value">2.1GB</span>
              <span class="esim-usage__of">of 6GB</span>
            </p>
            <div class="esim-usage__bar">
              <span style="width:35%"></span>
            </div>
            <dl class="esim-usage__rows">
              <div class="esim-usage__row">
                <dt>Status</dt>
                <dd>Active</dd>
              </div>
              <div class="esim-usage__row">
                <dt>Days</dt>
                <dd>20 left</dd>
              </div>
              <div class="esim-usage__row">
                <dt>Coverage</dt>
                <dd>Turkey</dd>
              </div>
            </dl>
          </section>
          <section class="esim-topup" aria-label="Top up">
            <h2 class="eyebrow esim-topup__eyebrow esim-topup__eyebrow--history">TOP UP HISTORY</h2>
            <div class="esim-topup__history">
              <div class="esim-topup__row">
                <span>27 Sep 2026 · 1GB</span>
                <span data-usd="0.92">$0.92</span>
              </div>
            </div>
            <h2 class="eyebrow esim-topup__eyebrow esim-topup__eyebrow--options">TOP UP</h2>
            <div class="esim-topup__options">
              <a class="esim-topup__option" href="top-up.html?esim=turkey&amp;t=1gb">
                <span class="esim-topup__data">1GB</span>
                <span class="esim-topup__price" data-usd="0.92">$0.92</span>
              </a>
              <a class="esim-topup__option esim-topup__option--selected" href="top-up.html?esim=turkey&amp;t=3gb">
                <span class="esim-topup__data">3GB</span>
                <span class="esim-topup__price" data-usd="2.84">$2.84</span>
              </a>
              <a class="esim-topup__option" href="top-up.html?esim=turkey&amp;t=5gb">
                <span class="esim-topup__data">5GB</span>
                <span class="esim-topup__price" data-usd="4.6">$4.60</span>
              </a>
            </div>
            <a class="btn btn--gold btn--block esim-topup__cta" href="top-up.html?esim=turkey&amp;t=3gb">TOP UP 3GB</a>
          </section>
        </div>
      </div>
    </div>
  </div>
</main>
<?php include 'includes/footer.php'; ?>
