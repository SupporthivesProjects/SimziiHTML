
<?php include 'includes/header.php'; ?>
<main>
  <section class="contact">
    <img class="contact__fern" fetchpriority="high" src="assets/images/pages/contact-fern.jpg" alt="" width="1024" height="681" data-motion-img="1">
    <div class="container contact__grid">
      <div class="contact__copy" data-motion-reveal="1">
        <p class="eyebrow">CONTACT</p>
        <h1 class="contact__title">Talk to a person</h1>
        <p class="contact__lead">Questions about a plan, a phone or an order. Tell us where you are going and we will point you the right way.</p>
        <dl class="contact__details">
          <div class="contact-detail">
            <dt class="label text-gold">EMAIL</dt>
            <dd>
              <a href="mailto:info@simzii.com">info@simzii.com</a>
            </dd>
          </div>
          <div class="contact-detail">
            <dt class="label text-gold">PHONE</dt>
            <dd>
              <a href="tel:+78005005640">8 (800) 500-56-40</a>
            </dd>
          </div>
          <div class="contact-detail">
            <dt class="label text-gold">HOURS</dt>
            <dd>
              <span class="contact-detail__long">Monday to Friday, 9am to 6pm CET</span>
              <span class="contact-detail__short">Mon to Fri, 9am to 6pm CET</span>
            </dd>
          </div>
        </dl>
      </div>
      <div class="contact__panel" data-motion-reveal="1">
        <form class="contact-form" id="contact-form" novalidate="">
          <h2 class="contact-form__title">Send a message</h2>
          <div class="field__row contact-form__row">
            <div class="field">
              <label class="field__label" for="c-name">NAME</label>
              <input class="field__control" id="c-name" name="name" type="text" autocomplete="name" placeholder="John Smith" required="" data-error="Enter your full name.">
            </div>
            <div class="field">
              <label class="field__label" for="c-email">EMAIL</label>
              <input class="field__control" id="c-email" name="email" type="email" autocomplete="email" placeholder="name@example.com" required="" data-error="Enter a full email address, like name@example.com.">
            </div>
          </div>
          <div class="field">
            <label class="field__label" for="c-topic">TOPIC</label>
            <select class="field__control" id="c-topic" name="topic" required="" data-error="Choose a topic.">
              <option value="" disabled="" selected="">Choose a topic</option>
              <option>Getting started</option>
              <option>Installing</option>
              <option>Plans and top ups</option>
              <option>Payments and invoices</option>
            </select>
          </div>
          <div class="field">
            <label class="field__label" for="c-message">MESSAGE</label>
            <textarea class="field__control" id="c-message" name="message" placeholder="Which destination are you travelling to, and on which phone?" required="" data-error="Write your message."></textarea>
          </div>
          <div class="contact-form__check">
            <label class="checkbox">
              <input type="checkbox" name="terms" required="" data-error="Agree to the Terms &amp; Conditions to continue.">
              <span>I agree to the <a href="legal.html?doc=terms">Terms &amp; Conditions</a> and <a href="legal.html?doc=privacy">Privacy Policy</a>
              </span>
            </label>
          </div>
          <div class="contact-form__check">
            <div class="recaptcha">
              <label>
                <input type="checkbox" name="recaptcha" required="" data-error="Tick the box to show you are not a robot.">I'm not a robot </label>
              <div class="recaptcha__mark">
                <span>reCAPTCHA</span>
                <span>Privacy · Terms</span>
              </div>
            </div>
          </div>
          <button class="btn btn--light contact-form__submit" type="submit">SEND MESSAGE</button>
        </form>
      </div>
    </div>
    <div class="contact__badge" aria-hidden="true">
      <svg class="contact__badge-ring" viewBox="0 0 168 168" width="168" height="168">
        <defs>
          <path id="contact-badge-path" d="M84 84 m-72 0 a72 72 0 1 1 144 0 a72 72 0 1 1 -144 0"></path>
        </defs>
        <text>
          <textPath href="#contact-badge-path" textLength="448" lengthAdjust="spacing">SIMZII SUPPORT · WE READ EVERY MESSAGE ·</textPath>
        </text>
      </svg>
      <span class="contact__badge-mark"></span>
    </div>
  </section>
</main>

<?php include 'includes/footer.php'; ?>