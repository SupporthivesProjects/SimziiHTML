<?php include 'includes/header.php'; ?>

    <main>
      <section class="flow-header">
        <div class="container pad_left_right flow-header__inner">
          <div class="flow-header__copy" data-motion-reveal="1">
            <p class="eyebrow dif_sizet">CHECKOUT</p>
            <h1 class="flow-title">Almost there</h1>
          </div>
          <ol class="steps no_leftpad_t no_margin_bottom" aria-label="Purchase steps">
            <li class="steps__step" data-motion-reveal="1"><a href="cart.html"><span>01</span><span>CART</span></a></li>
            <li class="steps__rule" aria-hidden="true" data-motion-reveal="1"></li>
            <li class="steps__step" aria-current="step" data-motion-reveal="1"><span>02</span><span>CHECKOUT</span></li>
            <li class="steps__rule" aria-hidden="true" data-motion-reveal="1"></li>
            <li class="steps__step" data-motion-reveal="1"><span>03</span><span>PAYMENT</span></li>
          </ol>
        </div>
      </section>

      <form class="checkout container pad_left_right" id="checkout-form" novalidate="">
        <div class="checkout__details">
          <h2 class="h4">Your details</h2>
          <p class="body-sm text-pine">We send the eSIMs and the invoice to this email address.</p>
          <div class="field__row checkout__names">
            <div class="field">
              <label class="field__label" for="first-name">FIRST NAME</label>
              <input class="field__control" id="first-name" name="firstName" type="text" autocomplete="given-name"
                data-error="Enter your first name.">
            </div>
            <div class="field">
              <label class="field__label" for="last-name">LAST NAME</label>
              <input class="field__control" id="last-name" name="lastName" type="text" autocomplete="family-name"
                data-error="Enter your last name.">
            </div>
          </div>
          <div class="field">
            <label class="field__label" for="email">EMAIL</label>
            <input class="field__control" id="email" name="email" type="email" autocomplete="email"
              placeholder="name@example.com" data-error="Enter a full email address, like name@example.com.">
          </div>
          <div class="field">
            <label class="field__label" for="country">COUNTRY OF RESIDENCE</label>
            <select class="field__control" id="country" name="country" autocomplete="country-name" required=""
              data-error="Choose your country of residence.">
              <option value="" disabled="" selected="">Choose a country</option>
              <option>Afghanistan</option>
              <option>Åland Islands</option>
              <option>Albania</option>
              <option>Algeria</option>
              <option>American Samoa</option>
              <option>Andorra</option>
              <option>Angola</option>
              <option>Anguilla</option>
              <option>Antigua &amp; Barbuda</option>
              <option>Argentina</option>
              <option>Armenia</option>
              <option>Aruba</option>
              <option>Australia</option>
              <option>Austria</option>
              <option>Azerbaijan</option>
              <option>Bahamas</option>
              <option>Bahrain</option>
              <option>Bangladesh</option>
              <option>Barbados</option>
              <option>Belarus</option>
              <option>Belgium</option>
              <option>Belize</option>
              <option>Benin</option>
              <option>Bermuda</option>
              <option>Bhutan</option>
              <option>Bolivia</option>
              <option>Bosnia &amp; Herzegovina</option>
              <option>Botswana</option>
              <option>Brazil</option>
              <option>British Virgin Islands</option>
              <option>Brunei</option>
              <option>Bulgaria</option>
              <option>Burkina Faso</option>
              <option>Burundi</option>
              <option>Cambodia</option>
              <option>Cameroon</option>
              <option>Canada</option>
              <option>Cape Verde</option>
              <option>Cayman Islands</option>
              <option>Central African Republic</option>
              <option>Chad</option>
              <option>Chile</option>
              <option>China</option>
              <option>Colombia</option>
              <option>Comoros</option>
              <option>Congo - Brazzaville</option>
              <option>Congo - Kinshasa</option>
              <option>Cook Islands</option>
              <option>Costa Rica</option>
              <option>Côte d’Ivoire</option>
              <option>Croatia</option>
              <option>Cuba</option>
              <option>Curaçao</option>
              <option>Cyprus</option>
              <option>Czechia</option>
              <option>Denmark</option>
              <option>Djibouti</option>
              <option>Dominica</option>
              <option>Dominican Republic</option>
              <option>Ecuador</option>
              <option>Egypt</option>
              <option>El Salvador</option>
              <option>Equatorial Guinea</option>
              <option>Eritrea</option>
              <option>Estonia</option>
              <option>Eswatini</option>
              <option>Ethiopia</option>
              <option>Falkland Islands (Islas Malvinas)</option>
              <option>Faroe Islands</option>
              <option>Fiji</option>
              <option>Finland</option>
              <option>France</option>
              <option>French Guiana</option>
              <option>French Polynesia</option>
              <option>Gabon</option>
              <option>Gambia</option>
              <option>Georgia</option>
              <option>Germany</option>
              <option>Ghana</option>
              <option>Gibraltar</option>
              <option>Greece</option>
              <option>Greenland</option>
              <option>Grenada</option>
              <option>Guadeloupe</option>
              <option>Guam</option>
              <option>Guatemala</option>
              <option>Guernsey</option>
              <option>Guinea</option>
              <option>Guinea-Bissau</option>
              <option>Guyana</option>
              <option>Haiti</option>
              <option>Honduras</option>
              <option>Hong Kong</option>
              <option>Hungary</option>
              <option>Iceland</option>
              <option>India</option>
              <option>Indonesia</option>
              <option>Iran</option>
              <option>Iraq</option>
              <option>Ireland</option>
              <option>Isle of Man</option>
              <option>Israel</option>
              <option>Italy</option>
              <option>Jamaica</option>
              <option>Japan</option>
              <option>Jersey</option>
              <option>Jordan</option>
              <option>Kazakhstan</option>
              <option>Kenya</option>
              <option>Kiribati</option>
              <option>Kuwait</option>
              <option>Kyrgyzstan</option>
              <option>Laos</option>
              <option>Latvia</option>
              <option>Lebanon</option>
              <option>Lesotho</option>
              <option>Liberia</option>
              <option>Libya</option>
              <option>Liechtenstein</option>
              <option>Lithuania</option>
              <option>Luxembourg</option>
              <option>Macao</option>
              <option>Madagascar</option>
              <option>Malawi</option>
              <option>Malaysia</option>
              <option>Maldives</option>
              <option>Mali</option>
              <option>Malta</option>
              <option>Marshall Islands</option>
              <option>Martinique</option>
              <option>Mauritania</option>
              <option>Mauritius</option>
              <option>Mayotte</option>
              <option>Mexico</option>
              <option>Micronesia</option>
              <option>Moldova</option>
              <option>Monaco</option>
              <option>Mongolia</option>
              <option>Montenegro</option>
              <option>Montserrat</option>
              <option>Morocco</option>
              <option>Mozambique</option>
              <option>Myanmar (Burma)</option>
              <option>Namibia</option>
              <option>Nauru</option>
              <option>Nepal</option>
              <option>Netherlands</option>
              <option>New Caledonia</option>
              <option>New Zealand</option>
              <option>Nicaragua</option>
              <option>Niger</option>
              <option>Nigeria</option>
              <option>North Macedonia</option>
              <option>Norway</option>
              <option>Oman</option>
              <option>Pakistan</option>
              <option>Palau</option>
              <option>Palestine</option>
              <option>Panama</option>
              <option>Papua New Guinea</option>
              <option>Paraguay</option>
              <option>Peru</option>
              <option>Philippines</option>
              <option>Poland</option>
              <option>Portugal</option>
              <option>Puerto Rico</option>
              <option>Qatar</option>
              <option>Réunion</option>
              <option>Romania</option>
              <option>Russia</option>
              <option>Rwanda</option>
              <option>Samoa</option>
              <option>San Marino</option>
              <option>São Tomé &amp; Príncipe</option>
              <option>Saudi Arabia</option>
              <option>Senegal</option>
              <option>Serbia</option>
              <option>Seychelles</option>
              <option>Sierra Leone</option>
              <option>Singapore</option>
              <option>Sint Maarten</option>
              <option>Slovakia</option>
              <option>Slovenia</option>
              <option>Solomon Islands</option>
              <option>Somalia</option>
              <option>South Africa</option>
              <option>South Korea</option>
              <option>South Sudan</option>
              <option>Spain</option>
              <option>Sri Lanka</option>
              <option>St Kitts &amp; Nevis</option>
              <option>St Lucia</option>
              <option>St Vincent &amp; the Grenadines</option>
              <option>Sudan</option>
              <option>Suriname</option>
              <option>Sweden</option>
              <option>Switzerland</option>
              <option>Syria</option>
              <option>Taiwan</option>
              <option>Tajikistan</option>
              <option>Tanzania</option>
              <option>Thailand</option>
              <option>Timor-Leste</option>
              <option>Togo</option>
              <option>Tonga</option>
              <option>Trinidad &amp; Tobago</option>
              <option>Tunisia</option>
              <option>Türkiye</option>
              <option>Turkmenistan</option>
              <option>Turks &amp; Caicos Islands</option>
              <option>Tuvalu</option>
              <option>Uganda</option>
              <option>Ukraine</option>
              <option>United Arab Emirates</option>
              <option>United Kingdom</option>
              <option>United States</option>
              <option>Uruguay</option>
              <option>US Virgin Islands</option>
              <option>Uzbekistan</option>
              <option>Vanuatu</option>
              <option>Vatican City</option>
              <option>Venezuela</option>
              <option>Vietnam</option>
              <option>Yemen</option>
              <option>Zambia</option>
              <option>Zimbabwe</option>
            </select>
          </div>
          <div class="hand-off">
            <div class="hand-off__head">
              <h3 class="h5">Payment</h3>
              <div class="pay-marks"><img src="assets/icons/visa.svg" alt="Visa" data-motion-img="1"><img
                  src="assets/icons/mastercard.svg" alt="Mastercard" data-motion-img="1"></div>
            </div>
            <p class="body-sm text-pine">You will pay on our payment provider's secure page. Simzii never sees or stores
              your card details.</p>
          </div>
        </div>

        <aside class="summary-box checkout__summary" aria-labelledby="summary-title">
          <h2 class="h5" id="summary-title">Order summary</h2>
          <div class="checkout__rows" id="summary-lines">
            <div class="summary-row"><span class="summary-row__key">Japan, 10GB, 30 days</span><span
                class="summary-row__value"><span data-usd="9.4">$9.40</span></span></div>
            <div class="summary-row"><span class="summary-row__key">Europe, 5GB, 30 days</span><span
                class="summary-row__value"><span data-usd="22">$22.00</span></span></div>
            <div class="summary-row"><span class="summary-row__key">Middle East and North Africa, 5GB, 30
                days</span><span class="summary-row__value"><span data-usd="57">$57.00</span></span></div>
          </div>
          <div class="discount" id="discount">
            <div class="field discount__field">
              <label class="field__label" for="discount-code">DISCOUNT CODE</label>
              <input class="field__control" id="discount-code" type="text" autocomplete="off" placeholder="Enter code">
            </div>
            <button class="discount__btn" type="button" id="discount-apply">APPLY</button>
            <p class="field__error discount__error" id="discount-error" hidden="">That code is not valid.</p>
          </div>
          <div class="summary-rule"></div>
          <div class="checkout__rows" id="summary-totals">
            <div class="summary-row"><span class="summary-row__key">Subtotal</span><span
                class="summary-row__value"><span data-usd="88.4">$88.40</span></span></div>
            <div class="checkout__rows">
              <div class="summary-row"><span class="summary-row__key">Discount · SIMZII10</span><span
                  class="summary-row__value for_dis_color"><span data-usd="88.4">−$3.14</span></span></div>
              <div class="summary-row summary-row--total"><span class="summary-row__key">Total</span><span
                  class="summary-row__value summary-row__value--large" data-usd="88.4">$88.40</span></div>
            </div>

            <button class="btn btn--light btn--block btn--flow checkout__submit checkout__submit--desktop diff_colort"
              type="submit">CONTINUE TO SECURE PAYMENT</button>
        </aside>

        <div class="checkout__consent">
          <div class="checkout__check">
            <label class="checkbox" id="terms-box"><input type="checkbox" id="terms" name="terms"><span>I agree to the
                <a href="legal.html?doc=terms">Terms &amp; Conditions</a> and <a href="legal.html?doc=privacy">Privacy
                  Policy</a></span></label>
            <p class="field__error" id="terms-error" hidden="">Agree to the Terms &amp; Conditions to continue.</p>
          </div>
          <div class="checkout__check">
            <div class="recaptcha" id="recaptcha-box">
              <label><input type="checkbox" id="recaptcha" name="recaptcha">I'm not a robot</label>
              <div class="recaptcha__mark"><span>reCAPTCHA</span><span>Privacy · Terms</span></div>
            </div>
            <p class="field__error" id="recaptcha-error" hidden="">Tick the box to show you are not a robot.</p>
          </div>
        </div>

        <button class="btn btn--light btn--block btn--flow checkout__submit checkout__submit--mobile diff_colort"
          type="submit">CONTINUE TO SECURE PAYMENT</button>
      </form>
    </main>
<?php include 'includes/footer.php'; ?>