            <footer class="site-footer">
            <div class="container">
                <div class="site-footer__columns">
                <div class="site-footer__brand">
                    <a class="logo logo--large" href="index.html">SIMZII</a>
                    <p>Prepaid travel eSIMs for single countries and whole regions.</p>
                </div>
                <div class="site-footer__pair">
                    <div class="site-footer__column">
                    <p class="site-footer__heading">QUICK LINKS</p>
                    <div class="site-footer__links">
                        <a href="plans.html">Destinations</a>
                        <a href="plans.html?type=regional#all">Regions</a>
                        <a href="index.html#how">How it works</a>
                        <a href="about.html">About us</a>
                    </div>
                    </div>
                    <div class="site-footer__column">
                    <p class="site-footer__heading">SUPPORT</p>
                    <div class="site-footer__links">
                        <a href="help.html">Help centre</a>
                        <a href="compatibility.html">Compatibility</a>
                        <a href="contact.html">Contact us</a>
                        <a href="login.html">My account</a>
                    </div>
                    </div>
                </div>
                <div class="site-footer__column">
                    <p class="site-footer__heading">CONTACTS</p>
                    <div class="site-footer__links">
                    <a href="mailto:info@simzii.com">info@simzii.com</a>
                    <a href="tel:+78005005640">8 (800) 500-56-40</a>
                    <a href="legal.html?doc=terms">Terms &amp; Conditions</a>
                    <a href="legal.html?doc=privacy">Privacy Policy</a>
                    </div>
                </div>
                </div>
                <div class="site-footer__rule"></div>
                <div class="site-footer__bottom">
                <div class="socials "><a class="socials__link" href="#" data-pending="Social link to be supplied" aria-label="Instagram"><img src="assets/icons/instagram.svg" alt="" width="14" height="14" loading="lazy" decoding="async" data-motion-img="1" class=""></a><a class="socials__link" href="#" data-pending="Social link to be supplied" aria-label="TikTok"><img src="assets/icons/tiktok.svg" alt="" width="14" height="14" loading="lazy" decoding="async" data-motion-img="1" class=""></a><a class="socials__link" href="#" data-pending="Social link to be supplied" aria-label="X"><img src="assets/icons/x.svg" alt="" width="14" height="14" loading="lazy" decoding="async" data-motion-img="1" class=""></a></div>
                <p class="site-footer__copyright">© 2026 Simzii. All rights reserved.</p>
                <div class="pay-marks"><img src="assets/icons/visa.svg" alt="Visa" width="46" height="32" loading="lazy" decoding="async" data-motion-img="1" class=""><img src="assets/icons/mastercard.svg" alt="Mastercard" width="46" height="32" loading="lazy" decoding="async" data-motion-img="1" class=""></div>
                </div>
            </div>
            </footer>
        </div>
        <div class="popup" id="popup-sent" hidden role="dialog" aria-modal="true" aria-labelledby="popup-sent-title">
            <div class="popup__overlay"></div>
            <div class="popup__dialog">
                <button class="popup__close" type="button" data-popup-close="" aria-label="Close"><img src="assets/icons/close.svg" alt="" data-motion-img="1"></button>
                <img class="popup__mark" src="assets/icons/mark-check.svg" alt="" data-motion-img="1">
                <h2 class="popup__title" id="popup-sent-title">Message sent</h2>
                <p class="popup__body">Thanks for writing. We reply by email, usually within one working day.</p>
                <a class="btn btn--light" href="index.html">BACK TO HOME</a>
            </div>
        </div>
        
        <script src="uiframe/js/jquery.min.js"></script>
        <script src="uiframe/js/bootstrap.bundle.min.js"></script>
        <script src="uiframe/js/popper.min.js"></script>
        <script src="uiframe/js/slick.js"></script>
        <script src="uiframe/js/owl.carousel.js"></script>
        <script src="uiframe/js/swiper-bundle.min.js"></script>
        <script src="uiframe/js/flickity.pkgd.min.js"></script>   
        <script src="uiframe/js/aos.js"></script>
        <script src="./uiframe/js/home-js.js"></script>
        <script src="js/ui.js"></script>  
        <script src="js/vendor-three.min.js"></script>
        <script src="js/home-data.js"></script>     
        <script src="js/partials.js"></script>
        <script src="js/pages/help.js"></script>

        <script>
            $(document).ready(function () {
            $(".navbar-toggler").click(function () {
                $(this).toggleClass("is-active");
                $(".navbar-expand-lg").toggleClass("header-is-active");
            });
        });
        </script>
        <script>
        window.addEventListener('scroll', function() {
            var content = document.querySelector('header');
            var scrollPosition = window.scrollY;
            if (scrollPosition > 10) {
                content.classList.add("header-scroll")
            } else {
                content.classList.remove("header-scroll")
            }
        });
        </script>
        <script>
        AOS.init();
        </script>
   </body>
</html>