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
  left: '50%', // Left position relative to parent
  shadow: false, // Whether to render a shadow
  hwaccel: true, // Whether to use hardware acceleration
  position: 'absolute' // Element positioning
}
var spinner = new Spinner(opts).spin()
var $contactForm = $('#formspree');

$contactForm.submit(function(e) {
  e.preventDefault();

  $.ajax({
    // url: '//formspree.io/info@simplebitdesign.com',
    method: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    beforeSend: function() {
      $contactForm.find('button[type="submit"]').addClass('has-icon').append(spinner.el)

      $contactForm.find('input','textarea').attr('readonly', true)
    },
    success: function(data) {
      // $contactForm.find('.alert--loading').hide();
      // $contactForm.append('<div class="alert alert--success">Message sent!</div>');
    },
    error: function(err) {
      // $contactForm.find('.alert--loading').hide();
      // $contactForm.append('<div class="alert alert--error">Oops, there was an error.</div>');
    }
  });
});
