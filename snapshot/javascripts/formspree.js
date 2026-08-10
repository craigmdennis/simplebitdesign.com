/**
 * Contact form -> Formspree.
 *
 * Why this file exists rather than a change inside app.js: app.js is a minified
 * 2016 bundle and the CoffeeScript toolchain that produced it no longer builds,
 * so its submit handler cannot be edited at source. This runs after app.js and
 * replaces that handler at runtime.
 *
 * Two things the old handler got wrong for this backend:
 *   1. It sent no `Accept: application/json`, so Formspree answers with a
 *      redirect to its own thank-you page instead of JSON. Cross-origin, the
 *      response is unreadable and the promise never resolves.
 *   2. It had no failure branch at all. Any error left the button stuck on
 *      "Sending..." forever — which is exactly how the form behaved after the
 *      move off the previous host started returning 405.
 *
 * The form keeps a real `action`, so submission still works without JavaScript.
 */
(function () {
  "use strict";

  var form = document.getElementById("contactform");
  if (!form) return;

  // Drop the bundled jQuery handler. Without this both fire and the form is
  // submitted twice.
  if (window.jQuery) window.jQuery(form).off("submit");

  function notice(kind, text) {
    var el = document.createElement("div");
    el.className = "c-notice c-notice--" + kind + " c-notice--fill c-notice--large";
    el.setAttribute("role", kind === "danger" ? "alert" : "status");
    el.textContent = text;
    return el;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var button = form.querySelector('button[type="submit"]');
    var original = button ? button.textContent : null;
    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }

    var existingError = form.parentNode.querySelector(".c-notice--danger");
    if (existingError) existingError.parentNode.removeChild(existingError);

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (!response.ok) {
          // Surface Formspree's own validation message when it sends one.
          return response
            .json()
            .catch(function () {
              return null;
            })
            .then(function (body) {
              var detail = body && body.errors && body.errors.length
                ? body.errors.map(function (e) { return e.message; }).join(", ")
                : null;
              throw new Error(detail || "That didn't send.");
            });
        }
        form.parentNode.insertBefore(
          notice("success", "Message sent! We'll be in touch soon."),
          form
        );
        form.parentNode.removeChild(form);
      })
      .catch(function (error) {
        // Always restore the button. The old handler's failure to do this is
        // what made a broken backend look like a hung page.
        if (button) {
          button.disabled = false;
          button.textContent = original;
        }
        form.parentNode.insertBefore(
          notice(
            "danger",
            error.message + " Please email craig@simplebitdesign.com instead."
          ),
          form
        );
      });
  });
})();
