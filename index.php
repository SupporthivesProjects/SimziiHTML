
<?php include 'includes/header.php'; ?>
<section class="hero" id="hero">
  <div class="plate">
    <div class="plate-in" data-speed="-7" data-self="" style="transform: translate3d(0px, 438.9px, 0px);">
      <div class="poster"></div>
      <video id="film" muted="" playsinline="" loop="" preload="none" data-src="assets/video/simzii-hero-fog.mp4"></video>
      <canvas id="forest" aria-hidden="true" data-engine="three.js r160" width="1837" height="865" class="on"></canvas>
      <canvas id="back" aria-hidden="true" width="1323" height="623"></canvas>
    </div>
  </div>
  <div class="h-ov"></div>
  <div class="h-fade"></div>
  <div class="h-wash"></div>
  <div class="h-frame" style="opacity: 0;"></div>
  <div data-partial="header">
    <header class="site-header" id="site-header">
      <div class="site-header__bar">
        <a class="logo" href="index.html" aria-label="Simzii home">SIMZII</a>
        <nav class="site-nav" aria-label="Main">
          <a class="site-nav__link" href="plans.html">DESTINATIONS</a>
          <a class="site-nav__link" href="plans.html?type=regional#all">REGIONS</a>
          <a class="site-nav__link" href="index.html#how">HOW IT WORKS</a>
          <a class="site-nav__link" href="help.html">SUPPORT</a>
          <div class="currency" data-currency="">
            <button class="currency__toggle" type="button" aria-haspopup="listbox" aria-expanded="false">$ USD</button>
            <div class="currency__list" role="listbox" aria-label="Currency">
              <button class="currency__option" type="button" role="option" data-set-currency="USD" aria-selected="true">$ USD</button>
              <button class="currency__option" type="button" role="option" data-set-currency="EUR" aria-selected="false">€ EUR</button>
              <button class="currency__option" type="button" role="option" data-set-currency="GBP" aria-selected="false">£ GBP</button>
            </div>
          </div>
          <a class="account-link" href="account.html">
            <span class="account-link__avatar">JS</span>MY ACCOUNT </a>
        </nav>
        <div class="site-header__actions">
          <button class="menu-toggle menu-toggle--text" type="button" aria-expanded="false" aria-controls="mobile-menu">MENU</button>
        </div>
      </div>
      <div class="mobile-menu" id="mobile-menu">
        <nav class="mobile-menu__links" aria-label="Main">
          <a class="mobile-menu__link" href="plans.html">Destinations <img src="assets/icons/arrow-right-gold.svg" alt="" data-motion-img="1">
          </a>
          <a class="mobile-menu__link" href="plans.html?type=regional#all">Regions <img src="assets/icons/arrow-right-gold.svg" alt="" data-motion-img="1">
          </a>
          <a class="mobile-menu__link" href="index.html#how">How it works <img src="assets/icons/arrow-right-gold.svg" alt="" data-motion-img="1">
          </a>
          <a class="mobile-menu__link" href="help.html">Support <img src="assets/icons/arrow-right-gold.svg" alt="" data-motion-img="1">
          </a>
        </nav>
        <div class="mobile-menu__utilities">
          <p class="label text-mist">CURRENCY</p>
          <div class="mobile-menu__currencies">
            <button class="mobile-menu__currency" type="button" data-set-currency="USD" aria-pressed="true">$ USD</button>
            <button class="mobile-menu__currency" type="button" data-set-currency="EUR" aria-pressed="false">€ EUR</button>
            <button class="mobile-menu__currency" type="button" data-set-currency="GBP" aria-pressed="false">£ GBP</button>
          </div>
        </div>
        <a class="btn btn--gold btn--block" href="account.html">MY ACCOUNT</a>
        <div class="socials mobile-menu__socials">
          <a class="socials__link" href="#" data-pending="Social link to be supplied" aria-label="Instagram">
            <img src="assets/icons/instagram.svg" alt="" width="14" height="14" data-motion-img="1">
          </a>
          <a class="socials__link" href="#" data-pending="Social link to be supplied" aria-label="TikTok">
            <img src="assets/icons/tiktok.svg" alt="" width="14" height="14" data-motion-img="1">
          </a>
          <a class="socials__link" href="#" data-pending="Social link to be supplied" aria-label="X">
            <img src="assets/icons/x.svg" alt="" width="14" height="14" data-motion-img="1">
          </a>
        </div>
      </div>
    </header>
  </div>
  <div class="h-copy" data-speed="-9" data-self="" style="opacity: 0; transform: translate3d(0px, 516.53px, 0px);">
    <p class="eyebrow rise" style="--d:.3s">TRAVEL eSIM</p>
    <h1 class="h1">
      <span class="ln">
        <span style="--d:.35s">MOBILE DATA</span>
      </span>
      <span class="ln">
        <span style="--d:.47s">IN <span data-fact="global:areaCount">124</span> COUNTRIES </span>
      </span>
    </h1>
    <div class="rule"></div>
    <p class="sub rise" style="--d:.7s">Pick your destination, select your data plan and duration, then install the eSIM directly from your phone. Mobile data for wherever you travel, with no need for physical SIM cards or complicated setups.</p>
    <a href="plans.html" class="btn rise" style="--d:.82s">BROWSE DESTINATIONS</a>
  </div>
  <div class="strip" data-speed="-9" data-self="" style="opacity: 0; transform: translate3d(0px, 564.3px, 0px);">
    <div class="rail"></div>
    <div class="runner"></div>
    <div class="stop">
      <div class="fig" data-fact="global:areaCount">124</div>
      <div class="dot"></div>
      <div class="lab">COUNTRIES</div>
    </div>
    <div class="stop">
      <div class="fig" data-fact="all:regionCount">5</div>
      <div class="dot"></div>
      <div class="lab">REGIONS</div>
    </div>
    <div class="stop">
      <div class="fig">Up to <span data-fact="all:maxPlans">12</span>
      </div>
      <div class="dot"></div>
      <div class="lab">PLANS PER DESTINATION</div>
    </div>
    <div class="stop">
      <div class="fig">USD EUR GBP</div>
      <div class="dot"></div>
      <div class="lab">CURRENCIES</div>
    </div>
  </div>
</section>
<section class="intro" id="intro">
  <div class="rot fern-a" data-speed="0.6">
    <div>
      <img alt="" src="assets/images/home/fern-intro.webp">
    </div>
  </div>
  <div class="rot fern-b" data-speed="-0.6">
    <div>
      <img alt="" src="assets/images/home/fern-intro-low.webp">
    </div>
  </div>
  <div class="rot plant fl" data-speed="0.9">
    <div>
      <img alt="" src="assets/images/home/plant.webp">
    </div>
  </div>
  <div class="monstera fl" data-speed="-0.8">
    <img alt="" src="assets/images/home/monstera.webp">
  </div>
  <div class="pics">
    <div class="media fl i-trav" data-speed="-0.7" data-r="clip">
      <img alt="Traveller photographing a mountain valley" src="assets/images/home/intro-traveller.webp">
    </div>
    <div class="media fl i-snow" data-speed="-1.1" data-r="clip" style="--d:.15s">
      <img alt="Snow covered peak" src="assets/images/home/snow-peak.webp">
    </div>
  </div>
  <div class="media fl i-alps" data-speed="0.9" data-r="clip" style="--d:.1s">
    <img alt="Alpine valley at sunrise" src="assets/images/home/spot-alps.webp">
  </div>
  <div class="media fl i-stage" data-speed="0.7" data-r="clip" style="--d:.2s">
    <img alt="Misty mountain slope" src="assets/images/home/stage-landscape.webp">
  </div>
  <div class="i-copy" data-r="group">
    <p class="eyebrow" data-r="fade">WHY SIMZII</p>
    <h2 class="h2">
      <span class="ln">
        <span style="--d:.05s">One store for every</span>
      </span>
      <span class="ln">
        <span style="--d:.15s">destination you travel to</span>
      </span>
    </h2>
    <div class="rule" data-r="fade" style="--d:.25s"></div>
    <p class="body" data-r="fade" style="--d:.3s">Simzii sells prepaid travel eSIMs for single countries and for whole regions. You pick the destination, pick how much data you want and how many days it runs for, and the eSIM installs from your phone by QR code.</p>
    <div class="feats" data-r="fade" style="--d:.4s">
      <div class="feat">
        <i class="diamond"></i>Country plans and regional plans
      </div>
      <div class="feat">
        <i class="diamond"></i>Up to <span data-fact="all:maxPlans"></span> plans per destination, or build your own
      </div>
    </div>
    <a href="#how" class="btn" data-r="fade" style="--d:.5s">HOW IT WORKS</a>
  </div>
</section>
<section class="dest" id="dest">
  <div class="head-row">
    <div class="copy in" data-r="group">
      <p class="eyebrow in" data-r="fade">DESTINATIONS</p>
      <h2 class="h2">
        <span class="ln">
          <span style="--d:.08s">Popular right now</span>
        </span>
      </h2>
    </div>
    <div class="counter in" data-r="fade" style="--d:.2s">
      <button class="arrow" id="prev" aria-label="Previous destination">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="arrow / prev">
            <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#C2A15A" stroke-opacity="0.4"></rect>
            <path id="icons/arrow left" d="M32 24H16M21 29L16 24L21 19" stroke="#C2A15A" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
          </g>
        </svg>
      </button>
      <span id="count">01 / 04</span>
      <button class="arrow" id="next" aria-label="Next destination">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="arrow / next">
            <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#C2A15A" stroke-opacity="0.4"></rect>
            <path id="icons/arrow right" d="M16 24H32M27 29L32 24L27 19" stroke="#C2A15A" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
          </g>
        </svg>
      </button>
    </div>
  </div>
  <div class="track-wrap">
    <div class="track" id="track">
      <a href="plan.html?d=turkey" class="card in" data-r="fade">
        <div class="media" data-inner="">
          <img alt="Istanbul skyline over the Bosphorus" src="assets/images/home/card-turkey.webp" data-motion-img="1" style="transform: translate3d(0px, 4.8px, 0px);">
        </div>
        <h3>Turkey</h3>
        <div class="meta">
          <span data-plan-count="turkey">12 plans</span>
          <span data-from="turkey">From $0.60</span>
        </div>
      </a>
      <a href="plan.html?d=thailand" class="card in" data-r="fade" style="--d:0.08s">
        <div class="media" data-inner="">
          <img alt="Temple ruins in Ayutthaya" src="assets/images/home/card-thailand.webp" data-motion-img="1" style="transform: translate3d(0px, 4.8px, 0px);">
        </div>
        <h3>Thailand</h3>
        <div class="meta">
          <span data-plan-count="thailand">12 plans</span>
          <span data-from="thailand">From $0.60</span>
        </div>
      </a>
      <a href="plan.html?d=japan" class="card in" data-r="fade" style="--d:0.16s">
        <div class="media" data-inner="">
          <img alt="Neon lit alley in Tokyo" src="assets/images/home/card-japan.webp" data-motion-img="1" style="transform: translate3d(0px, 4.8px, 0px);">
        </div>
        <h3>Japan</h3>
        <div class="meta">
          <span data-plan-count="japan">12 plans</span>
          <span data-from="japan">From $0.60</span>
        </div>
      </a>
      <a href="plan.html?d=italy" class="card in" data-r="fade" style="--d:0.24s">
        <div class="media" data-inner="">
          <img alt="Traveller in an Italian doorway" src="assets/images/home/card-italy.webp" data-motion-img="1" style="transform: translate3d(0px, 4.8px, 0px);">
        </div>
        <h3>Italy</h3>
        <div class="meta">
          <span data-plan-count="italy">12 plans</span>
          <span data-from="italy">From $0.80</span>
        </div>
      </a>
    </div>
  </div>
</section>
<section class="route" id="route">
  <div class="bg">
    <div class="media" data-inner>
      <img alt="" src="assets/images/home/route-mist.webp">
    </div>
  </div>
  <div class="head" data-r="group">
    <p class="eyebrow" data-r="fade">REGIONAL PLANS</p>
    <h2 class="h2">
      <span class="ln">
        <span style="--d:.08s">One plan for multiple destinations</span>
      </span>
    </h2>
    <p class="lead" data-r="fade" style="--d:.2s">A regional plan covers every area it names. Cross a border and nothing changes: same data, same days, same balance, no second purchase.</p>
  </div>
  <div class="proof">
    <div class="plan" data-r="fade">
      <div class="ph">
        <p class="tag">MOST BOUGHT REGION</p>
        <p class="name">Europe</p>
        <p class="sub">
          <span data-fact="europe:areaLabel"></span> on one plan
        </p>
      </div>
      <div class="spec">
        <span>Plans</span>
        <span data-fact="europe:planCount"></span>
      </div>
      <div class="spec">
        <span>Data</span>
        <span data-fact="europe:dataRange"></span>
      </div>
      <div class="spec">
        <span>Validity</span>
        <span data-fact="europe:daysRange"></span>
      </div>
      <div class="spec">
        <span>From</span>
        <span class="dg" data-from="europe" data-bare></span>
      </div>
      <a href="plan.html?d=europe" class="btn">SEE EUROPE PLANS</a>
    </div>
    <div class="areas" data-r="fade" style="--d:.12s">
      <div class="label-row">
        <p class="tag">EVERY AREA ON THE EUROPE PLAN</p>
        <i></i>
      </div>
      <div class="cols">
        <div>
          <span>Albania</span>
          <span>Austria</span>
          <span>Belgium</span>
          <span>Bulgaria</span>
          <span>Croatia</span>
          <span>Cyprus</span>
          <span>Czech Republic</span>
          <span>Denmark</span>
          <span>Estonia</span>
          <span>Finland</span>
        </div>
        <div>
          <span>France</span>
          <span>Germany</span>
          <span>Gibraltar</span>
          <span>Greece</span>
          <span>Hungary</span>
          <span>Iceland</span>
          <span>Ireland</span>
          <span>Italy</span>
          <span>Latvia</span>
          <span>Liechtenstein</span>
        </div>
        <div>
          <span>Lithuania</span>
          <span>Luxembourg</span>
          <span>Malta</span>
          <span>Moldova</span>
          <span>Netherlands</span>
          <span>North Macedonia</span>
          <span>Norway</span>
          <span>Poland</span>
          <span>Portugal</span>
          <span>Romania</span>
        </div>
        <div>
          <span>Serbia</span>
          <span>Slovakia</span>
          <span>Slovenia</span>
          <span>Spain</span>
          <span>Sweden</span>
          <span>Switzerland</span>
          <span>Turkey</span>
          <span>Ukraine</span>
          <span>United Kingdom</span>
          <span>Vatican City</span>
        </div>
      </div>
      <p class="note">Plus Åland, Faroe Islands, Guernsey, Jersey and the Isle of Man.</p>
    </div>
  </div>
  <div class="incl" data-r="fade">
    <div class="incl-head">WHAT THE PLAN INCLUDES <i class="diamond"></i>
    </div>
    <div class="incl-cols">
      <div>
        <i class="diamond"></i>Data across all <span data-fact="europe:areaLabel"></span>
      </div>
      <div>
        <i class="diamond"></i>
        <span data-fact="europe:planWord"></span> plans to choose from
      </div>
      <div>
        <i class="diamond"></i>Or build your own amount
      </div>
      <div>
        <i class="diamond"></i>Install by QR code
      </div>
      <div>
        <i class="diamond"></i>Your usual SIM keeps working
      </div>
      <div>
        <i class="diamond"></i>Top up from your account
      </div>
      <div>
        <i class="diamond"></i>Pay in USD, EUR or GBP
      </div>
      <div>
        <i class="diamond"></i>Help centre, any hour
      </div>
      <div>
        <i class="diamond"></i>Invoices in your account
      </div>
    </div>
  </div>
</section>
<section class="how" id="how">
  <div class="media bgimg" data-inner>
    <img alt="" src="assets/images/home/trail-landscape.webp">
  </div>
  <div class="fade"></div>
  <div class="trail" id="trail">
    <svg class="path" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <mask id="trailMask">
          <path id="trailDraw" d="M0 540C100 520 200 480 300 460C420 436 520 440 620 410C740 376 800 310 920 280C1030 254 1130 220 1240 170C1320 136 1390 100 1440 80" stroke="#fff" stroke-width="6" fill="none" />
        </mask>
      </defs>
      <path d="M0 540C100 520 200 480 300 460C420 436 520 440 620 410C740 376 800 310 920 280C1030 254 1130 220 1240 170C1320 136 1390 100 1440 80" stroke="#C2A15A" stroke-dasharray="6 9" fill="none" mask="url(#trailMask)" />
    </svg>
    <i class="tm" style="left:calc(294 * var(--s)); top:calc(454 * var(--s))"></i>
    <i class="tm" style="left:calc(614 * var(--s)); top:calc(404 * var(--s))"></i>
    <i class="tm" style="left:calc(914 * var(--s)); top:calc(274 * var(--s))"></i>
    <i class="tm" style="left:calc(1234 * var(--s)); top:calc(164 * var(--s))"></i>
    <div class="step" style="left:calc(294 * var(--s)); top:calc(492 * var(--s))">
      <div class="num">01</div>
      <h3>Find your destination</h3>
      <p>We call it a destination, you call it a holiday. Search it and see every plan that covers it.</p>
    </div>
    <div class="step" style="left:calc(614 * var(--s)); top:calc(442 * var(--s))">
      <div class="num">02</div>
      <h3>Choose your plan</h3>
      <p>Pick the data and the days, or set your own amount on the custom plan.</p>
    </div>
    <div class="step" style="left:calc(914 * var(--s)); top:calc(312 * var(--s))">
      <div class="num">03</div>
      <h3>Pay and receive</h3>
      <p>Pay, and the eSIM lands in your account as a QR code.</p>
    </div>
    <div class="step" style="left:calc(1234 * var(--s)); top:calc(202 * var(--s))">
      <div class="num">04</div>
      <h3>Scan and travel</h3>
      <p>Scan it on your phone. Top up from your account whenever the data runs low.</p>
    </div>
  </div>
  <div class="head" data-r="group">
    <p class="eyebrow" data-r="fade">STEPS</p>
    <h2 class="h2">
      <span class="ln">
        <span style="--d:.08s">How it works</span>
      </span>
    </h2>
    <p data-r="fade" style="--d:.18s">The same four steps on every destination.</p>
    <a href="plans.html" class="btn" data-r="fade" style="--d:.26s">SEE THE PLANS</a>
  </div>
</section>
<section class="faq" id="faq">
  <div class="copy">
    <div class="head" data-r="group">
      <p class="eyebrow" data-r="fade">F.A.Q</p>
      <h2 class="h2">
        <span class="ln">
          <span style="--d:.08s">Popular questions</span>
        </span>
      </h2>
    </div>
    <div class="acc" id="acc" data-r="fade" style="--d:.15s">
      <div class="qa">
        <button>
          <i class="diamond"></i>What is an eSIM? </button>
        <div class="ans">
          <div>
            <p>An eSIM is a SIM built into your phone. Instead of a plastic card, you install a plan by scanning a QR code, and it sits beside your usual SIM.</p>
          </div>
        </div>
      </div>
      <div class="qa">
        <button>
          <i class="diamond"></i>How do I install my eSIM? </button>
        <div class="ans">
          <div>
            <p>Once you pay, the QR code lands in your account. Open your phone's mobile data settings, add an eSIM, scan the code and switch it on when you arrive.</p>
          </div>
        </div>
      </div>
      <div class="qa">
        <button>
          <i class="diamond"></i>Will my normal SIM still work? </button>
        <div class="ans">
          <div>
            <p>Yes. Your usual number stays where it is for calls and texts. The eSIM only carries the data.</p>
          </div>
        </div>
      </div>
      <div class="qa">
        <button>
          <i class="diamond"></i>Which devices support eSIM? </button>
        <div class="ans">
          <div>
            <p>Most phones from the last few years do, including recent iPhone, Pixel and Galaxy models. Check the compatibility list before you buy.</p>
          </div>
        </div>
      </div>
      <div class="qa open">
        <button>
          <i class="diamond"></i>Can I use one plan in more than one country? </button>
        <div class="ans">
          <div>
            <p>Country plans cover the one country they are named for. Regional plans cover every area listed on the plan, so a Europe plan runs across all <span data-fact="europe:areaLabel"></span> it names, and a Global plan runs across <span data-fact="global:areaCount"></span>. If you are crossing borders, the regional plan is usually the cheaper of the two. </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="media side" data-inner data-r="clip">
    <img alt="Cloud rolling over a forested mountain" src="assets/images/home/stage-landscape.webp">
  </div>
</section>

<?php include 'includes/footer.php'; ?>