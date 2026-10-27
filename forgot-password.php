
<?php include 'includes/header.php'; ?>

<main class="auth">
  <div class="auth__photos" aria-hidden="true">
    <img class="auth__photo auth__photo--a" src="assets/images/pages/auth-kyoto-street.jpg" alt="" data-motion-img="1">
    <img class="auth__photo auth__photo--b" src="assets/images/pages/about-story-window.jpg" alt="" data-motion-img="1">
    <img class="auth__photo auth__photo--c" src="assets/images/pages/about-everywhere.jpg" alt="" data-motion-img="1">
    <img class="auth__photo auth__photo--d" src="assets/images/pages/about-train.jpg" alt="" data-motion-img="1">
  </div>

  <form class="auth__card" data-auth="forgot" novalidate="">
    <div class="auth__head">
      <p class="auth-eyebrow">ACCOUNT</p>
      <h1 class="auth__title">Reset your password</h1>
      <p class="auth__lead">Enter the email on your account and we will send you a link to set a new password.</p>
    </div>
    <div class="field">
      <label class="field__labels" for="email">EMAIL</label>
      <input class="field__control" id="email" name="email" type="email" autocomplete="email" placeholder="name@example.com" data-rule="email" data-error="Enter a full email address, like name@example.com.">
    </div>
    <button class="btn auth-btn--gold" type="submit">SEND RESET LINK</button>
    <div class="auth__switch">
      <p>Remembered it?</p>
      <a class="auth__link" href="login.html">BACK TO LOG IN</a>
    </div>
  </form>
</main>

<?php include 'includes/footer.php'; ?>