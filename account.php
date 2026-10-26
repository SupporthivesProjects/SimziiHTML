<?php include 'includes/header.php'; ?>
<main class="account">
  <div class="account__band"></div>
  <div class="account-layout">
    <aside class="account-nav" aria-label="Account">
      <div class="account-nav__user">
        <p class="account-nav__eyebrow">SIGNED IN AS</p>
        <p class="account-nav__name">John Smith</p>
        <p class="account-nav__email">vijay@supporthives.com</p>
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
        <p class="account-strip__email">vijay@supporthives.com</p>
      </div>
    </div>
    <div class="account-layout__content">
      <nav class="account-tabs" aria-label="Account">
        <a class="account-tabs__tab" href="account.html" aria-current="page">MY eSIMS</a>
        <a class="account-tabs__tab" href="orders.html">ORDER HISTORY</a>
      </nav>
      <div class="account-head">
        <div class="account-head__copy">
          <p class="eyebrow eyebrow--deep account-head__eyebrow">MY ACCOUNT</p>
          <h1 class="account-head__title">My eSIMs</h1>
        </div>
        <a class="btn btn--light account-head__action" href="plans.html" data-esims-only="">ADD A PLAN</a>
        <a class="account-head__link" href="plans.html" data-esims-only="">ADD A PLAN</a>
      </div>
      <div class="esim-list" data-esim-list="">
        <article class="esim-card esim-card--active">
          <div class="esim-card__identity">
            <img class="flag esim-card__flag" src="assets/flags/turkey.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
            <div class="esim-card__copy">
              <h2 class="esim-card__name">Turkey</h2>
              <p class="esim-card__plan">Country plan · 5GB · 30 days</p>
            </div>
          </div>
          <div class="esim-card__usage">
            <p class="esim-status esim-status--active">ACTIVE</p>
            <div class="esim-card__bar">
              <span style="width:65%"></span>
            </div>
            <p class="esim-card__note">2.1GB of 6GB left · 20 days left</p>
          </div>
          <div class="esim-card__actions">
            <a class="btn btn--light esim-card__btn" href="top-up.html?esim=turkey&amp;t=3gb">TOP UP</a>
            <a class="esim-card__details" href="esim.html?id=turkey">DETAILS</a>
          </div>
        </article>
        <article class="esim-card esim-card--ready">
          <div class="esim-card__identity">
            <img class="flag esim-card__flag" src="assets/flags/japan.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
            <div class="esim-card__copy">
              <h2 class="esim-card__name">Japan</h2>
              <p class="esim-card__plan">Country plan · 10GB · 30 days</p>
            </div>
          </div>
          <div class="esim-card__usage">
            <p class="esim-status esim-status--ready">READY TO INSTALL</p>
            <div class="esim-card__bar">
              <span style="width:0%"></span>
            </div>
            <p class="esim-card__note">Days start when it first connects in Japan</p>
          </div>
          <div class="esim-card__actions">
            <a class="btn btn--light esim-card__btn" href="esim.html?id=japan#install">INSTALL</a>
            <a class="esim-card__details" href="esim.html?id=japan">DETAILS</a>
          </div>
        </article>
        <article class="esim-card esim-card--ready">
          <div class="esim-card__identity">
            <img class="flag esim-card__flag" src="assets/flags/europe.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
            <div class="esim-card__copy">
              <h2 class="esim-card__name">Europe</h2>
              <p class="esim-card__plan">Regional plan · 5GB · 30 days</p>
            </div>
          </div>
          <div class="esim-card__usage">
            <p class="esim-status esim-status--ready">READY TO INSTALL</p>
            <div class="esim-card__bar">
              <span style="width:0%"></span>
            </div>
            <p class="esim-card__note">Days start when it first connects in any of the 40+ areas</p>
          </div>
          <div class="esim-card__actions">
            <a class="btn btn--light esim-card__btn" href="esim.html?id=europe#install">INSTALL</a>
            <a class="esim-card__details" href="esim.html?id=europe">DETAILS</a>
          </div>
        </article>
        <article class="esim-card esim-card--expired">
          <div class="esim-card__identity">
            <img class="flag esim-card__flag" src="assets/flags/thailand.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
            <div class="esim-card__copy">
              <h2 class="esim-card__name">Thailand</h2>
              <p class="esim-card__plan">Country plan · 3GB · 15 days</p>
            </div>
          </div>
          <div class="esim-card__usage">
            <p class="esim-status esim-status--expired">EXPIRED</p>
            <div class="esim-card__bar">
              <span style="width:100%"></span>
            </div>
            <p class="esim-card__note">Ended 29 July 2026</p>
          </div>
          <div class="esim-card__actions">
            <a class="btn btn--light esim-card__btn" href="plan.html?d=thailand">BUY AGAIN</a>
          </div>
        </article>
      </div>
      <div class="account-empty" data-esim-empty="" >
        <img class="account-empty__icon" src="assets/icons/globe-frame.svg" alt="" width="80" height="80" data-motion-img="1">
        <h2 class="account-empty__title">No eSIMs yet</h2>
        <p class="account-empty__body">When you buy a plan, it appears here with the QR code to install it and the data left on it.</p>
        <a class="btn btn--light account-empty__cta" href="plans.html">BROWSE DESTINATIONS</a>
      </div>
    </div>
  </div>
</main>
<?php include 'includes/footer.php'; ?>
