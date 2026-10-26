<?php include 'includes/header.php'; ?>
<main class="auth">
  <div class="auth__photos" aria-hidden="true">
    <img class="auth__photo auth__photo--a" src="assets/images/pages/auth-misty-valley.jpg" alt="" data-motion-img="1">
    <img class="auth__photo auth__photo--b" src="assets/images/pages/auth-night-street.jpg" alt="" data-motion-img="1">
    <img class="auth__photo auth__photo--c" src="assets/images/pages/auth-snow-peak.jpg" alt="" data-motion-img="1">
    <img class="auth__photo auth__photo--d" src="assets/images/pages/auth-cloud-ridge.jpg" alt="" data-motion-img="1">
  </div>
  <form class="auth__card" data-auth="reset" novalidate="">
    <div class="auth__head">
      <p class="eyebrow eyebrow--deep">ACCOUNT</p>
      <h1 class="h3 auth__title">Set a new password</h1>
      <p class="auth__lead">Use at least 8 characters.</p>
    </div>
    <div class="field">
      <label class="field__label" for="new-password">NEW PASSWORD</label>
      <input class="field__control" id="new-password" name="password" type="password" autocomplete="new-password" placeholder="••••••••••••" data-rule="min8" data-error="Use at least 8 characters.">
    </div>
    <div class="field">
      <label class="field__label" for="confirm-password">CONFIRM NEW PASSWORD</label>
      <input class="field__control" id="confirm-password" name="confirm" type="password" autocomplete="new-password" placeholder="••••••••••••" data-rule="match:new-password" data-error="The passwords do not match.">
    </div>
    <button class="btn btn--gold btn--block" type="submit">SAVE NEW PASSWORD</button>
  </form>
</main>
<?php include 'includes/footer.php'; ?>