
<?php include 'includes/header.php'; ?>
<main class="auth">
  <div class="auth__photos" aria-hidden="true">
    <img class="auth__photo auth__photo--a" src="assets/images/pages/auth-kyoto-street.jpg" alt="" data-motion-img="1">
    <img class="auth__photo auth__photo--b" src="assets/images/pages/about-story-window.jpg" alt="" data-motion-img="1">
    <img class="auth__photo auth__photo--c" src="assets/images/pages/about-everywhere.jpg" alt="" data-motion-img="1">
    <img class="auth__photo auth__photo--d" src="assets/images/pages/about-train.jpg" alt="" data-motion-img="1">
  </div>
  <form class="auth__card" data-auth="login" novalidate="">
    <div class="auth__head">
      <p class="auth-eyebrow">WELCOME BACK</p>
      <h1 class="auth__title">Log in</h1>
    </div>
    <div class="field">
      <label class="field__labels" for="email">EMAIL</label>
      <input class="field__control" id="email" name="email" type="email" autocomplete="email" placeholder="name@example.com" data-rule="email" data-error="Enter a full email address, like name@example.com.">
    </div>
    <div class="field">
      <label class="field__labels" for="password">PASSWORD</label>
      <input class="field__control" id="password" name="password" type="password" autocomplete="current-password" placeholder="••••••••••••" data-rule="required" data-error="Enter your password.">
    </div>
    <a class="auth__link auth__forgot" href="forgot-password.html">FORGOT PASSWORD?</a>
    <button class="btn auth-btn--gold" type="submit">LOG IN</button>
    <div class="auth__switch">
      <p>New to Simzii?</p>
      <a class="auth__link" href="sign-up.html">CREATE AN ACCOUNT</a>
    </div>
  </form>
</main>

<?php include 'includes/footer.php'; ?>