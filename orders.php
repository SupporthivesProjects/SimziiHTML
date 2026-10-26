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
        <a class="account-nav__link" href="account.html">MY ESIMS</a>
        <a class="account-nav__link" href="orders.html" aria-current="page">ORDER HISTORY</a>
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
        <a class="account-tabs__tab" href="account.html">MY eSIMS</a>
        <a class="account-tabs__tab" href="orders.html" aria-current="page">ORDER HISTORY</a>
      </nav>
      <div class="account-head">
        <div class="account-head__copy">
          <p class="eyebrow eyebrow--deep account-head__eyebrow">MY ACCOUNT</p>
          <h1 class="account-head__title">Order history</h1>
        </div>
      </div>
      <div class="orders" role="table" aria-label="Orders">
        <div class="orders__head" role="row">
          <span role="columnheader">ORDER</span>
          <span role="columnheader">DATE</span>
          <span role="columnheader">ITEMS</span>
          <span role="columnheader">TOTAL</span>
          <span role="columnheader">STATUS</span>
          <span class="orders__invoice" role="columnheader">INVOICE</span>
        </div>
        <div data-order-rows="">
          <div class="orders__row" role="row">
            <span class="orders__ref" role="cell">SZ-10482</span>
            <span class="orders__date" role="cell">2 Oct 2026</span>
            <span class="orders__items" role="cell">Japan 10GB, 30 days <br>Europe 5GB, 30 days </span>
            <span class="orders__total" role="cell" data-usd="28.26">$28.26</span>
            <span class="orders__status" role="cell">Paid</span>
            <span class="orders__meta" aria-hidden="true">2 Oct 2026 · Paid</span>
            <span class="orders__invoice" role="cell">
              <a class="orders__download" href="#" data-pending="Invoice PDF comes from the order system">
                <span class="orders__desktop">DOWNLOAD PDF</span>
                <span class="orders__mobile">DOWNLOAD INVOICE</span>
              </a>
            </span>
          </div>
          <div class="orders__row" role="row">
            <span class="orders__ref" role="cell">SZ-10461</span>
            <span class="orders__date" role="cell">27 Sep 2026</span>
            <span class="orders__items" role="cell">Turkey top up 1GB</span>
            <span class="orders__total" role="cell" data-usd="0.92">$0.92</span>
            <span class="orders__status" role="cell">Paid</span>
            <span class="orders__meta" aria-hidden="true">27 Sep 2026 · Paid</span>
            <span class="orders__invoice" role="cell">
              <a class="orders__download" href="#" data-pending="Invoice PDF comes from the order system">
                <span class="orders__desktop">DOWNLOAD PDF</span>
                <span class="orders__mobile">DOWNLOAD INVOICE</span>
              </a>
            </span>
          </div>
          <div class="orders__row" role="row">
            <span class="orders__ref" role="cell">SZ-10457</span>
            <span class="orders__date" role="cell">22 Sep 2026</span>
            <span class="orders__items" role="cell">Turkey 5GB, 30 days</span>
            <span class="orders__total" role="cell" data-usd="4.6">$4.60</span>
            <span class="orders__status" role="cell">Paid</span>
            <span class="orders__meta" aria-hidden="true">22 Sep 2026 · Paid</span>
            <span class="orders__invoice" role="cell">
              <a class="orders__download" href="#" data-pending="Invoice PDF comes from the order system">
                <span class="orders__desktop">DOWNLOAD PDF</span>
                <span class="orders__mobile">DOWNLOAD INVOICE</span>
              </a>
            </span>
          </div>
          <div class="orders__row" role="row">
            <span class="orders__ref" role="cell">SZ-10377</span>
            <span class="orders__date" role="cell">14 Jul 2026</span>
            <span class="orders__items" role="cell">Thailand 3GB, 15 days</span>
            <span class="orders__total" role="cell" data-usd="3.4">$3.40</span>
            <span class="orders__status" role="cell">Paid</span>
            <span class="orders__meta" aria-hidden="true">14 Jul 2026 · Paid</span>
            <span class="orders__invoice" role="cell">
              <a class="orders__download" href="#" data-pending="Invoice PDF comes from the order system">
                <span class="orders__desktop">DOWNLOAD PDF</span>
                <span class="orders__mobile">DOWNLOAD INVOICE</span>
              </a>
            </span>
          </div>
          <div class="orders__row" role="row">
            <span class="orders__ref" role="cell">SZ-10291</span>
            <span class="orders__date" role="cell">3 May 2026</span>
            <span class="orders__items" role="cell">Global 3GB, 30 days</span>
            <span class="orders__total" role="cell" data-usd="38.8">$38.80</span>
            <span class="orders__status" role="cell">Paid</span>
            <span class="orders__meta" aria-hidden="true">3 May 2026 · Paid</span>
            <span class="orders__invoice" role="cell">
              <a class="orders__download" href="#" data-pending="Invoice PDF comes from the order system">
                <span class="orders__desktop">DOWNLOAD PDF</span>
                <span class="orders__mobile">DOWNLOAD INVOICE</span>
              </a>
            </span>
          </div>
        </div>
      </div>
      <p class="orders__note">Invoices show the subtotal, any discount and the total paid, in the currency you paid in.</p>
    </div>
  </div>
</main>
<?php include 'includes/footer.php'; ?>
