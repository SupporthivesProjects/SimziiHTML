<?php
  $currentPage = basename($_SERVER['PHP_SELF']);
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simzii</title>

    <link rel="icon" type="image/svg+xml" href="./img/tg-icon.svg">
    <link rel="stylesheet" href="./devcss/mainBase.css">
    <script src="js/motion.js"></script>
  </head>
  <body>
  
  <div class="main-div">
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
        <a class="btn btn--gold btn--small" href="login.html">MY ACCOUNT</a>
      </nav>
      <div class="site-header__actions">
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
          <img src="assets/icons/menu.svg" alt="" data-motion-img="1">
        </button>
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
      <a class="btn btn--gold btn--block" href="login.html">MY ACCOUNT</a>
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
  
  