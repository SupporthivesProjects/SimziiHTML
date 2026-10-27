
<?php include 'includes/header.php'; ?>
<main class="auth">
  <div class="auth__photos" aria-hidden="true">
    <img class="auth__photo auth__photo--a" src="assets/images/pages/auth-misty-valley.jpg" alt="" data-motion-img="1">
    <img class="auth__photo auth__photo--b" src="assets/images/pages/auth-night-street.jpg" alt="" data-motion-img="1">
    <img class="auth__photo auth__photo--c" src="assets/images/pages/auth-snow-peak.jpg" alt="" data-motion-img="1">
    <img class="auth__photo auth__photo--d" src="assets/images/pages/auth-cloud-ridge.jpg" alt="" data-motion-img="1">
  </div>
  <form class="auth__card" data-auth="signup" novalidate="">
    <div class="auth__head">
      <p class="auth-eyebrow">NEW HERE</p>
      <h1 class="auth__title">Create an account</h1>
      <p class="auth__lead">Your eSIMs, top ups and invoices, all in one place.</p>
    </div>
    <div class="field">
      <label class="field__labels" for="name">FULL NAME</label>
      <input class="field__control" id="name" name="name" type="text" autocomplete="name" placeholder="John Smith" data-rule="required" data-error="Enter your full name.">
    </div>
    <div class="field">
      <label class="field__labels" for="email">EMAIL</label>
      <input class="field__control" id="email" name="email" type="email" autocomplete="email" placeholder="name@example.com" data-rule="email" data-error="Enter a full email address, like name@example.com.">
    </div>
    <div class="field">
      <label class="field__labels" for="password">PASSWORD</label>
      <input class="field__control" id="password" name="password" type="password" autocomplete="new-password" placeholder="••••••••••••" data-rule="min8" data-error="Use at least 8 characters.">
    </div>
    <label class="checkbox">
      <input type="checkbox" name="terms" data-rule="checked">
      <span>I agree to the <a href="legal.html?doc=terms">Terms &amp; Conditions</a> and <a href="legal.html?doc=privacy">Privacy Policy</a>
      </span>
    </label>
      <img src="assets/images/recaptcha.png" alt="" style="width:304px">
    <button class="btn auth-btn--gold" type="submit">CREATE ACCOUNT</button>
    <div class="auth__switch">
      <p>Already have an account?</p>
      <a class="auth__link" href="login.html">LOG IN</a>
    </div>
  </form>
</main>

<?php include 'includes/footer.php'; ?>