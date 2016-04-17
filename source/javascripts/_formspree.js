var Spinner = require('spin.js')

var opts = {
  lines: 13, // The number of lines to draw
  length: 28, // The length of each line
  width: 14, // The line thickness
  radius: 42, // The radius of the inner circle
  scale: 0.1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: '#FFF', // #rgb or #rrggbb or array of colors
  opacity: 0.25, // Opacity of the lines
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: '50%', // Top position relative to parent
  left: false, // Left position relative to parent
  shadow: false, // Whether to render a shadow
  hwaccel: true, // Whether to use hardware acceleration
  position: 'absolute' // Element positioning
}
var spinner = new Spinner(opts).spin()
var $contactForm = $('#formspree');
var $fields = $contactForm.find('input','textarea')

var disableForm = function() {
  $fields.attr('readonly', true);
  $contactForm.find('button[type="submit"]')
    .addClass('has-icon')
    .attr('disabled', true)
    .text("Sending...")
    .append(spinner.el)
}

var enableForm = function() {
  $fields.removeAttr('readonly');
  $contactForm.find('button[type="submit"]')
    .removeClass('has-icon')
    .attr('disabled', false)
    .text("Send");
}

$contactForm.submit(function(e) {
  e.preventDefault();

  console.log( $(this).attr('action') );

  $.ajax({
    url: $(this).attr('action'),
    method: 'POST',
    data: $(this).serialize(),
    dataType: 'json',

    beforeSend: function() {
      disableForm();
    },

    success: function(data) {
      enableForm();

      $contactForm.prepend('<div class="c-notice c-notice--success">Message sent! We\'ll be in touch soon.</div>');

      $contactForm[0].reset();
    },

    error: function(err) {
      enableForm();

      $contactForm.prepend('<div class="c-notice c-notice--danger">Oops, there was an error. Please try again.</div>');
    }
  });
});
