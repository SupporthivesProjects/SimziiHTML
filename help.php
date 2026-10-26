<?php include 'includes/header.php'; ?>
<main>
  <section class="help-hero">
    <img class="help-hero__img" fetchpriority="high" src="assets/images/pages/help-mountain-mist.jpg" alt="" width="1800" height="1200" data-motion-img="1">
    <div class="container help-hero__copy">
      <p class="eyebrow" data-motion-reveal="1">SUPPORT</p>
      <h1 class="help-hero__title" data-motion-reveal="1">Help centre</h1>
      <p class="help-hero__lead" data-motion-reveal="1">Answers on installing, topping up and paying. Search, or pick a topic below.</p>
      <form class="search-bar help-search" role="search" action="help.html" data-help-search="" data-motion-reveal="1">
        <img class="search-bar__icon" src="assets/icons/search.svg" alt="" data-motion-img="1">
        <label class="visually-hidden" for="help-q">Search the help centre</label>
        <input class="search-bar__input" id="help-q" name="q" type="search" autocomplete="off" placeholder="Search the help centre, for example “top up”" data-placeholder-mobile="Search, for example “top up”">
        <button class="btn btn--gold help-search__button" type="submit">SEARCH</button>
      </form>
    </div>
  </section>
  <nav class="help-chips" aria-label="Help topics">
    <a class="chip chip--selected" href="#getting-started" data-topic-link="getting-started">GETTING STARTED</a>
    <a class="chip" href="#installing" data-topic-link="installing">INSTALLING</a>
    <a class="chip" href="#plans-and-top-ups" data-topic-link="plans-and-top-ups">PLANS AND TOP UPS</a>
    <a class="chip" href="#payments-and-invoices" data-topic-link="payments-and-invoices">PAYMENTS</a>
  </nav>
  <section class="help-topics">
    <div class="container help-topics__grid">
      <div class="help-rail reveal" data-motion-reveal="1">
        <nav class="help-rail__nav" aria-label="Help topics">
          <a class="help-rail__link help-rail__link--active" href="#getting-started" data-topic-link="getting-started">GETTING STARTED</a>
          <a class="help-rail__link" href="#installing" data-topic-link="installing">INSTALLING</a>
          <a class="help-rail__link" href="#plans-and-top-ups" data-topic-link="plans-and-top-ups">PLANS AND TOP UPS</a>
          <a class="help-rail__link" href="#payments-and-invoices" data-topic-link="payments-and-invoices">PAYMENTS AND INVOICES</a>
        </nav>
      </div>
      <div class="help-answers reveal" data-motion-reveal="1">
        <div class="help-group" id="getting-started" data-topic="getting-started">
          <h2 class="help-group__head">
            <span class="help-group__numeral">01</span> Getting started
          </h2>
          <div class="help-group__list">
            <div class="faq-item faq-item--open">
              <button class="faq-item__question" type="button" aria-expanded="true">
                <span class="diamond"></span>What is an eSIM? </button>
              <div class="faq-item__answer">
                <div>
                  <p>An eSIM is a SIM built into your phone. You add a plan by scanning a QR code instead of inserting a card, and your own SIM can stay where it is.</p>
                </div>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-item__question" type="button" aria-expanded="false">
                <span class="diamond"></span>Will my phone work with Simzii? </button>
              <div class="faq-item__answer">
                <div>
                  <p>Most recent phones support eSIM. Go to Settings, then Mobile Data. If you see Add eSIM, your phone is compatible. It also needs to be carrier unlocked. The full list of models is on the <a class="link" href="compatibility.html">compatibility page</a>. </p>
                </div>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-item__question" type="button" aria-expanded="false">
                <span class="diamond"></span>Do I keep my own number? </button>
              <div class="faq-item__answer">
                <div>
                  <p>Yes. Your own SIM stays in for calls and texts while Simzii handles the data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="help-group" id="installing" data-topic="installing">
          <h2 class="help-group__head">
            <span class="help-group__numeral">02</span> Installing
          </h2>
          <div class="help-group__list">
            <div class="faq-item">
              <button class="faq-item__question" type="button" aria-expanded="false">
                <span class="diamond"></span>When should I install my eSIM? </button>
              <div class="faq-item__answer">
                <div>
                  <p>Install it before you travel, while you are on Wi-Fi. When you arrive, switch it on as your mobile data line.</p>
                </div>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-item__question" type="button" aria-expanded="false">
                <span class="diamond"></span>How do I install it? </button>
              <div class="faq-item__answer">
                <div>
                  <p>Open the eSIM in your account. Scan the QR code from another screen, or use the install button on the phone itself. If your phone cannot scan, enter the SM-DP+ address and activation code shown under manual setup.</p>
                </div>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-item__question" type="button" aria-expanded="false">
                <span class="diamond"></span>Can I move it to another phone? </button>
              <div class="faq-item__answer">
                <div>
                  <p>Most eSIMs install on one phone only. If you are changing phones, write to us before you delete the eSIM and we will look at the options with you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="help-group" id="plans-and-top-ups" data-topic="plans-and-top-ups">
          <h2 class="help-group__head">
            <span class="help-group__numeral">03</span> Plans and top ups
          </h2>
          <div class="help-group__list">
            <div class="faq-item">
              <button class="faq-item__question" type="button" aria-expanded="false">
                <span class="diamond"></span>What happens when my data runs out? </button>
              <div class="faq-item__answer">
                <div>
                  <p>Top up from the eSIM in your account. The new data is added to the same eSIM, so there is nothing new to install.</p>
                </div>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-item__question" type="button" aria-expanded="false">
                <span class="diamond"></span>Can I use one plan in more than one country? </button>
              <div class="faq-item__answer">
                <div>
                  <p>Country plans cover the one country they are named for. Regional plans cover every area listed on the plan, so a Europe plan runs across all <span data-fact="europe:areaLabel">40+ areas</span> it names, and a Global plan runs across <span data-fact="global:areaCount">124</span>. If you are crossing borders, the regional plan is usually the cheaper of the two. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="help-group" id="payments-and-invoices" data-topic="payments-and-invoices">
          <h2 class="help-group__head">
            <span class="help-group__numeral">04</span> Payments and invoices
          </h2>
          <div class="help-group__list">
            <div class="faq-item">
              <button class="faq-item__question" type="button" aria-expanded="false">
                <span class="diamond"></span>Which currencies can I pay in? </button>
              <div class="faq-item__answer">
                <div>
                  <p>You can pay in USD, EUR or GBP. Choose the currency from the selector in the menu before you check out.</p>
                </div>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-item__question" type="button" aria-expanded="false">
                <span class="diamond"></span>Where do I find my invoice? </button>
              <div class="faq-item__answer">
                <div>
                  <p>Sign in and open <a class="link" href="orders.html">order history</a> in your account. Every order and top up has its own invoice to download. </p>
                </div>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-item__question" type="button" aria-expanded="false">
                <span class="diamond"></span>Can I get a refund? </button>
              <div class="faq-item__answer">
                <div>
                  <p>All eSIM sales are final. We give a refund if your eSIM was not delivered because of a system error, or if its QR code is invalid and cannot be installed. The <a class="link" href="legal.html?doc=refunds">Refunds page</a> explains how to ask for one. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="help-answers__empty body" data-help-empty="" hidden="">No answers match that search. Try another word, or write to us below.</p>
      </div>
      <aside class="help-stuck reveal" data-motion-reveal="1">
        <p class="eyebrow">STILL STUCK?</p>
        <h2 class="help-stuck__title">Write to us</h2>
        <p class="help-stuck__body">Tell us the destination and the phone you are using, and we will take it from there.</p>
        <a class="btn btn--gold" href="contact.html">CONTACT US</a>
      </aside>
    </div>
  </section>
</main>

<?php include 'includes/footer.php'; ?>