<?php include 'includes/header.php'; ?>
<style>
  .plan-summary__row dd{
    margin: 0px;
  }
  .btn.btn--light.custom-plan__btn{
    height: 63px;
  }
  @media (max-width: 1180px) {
    .site-nav {
        display: none !important;
    }
  }
   @media (max-width: 760px) {
      .rplan1 .container{
        padding-left: 24px;
        padding-right: 24px;        
      }
      .rplan1 .plan-hero__inner{
        padding-top: 32px;
      }
    }
</style>
<main id="plan-page">
  <!-- country layout -->
  <section class="plan-hero plan-hero--country rplan1" data-layout="country">
    <img class="plan-hero__photo" data-photo="" src="assets/images/pages/japan-kyoto.jpg" alt="" fetchpriority="high" data-motion-img="1">
    <div class="container plan-hero__inner">
      <div class="plan-hero__copy" data-motion-reveal="1">
        <p class="label plan-hero__crumb">
          <a href="plans.html">DESTINATIONS</a>&nbsp;&nbsp;/&nbsp;&nbsp; <span data-name-upper="">JAPAN</span>
        </p>
        <img class="flag" data-flag="" src="assets/flags/japan.svg" alt="" width="48" height="48" data-motion-img="1">
        <h1 class="plan-hero__title" data-name="">Japan</h1>
        <p class="plan-hero__tagline eyebrow">
          <span class="plan-hero__rule"></span>
          <span>
            <span data-count="">12 PLANS</span> FROM <span data-from-bare="" data-from="japan" data-bare="">$0.60</span>
          </span>
        </p>
        <p class="plan-hero__lead">Country plan for <span data-name-inline="">Japan</span>. Install it from your phone, keep your own SIM for calls, and top up from your account if the trip runs long. </p>
      </div>
    </div>
  </section>
  <!-- regional and global layout -->
  <section class="section plan-choose rplan1" id="choose">
    <div class="container plan-choose__inner">
      <div class="plan-choose__head" data-motion-reveal="1" style="">
        <p class="eyebrow eyebrow--deep">CHOOSE A PLAN</p>
        <h2 class="h3" data-choose-title="">Pick your data and your days</h2>
      </div>
      <div class="plan-picker" data-motion-reveal="1" style="">
        <fieldset class="plan-picker__options">
          <legend class="visually-hidden">Plans</legend>
          <div class="plan-grid" data-ladder="">
            <label class="plan-option">
              <input type="radio" name="plan" value="100mb-7d">
              <span class="plan-option__top">
                <span class="plan-option__data">100MB</span>
                <span class="plan-option__radio"></span>
              </span>
              <span class="plan-option__validity">7 days</span>
              <span class="plan-option__rule"></span>
              <span class="plan-option__price" data-price="japan:100mb-7d">$0.60</span>
            </label>
            <label class="plan-option">
              <input type="radio" name="plan" value="500mb-7d">
              <span class="plan-option__top">
                <span class="plan-option__data">500MB</span>
                <span class="plan-option__radio"></span>
              </span>
              <span class="plan-option__validity">7 days</span>
              <span class="plan-option__rule"></span>
              <span class="plan-option__price" data-price="japan:500mb-7d">$0.80</span>
            </label>
            <label class="plan-option">
              <input type="radio" name="plan" value="1gb-1d">
              <span class="plan-option__top">
                <span class="plan-option__data">1GB</span>
                <span class="plan-option__radio"></span>
              </span>
              <span class="plan-option__validity">1 day</span>
              <span class="plan-option__rule"></span>
              <span class="plan-option__price" data-price="japan:1gb-1d">$1.60</span>
            </label>
            <label class="plan-option">
              <input type="radio" name="plan" value="1gb-7d">
              <span class="plan-option__top">
                <span class="plan-option__data">1GB</span>
                <span class="plan-option__radio"></span>
              </span>
              <span class="plan-option__validity">7 days</span>
              <span class="plan-option__rule"></span>
              <span class="plan-option__price" data-price="japan:1gb-7d">$1.40</span>
            </label>
            <label class="plan-option">
              <input type="radio" name="plan" value="2gb-1d">
              <span class="plan-option__top">
                <span class="plan-option__data">2GB</span>
                <span class="plan-option__radio"></span>
              </span>
              <span class="plan-option__validity">1 day</span>
              <span class="plan-option__rule"></span>
              <span class="plan-option__price" data-price="japan:2gb-1d">$3.20</span>
            </label>
            <label class="plan-option">
              <input type="radio" name="plan" value="3gb-15d">
              <span class="plan-option__top">
                <span class="plan-option__data">3GB</span>
                <span class="plan-option__radio"></span>
              </span>
              <span class="plan-option__validity">15 days</span>
              <span class="plan-option__rule"></span>
              <span class="plan-option__price" data-price="japan:3gb-15d">$3.40</span>
            </label>
            <label class="plan-option">
              <input type="radio" name="plan" value="3gb-30d">
              <span class="plan-option__top">
                <span class="plan-option__data">3GB</span>
                <span class="plan-option__radio"></span>
              </span>
              <span class="plan-option__validity">30 days</span>
              <span class="plan-option__rule"></span>
              <span class="plan-option__price" data-price="japan:3gb-30d">$3.60</span>
            </label>
            <label class="plan-option">
              <input type="radio" name="plan" value="5gb-30d">
              <span class="plan-option__top">
                <span class="plan-option__data">5GB</span>
                <span class="plan-option__radio"></span>
              </span>
              <span class="plan-option__validity">30 days</span>
              <span class="plan-option__rule"></span>
              <span class="plan-option__price" data-price="japan:5gb-30d">$5.40</span>
            </label>
            <label class="plan-option">
              <input type="radio" name="plan" value="10gb-30d" checked="">
              <span class="plan-option__top">
                <span class="plan-option__data">10GB</span>
                <span class="plan-option__radio"></span>
              </span>
              <span class="plan-option__validity">30 days</span>
              <span class="plan-option__rule"></span>
              <span class="plan-option__price" data-price="japan:10gb-30d">$9.40</span>
            </label>
            <label class="plan-option">
              <input type="radio" name="plan" value="20gb-30d">
              <span class="plan-option__top">
                <span class="plan-option__data">20GB</span>
                <span class="plan-option__radio"></span>
              </span>
              <span class="plan-option__validity">30 days</span>
              <span class="plan-option__rule"></span>
              <span class="plan-option__price" data-price="japan:20gb-30d">$16.40</span>
            </label>
            <label class="plan-option">
              <input type="radio" name="plan" value="50gb-30d">
              <span class="plan-option__top">
                <span class="plan-option__data">50GB</span>
                <span class="plan-option__radio"></span>
              </span>
              <span class="plan-option__validity">30 days</span>
              <span class="plan-option__rule"></span>
              <span class="plan-option__price" data-price="japan:50gb-30d">$34.00</span>
            </label>
            <label class="plan-option">
              <input type="radio" name="plan" value="50gb-180d">
              <span class="plan-option__top">
                <span class="plan-option__data">50GB</span>
                <span class="plan-option__radio"></span>
              </span>
              <span class="plan-option__validity">180 days</span>
              <span class="plan-option__rule"></span>
              <span class="plan-option__price" data-price="japan:50gb-180d">$56.00</span>
            </label>
          </div>
          <div class="plan-gap" data-gap="" hidden="">
            <p class="h5">Plans for <span data-name-inline="">Japan</span> are being loaded. </p>
            <p class="plan-gap__body">Search another destination or try a regional plan.</p>
            <a class="btn btn--light btn--small" href="plans.html">SEARCH DESTINATIONS</a>
          </div>
        </fieldset>
        <aside class="plan-summary" data-summary="" aria-live="polite">
          <p class="eyebrow">YOUR PLAN</p>
          <p class="plan-summary__title">
            <img class="flag flag--small" data-flag="" src="assets/flags/japan.svg" alt="" width="32" height="32" data-motion-img="1">
            <span data-name="">Japan</span>
          </p>
          <dl class="plan-summary__rows">
            <div class="plan-summary__row">
              <dt>Data</dt>
              <dd data-sum-data="">10GB</dd>
            </div>
            <div class="plan-summary__row">
              <dt>Validity</dt>
              <dd data-sum-days="">30 days</dd>
            </div>
            <div class="plan-summary__row">
              <dt>Coverage</dt>
              <dd data-sum-coverage="">Japan</dd>
            </div>
            <div class="plan-summary__row">
              <dt>Top ups</dt>
              <dd>From your account</dd>
            </div>
          </dl>
          <p class="plan-summary__total">
            <span>Price</span>
            <span class="plan-summary__price" data-sum-price="">$9.40</span>
          </p>
          <button class="btn btn--gold btn--block" type="button" data-add="">ADD TO CART</button>
          <p class="plan-summary__note">Prices in USD. Switch to EUR or GBP from the menu.</p>
        </aside>
        <div class="custom-plan" data-custom="">
          <div class="custom-plan__head">
            <div class="custom-plan__copy">
              <p class="eyebrow eyebrow--deep">CUSTOM PLAN</p>
              <p class="h5">Build your own</p>
            </div>
            <p class="custom-plan__price" data-custom-price="" aria-live="polite">$10.80</p>
          </div>
          <div class="custom-plan__slider">
            <p class="custom-plan__labels">
              <label class="label" for="custom-gb">DATA</label>
              <span class="price" data-gb-value="">12GB</span>
            </p>
            <input class="custom-plan__range" id="custom-gb" type="range" step="1" min="1" max="50" style="--pct: 22.448979591836736%;">
            <p class="custom-plan__range-ends">
              <span data-gb-min="">1GB</span>
              <span data-gb-max="">50GB</span>
            </p>
          </div>
          <div class="custom-plan__slider">
            <p class="custom-plan__labels">
              <label class="label" for="custom-days">DAYS</label>
              <span class="price" data-days-value="">21 days</span>
            </p>
            <input class="custom-plan__range" id="custom-days" type="range" step="1" min="1" max="90" style="--pct: 22.47191011235955%;">
            <p class="custom-plan__range-ends">
              <span data-days-min="">1 day</span>
              <span data-days-max="">90 days</span>
            </p>
          </div>
          <button class="btn btn--light custom-plan__btn" type="button" data-add-custom="">ADD CUSTOM PLAN</button>
        </div>
      </div>
    </div>
  </section>
  <section class="section section--dark plan-further rplan1" data-further="">
    <div class="container plan-further__inner">
      <div class="plan-further__collage" data-motion-reveal="1" style="">
        <img class="plan-further__img plan-further__img--large" data-further-large="" src="assets/images/pages/japan-kyoto-night.jpg" alt="" loading="lazy" decoding="async" data-motion-img="1">
        <img class="plan-further__img plan-further__img--small" data-further-small="" src="assets/images/pages/japan-street.jpg" alt="" loading="lazy" decoding="async" data-motion-img="1">
      </div>
      <div class="plan-further__copy" data-motion-reveal="1" style="">
        <p class="eyebrow">GOING FURTHER</p>
        <h2 class="h3 plan-further__title">More than <span data-name-inline="">Japan</span> on this trip? </h2>
        <p class="plan-further__body">If the route crosses borders, a regional or global plan covers <span data-name-inline="">Japan</span> and the rest of the way on one eSIM. </p>
        <div class="plan-further__cards" data-upsell="">
          <a class="country-card" href="plan.html?d=asia">
            <div class="country-card__top">
              <img class="flag" src="assets/flags/global.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
              <span class="country-card__type">REGIONAL</span>
            </div>
            <div class="country-card__copy">
              <p class="country-card__name">Asia</p>
              <p class="country-card__plans">9 plans, 20 areas</p>
            </div>
            <div class="country-card__rule"></div>
            <div class="country-card__bottom">
              <span class="country-card__price" data-from="asia">From $7.20</span>
              <img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async" data-motion-img="1">
            </div>
          </a>
          <a class="country-card" href="plan.html?d=global">
            <div class="country-card__top">
              <img class="flag" src="assets/flags/global.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
              <span class="country-card__type">GLOBAL</span>
            </div>
            <div class="country-card__copy">
              <p class="country-card__name">Global</p>
              <p class="country-card__plans">6 plans, 124 areas</p>
            </div>
            <div class="country-card__rule"></div>
            <div class="country-card__bottom">
              <span class="country-card__price" data-from="global">From $15.20</span>
              <img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async" data-motion-img="1">
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</main>
<?php include 'includes/footer.php'; ?>