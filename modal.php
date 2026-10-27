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
    <button class="btn btn--gold btn--block" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">SAVE NEW PASSWORD</button>
  </form>
</main>


<!-- Modal -->
        <div class="modal fade  mod-fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered mod-cen ">
                <div class="modal-content login_modal">
                    <button type="button" aria-label="Close" data-bs-dismiss="modal" class="mod-cross">
                        <img src="assets/icons/close.svg" alt="" width="16" height="16">
                    </button>
                    <div class="log_modal_div">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="19" viewBox="0 0 26 19" fill="none">
                           <path d="M0.75 9.75L8.75 17.75L24.75 0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="#7C6224"/>
                        </svg>
                    </div>
                    <div class="mod-text">
                      <h2 class="log_modal_head" id="exampleModalLabel">Check your inbox</h2>
                      <p class="log_modal_p">If an account exists for that address, we have sent a link to set a new password.</p>
                    </div>
                    <a class="btn log_btn w-100" href="index.php">BACK TO LOG IN</a>

                </div>
            </div>
        </div>
<?php include 'includes/footer.php'; ?>