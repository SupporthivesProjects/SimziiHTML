<?php include 'includes/header.php'; ?>
<style>
  @media (max-width: 760px) {
    .eyebrow {
        font-size: 13px;
    }
    .plans-list__copy{
      gap: 24px;
    }
}
  </style>
<main>
    <section class="page-header plans-hero rplans">
        <div class="container plans-hero__inner">
            <div class="plans-hero__copy" data-motion-reveal="1">
                <p class="eyebrow">DESTINATIONS</p>
                <h1 class="h1 plans-hero__title">Where are you going?</h1>
                <p class="page-header__lead plans-hero__lead">Search a country or a region and see every plan, priced in full.</p>
                <form class="plans-search" role="search" autocomplete="off" novalidate="">
                    <div class="search-bar plans-search__bar">
                        <img class="search-bar__icon" src="assets/icons/search.svg" alt="" data-motion-img="1">
                        <label class="visually-hidden" for="plans-q">Search a country or a region</label>
                        <input class="search-bar__input" id="plans-q" name="q" type="search" placeholder="Where are you going? Try Japan or Europe" data-placeholder-mobile="Try Japan or Europe" role="combobox" aria-expanded="false" aria-controls="plans-suggest" aria-autocomplete="list"
                        data-placeholder-desktop="Where are you going? Try Japan or Europe">
                        <button class="btn btn--gold plans-search__submit" type="submit">SEARCH</button>
                    </div>
                    <div class="plans-suggest" id="plans-suggest" role="listbox" aria-label="Suggestions" hidden>
                        <button class="suggest-item suggest-item--active" type="button" role="option" id="sg-0" data-index="0" aria-selected="true" data-destination="japan">
                            <img class="flag" src="assets/flags/japan.svg" alt="" width="32" height="32" data-motion-img="1">
                            <span class="suggest-item__copy"><span class="suggest-item__name"><mark>J</mark>apan</span><span class="suggest-item__meta">COUNTRY<span class="suggest-item__count"> · 12 plans</span></span>
                            </span>
                            <span class="suggest-item__price" data-from="japan">From $0.60</span>
                            <img class="suggest-item__arrow" src="assets/icons/arrow-right.svg" alt="" data-motion-img="1">
                        </button>
                        <button class="suggest-item" type="button" role="option" id="sg-1" data-index="1" aria-selected="false" data-area="Jersey">
                            <img class="flag" src="assets/flags/global.svg" alt="" width="32" height="32" data-motion-img="1">
                            <span class="suggest-item__copy"><span class="suggest-item__name"><mark>J</mark>ersey</span><span class="suggest-item__meta">COVERED BY EUROPE AND GLOBAL</span></span>
                            <span class="suggest-item__price" data-from="europe">From $3.20</span>
                            <img class="suggest-item__arrow" src="assets/icons/arrow-right.svg" alt="" data-motion-img="1">
                        </button>
                        <button class="suggest-item" type="button" role="option" id="sg-2" data-index="2" aria-selected="false" data-area="Jordan">
                            <img class="flag" src="assets/flags/global.svg" alt="" width="32" height="32" data-motion-img="1">
                            <span class="suggest-item__copy"><span class="suggest-item__name"><mark>J</mark>ordan</span><span class="suggest-item__meta">COVERED BY MIDDLE EAST AND NORTH AFRICA AND GLOBAL</span></span>
                            <span class="suggest-item__price" data-from="mena">From $14.00</span>
                            <img class="suggest-item__arrow" src="assets/icons/arrow-right.svg" alt="" data-motion-img="1">
                        </button>
                        <button class="suggest-item" type="button" role="option" id="sg-3" data-index="3" aria-selected="false" data-area="Azerbaijan">
                            <img class="flag" src="assets/flags/global.svg" alt="" width="32" height="32" data-motion-img="1">
                            <span class="suggest-item__copy"><span class="suggest-item__name">Azerbai<mark>j</mark>an</span><span class="suggest-item__meta">COVERED BY GLOBAL</span></span>
                            <span class="suggest-item__price" data-from="global">From $15.20</span>
                            <img class="suggest-item__arrow" src="assets/icons/arrow-right.svg" alt="" data-motion-img="1">
                        </button>
                        <button class="suggest-item" type="button" role="option" id="sg-4" data-index="4" aria-selected="false" data-destination="asia">
                            <img class="flag" src="assets/flags/global.svg" alt="" width="32" height="32" data-motion-img="1">
                            <span class="suggest-item__copy"><span class="suggest-item__name">Asia</span><span class="suggest-item__meta">REGIONAL · COVERS JAPAN<span class="suggest-item__count"> · 9 plans</span></span>
                            </span>
                            <span class="suggest-item__price" data-from="asia">From $7.20</span>
                            <img class="suggest-item__arrow" src="assets/icons/arrow-right.svg" alt="" data-motion-img="1">
                        </button>
                        <button class="suggest-item" type="button" role="option" id="sg-5" data-index="5" aria-selected="false" data-destination="global">
                            <img class="flag" src="assets/flags/global.svg" alt="" width="32" height="32" data-motion-img="1">
                            <span class="suggest-item__copy"><span class="suggest-item__name">Global</span><span class="suggest-item__meta">GLOBAL · COVERS JAPAN<span class="suggest-item__count"> · 6 plans</span></span>
                            </span>
                            <span class="suggest-item__price" data-from="global">From $15.20</span>
                            <img class="suggest-item__arrow" src="assets/icons/arrow-right.svg" alt="" data-motion-img="1">
                        </button>
                        <button class="suggest-item" type="button" role="option" id="sg-6" data-index="6" aria-selected="false" data-destination="europe">
                            <img class="flag" src="assets/flags/global.svg" alt="" width="32" height="32" data-motion-img="1">
                            <span class="suggest-item__copy"><span class="suggest-item__name">Europe</span><span class="suggest-item__meta">REGIONAL · COVERS JERSEY</span></span>
                            <span class="suggest-item__price" data-from="europe">From $3.20</span>
                            <img class="suggest-item__arrow" src="assets/icons/arrow-right.svg" alt="" data-motion-img="1">
                        </button>
                        <button class="plans-suggest__all label" type="button" data-all="">SEE ALL RESULTS FOR “J”</button>
                    </div>
                </form>
            </div>
            <div class="plans-map" aria-label="Popular destinations" data-motion-reveal="1">
                <img class="plans-map__img" src="assets/images/world-map.svg" alt="" width="1440" height="620" data-motion-img="1">
                <a class="map-pin" style="--x:88.47%;--y:31.61%" href="plan.html?d=japan">
                    <span class="map-pin__marker"></span>
                    <span class="map-pin__label">Tokyo</span>
                </a>
                <a class="map-pin" style="--x:77.29%;--y:47.42%" href="plan.html?d=thailand">
                    <span class="map-pin__marker"></span>
                    <span class="map-pin__label">Bangkok</span>
                </a>
                <a class="map-pin map-pin--desktop" style="--x:56.88%;--y:27.90%" href="plan.html?d=turkey">
                    <span class="map-pin__marker"></span>
                    <span class="map-pin__label">Istanbul</span>
                </a>
                <a class="map-pin map-pin--above" style="--x:52.15%;--y:27.26%" href="plan.html?d=italy">
                    <span class="map-pin__marker"></span>
                    <span class="map-pin__label">Rome</span>
                </a>
                <a class="map-pin map-pin--desktop map-pin--left" style="--x:45.97%;--y:29.52%" href="plan.html?d=portugal">
                    <span class="map-pin__marker"></span>
                    <span class="map-pin__label">Lisbon</span>
                </a>
                <a class="map-pin" style="--x:27.43%;--y:28.06%" href="plan.html?d=united-states">
                    <span class="map-pin__marker"></span>
                    <span class="map-pin__label">New York</span>
                </a>
                <a class="map-pin map-pin--desktop" style="--x:64.38%;--y:39.19%" href="plan.html?d=uae">
                    <span class="map-pin__marker"></span>
                    <span class="map-pin__label">Dubai</span>
                </a>
                <a class="map-pin" style="--x:81.46%;--y:63.06%" href="plan.html?d=indonesia">
                    <span class="map-pin__marker"></span>
                    <span class="map-pin__label">Bali</span>
                </a>
                <a class="map-pin map-pin--desktop" style="--x:20.28%;--y:43.23%" href="plan.html?d=mexico">
                    <span class="map-pin__marker"></span>
                    <span class="map-pin__label">Mexico City</span>
                </a>
                <a class="map-pin map-pin--desktop" style="--x:91.81%;--y:81.29%" href="plans.html?q=Australia">
                    <span class="map-pin__marker"></span>
                    <span class="map-pin__label">Sydney</span>
                </a>
            </div>
        </div>
    </section>
    <section class="section plans-list rplans" id="all">
        <div class="container plans-list__inner">
            <div class="plans-list__head" data-head="" data-motion-reveal="1" style="">
                <div class="plans-list__copy">
                    <p class="eyebrow eyebrow--deep" data-head-eyebrow="">ALL DESTINATIONS</p>
                    <h2 class="h3 plans-list__title" data-head-title="">Find your plan</h2>
                </div>
                <div class="plans-filters" role="group" aria-label="Filter destinations">
                    <button class="chip" type="button" data-type="all" aria-pressed="true">ALL</button>
                    <button class="chip" type="button" data-type="country" aria-pressed="false">COUNTRY</button>
                    <button class="chip" type="button" data-type="regional" aria-pressed="false">REGIONAL</button>
                    <button class="chip" type="button" data-type="global" aria-pressed="false">GLOBAL</button>
                </div>
            </div>
            <div class="plans-empty" data-empty="" hidden="">
                <img class="plans-empty__icon" src="assets/icons/search-circle.svg" alt="" width="80" height="80" data-motion-img="1">
                <p class="eyebrow eyebrow--deep">NO MATCH</p>
                <h2 class="h3 plans-empty__title">Nothing found for “ <span data-empty-query=""></span>” </h2>
                <p class="plans-empty__body">Check the spelling, or search by country name. If it is a region, a regional or global plan may cover it.</p>
            </div>
            <div class="plans-popular" data-popular="" hidden="">
                <p class="title">POPULAR RIGHT NOW</p>
                <div class="plans-grid plans-grid--popular" data-popular-grid=""></div>
            </div>
            <div class="plans-grid" data-grid="" aria-live="polite">
                <a class="country-card" href="plan.html?d=japan" data-motion-reveal="1" style="">
                    <div class="country-card__top">
                        <img class="flag" src="assets/flags/japan.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
                        <span class="country-card__type">COUNTRY</span>
                    </div>
                    <div class="country-card__copy">
                        <p class="country-card__name">Japan</p>
                        <p class="country-card__plans">12 plans</p>
                    </div>
                    <div class="country-card__rule"></div>
                    <div class="country-card__bottom">
                        <span class="country-card__price" data-from="japan">From $0.60</span>
                        <img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async" data-motion-img="1">
                    </div>
                </a>
                <a class="country-card" href="plan.html?d=europe" data-motion-reveal="1" style="">
                    <div class="country-card__top">
                        <img class="flag" src="assets/flags/europe.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
                        <span class="country-card__type">REGIONAL</span>
                    </div>
                    <div class="country-card__copy">
                        <p class="country-card__name">Europe</p>
                        <p class="country-card__plans">11 plans, 40+ areas</p>
                    </div>
                    <div class="country-card__rule"></div>
                    <div class="country-card__bottom">
                        <span class="country-card__price" data-from="europe">From $3.20</span>
                        <img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async" data-motion-img="1">
                    </div>
                </a>
                <a class="country-card" href="plan.html?d=turkey" data-motion-reveal="1" style="">
                    <div class="country-card__top">
                        <img class="flag" src="assets/flags/turkey.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
                        <span class="country-card__type">COUNTRY</span>
                    </div>
                    <div class="country-card__copy">
                        <p class="country-card__name">Turkey</p>
                        <p class="country-card__plans">12 plans</p>
                    </div>
                    <div class="country-card__rule"></div>
                    <div class="country-card__bottom">
                        <span class="country-card__price" data-from="turkey">From $0.60</span>
                        <img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async" data-motion-img="1">
                    </div>
                </a>
                <a class="country-card" href="plan.html?d=thailand" data-motion-reveal="1" style="">
                    <div class="country-card__top">
                        <img class="flag" src="assets/flags/thailand.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
                        <span class="country-card__type">COUNTRY</span>
                    </div>
                    <div class="country-card__copy">
                        <p class="country-card__name">Thailand</p>
                        <p class="country-card__plans">12 plans</p>
                    </div>
                    <div class="country-card__rule"></div>
                    <div class="country-card__bottom">
                        <span class="country-card__price" data-from="thailand">From $0.60</span>
                        <img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async" data-motion-img="1">
                    </div>
                </a>
                <a class="country-card" href="plan.html?d=italy" data-motion-reveal="1" style="">
                    <div class="country-card__top">
                        <img class="flag" src="assets/flags/italy.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
                        <span class="country-card__type">COUNTRY</span>
                    </div>
                    <div class="country-card__copy">
                        <p class="country-card__name">Italy</p>
                        <p class="country-card__plans">12 plans</p>
                    </div>
                    <div class="country-card__rule"></div>
                    <div class="country-card__bottom">
                        <span class="country-card__price" data-from="italy">From $0.80</span>
                        <img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async" data-motion-img="1">
                    </div>
                </a>
                <a class="country-card" href="plan.html?d=france" data-motion-reveal="1" style="">
                    <div class="country-card__top">
                        <img class="flag" src="assets/flags/france.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
                        <span class="country-card__type">COUNTRY</span>
                    </div>
                    <div class="country-card__copy">
                        <p class="country-card__name">France</p>
                        <p class="country-card__plans">12 plans</p>
                    </div>
                    <div class="country-card__rule"></div>
                    <div class="country-card__bottom">
                        <span class="country-card__price" data-from="france">From $0.60</span>
                        <img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async" data-motion-img="1">
                    </div>
                </a>
                <a class="country-card" href="plan.html?d=global" data-motion-reveal="1" style="">
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
                <a class="country-card" href="plan.html?d=spain" data-motion-reveal="1" style="">
                    <div class="country-card__top">
                        <img class="flag" src="assets/flags/spain.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
                        <span class="country-card__type">COUNTRY</span>
                    </div>
                    <div class="country-card__copy">
                        <p class="country-card__name">Spain</p>
                        <p class="country-card__plans">12 plans</p>
                    </div>
                    <div class="country-card__rule"></div>
                    <div class="country-card__bottom">
                        <span class="country-card__price" data-from="spain">From $0.80</span>
                        <img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async" data-motion-img="1">
                    </div>
                </a>
                <a class="country-card" href="plan.html?d=greece" data-motion-reveal="1" style="">
                    <div class="country-card__top">
                        <img class="flag" src="assets/flags/greece.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
                        <span class="country-card__type">COUNTRY</span>
                    </div>
                    <div class="country-card__copy">
                        <p class="country-card__name">Greece</p>
                        <p class="country-card__plans">12 plans</p>
                    </div>
                    <div class="country-card__rule"></div>
                    <div class="country-card__bottom">
                        <span class="country-card__price" data-from="greece">From $0.60</span>
                        <img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async" data-motion-img="1">
                    </div>
                </a>
                <a class="country-card" href="plan.html?d=portugal" data-motion-reveal="1" style="">
                    <div class="country-card__top">
                        <img class="flag" src="assets/flags/portugal.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
                        <span class="country-card__type">COUNTRY</span>
                    </div>
                    <div class="country-card__copy">
                        <p class="country-card__name">Portugal</p>
                        <p class="country-card__plans">12 plans</p>
                    </div>
                    <div class="country-card__rule"></div>
                    <div class="country-card__bottom">
                        <span class="country-card__price" data-from="portugal">From $1.00</span>
                        <img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async" data-motion-img="1">
                    </div>
                </a>
                <a class="country-card" href="plan.html?d=indonesia" data-motion-reveal="1" style="">
                    <div class="country-card__top">
                        <img class="flag" src="assets/flags/indonesia.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
                        <span class="country-card__type">COUNTRY</span>
                    </div>
                    <div class="country-card__copy">
                        <p class="country-card__name">Indonesia</p>
                        <p class="country-card__plans">12 plans</p>
                    </div>
                    <div class="country-card__rule"></div>
                    <div class="country-card__bottom">
                        <span class="country-card__price" data-from="indonesia">From $0.60</span>
                        <img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async" data-motion-img="1">
                    </div>
                </a>
                <a class="country-card" href="plan.html?d=uae" data-motion-reveal="1" style="">
                    <div class="country-card__top">
                        <img class="flag" src="assets/flags/uae.svg" alt="" width="48" height="48" loading="lazy" decoding="async" data-motion-img="1">
                        <span class="country-card__type">COUNTRY</span>
                    </div>
                    <div class="country-card__copy">
                        <p class="country-card__name">United Arab Emirates</p>
                        <p class="country-card__plans">12 plans</p>
                    </div>
                    <div class="country-card__rule"></div>
                    <div class="country-card__bottom">
                        <span class="country-card__price" data-from="uae">From $0.60</span>
                        <img class="country-card__arrow" src="assets/icons/arrow-right.svg" alt="" width="17" height="11" loading="lazy" decoding="async" data-motion-img="1">
                    </div>
                </a>
            </div>
            <p class="plans-none" data-none="" hidden="">No destinations of this type yet.</p>
            <div class="plans-note" data-note="" hidden="">
                <p class="plans-note__body">Travelling beyond <span data-note-name=""></span>? The regional and global plans above cover <span data-note-it="">it</span> too, along with every other area they name. </p>
                <button class="plans-note__clear label" type="button" data-clear="">CLEAR SEARCH</button>
            </div>
            <nav class="pagination plans-pagination" aria-label="Pages" data-pages="" data-motion-reveal="1" style="">
                <button class="pagination__page" type="button" data-page="1" aria-current="page" aria-label="Page 1">1</button>
                <button class="pagination__page" type="button" data-page="2" aria-label="Page 2">2</button>
            </nav>
        </div>
    </section>
    <section class="section section--deep plans-regional rplans">
        <div class="container plans-regional__inner">
            <p class="eyebrow" data-motion-reveal="1" style="">REGIONAL PLANS</p>
            <p class="h4 plans-regional__statement" data-motion-reveal="1" style="">Travelling through more than one country? A regional plan covers every area it names, so the border is just another stop on the way.</p>
            <p class="h6 text-gold" data-motion-reveal="1" style="">Europe, Asia, Middle East and North Africa, Central Asia &amp; Global.</p>
            <a class="btn plans-regional__btn" href="plans.html?type=regional#all" data-see-regional="" data-motion-reveal="1" style="">SEE REGIONAL PLANS</a>
        </div>
    </section>
</main>

  <script src="data/catalogue.js"></script>
  <script src="js/store.js"></script>
<script src="js/ui.js"></script>
<script src="js/pages/plans.js"></script>
<?php include 'includes/footer.php'; ?>