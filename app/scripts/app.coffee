'use strict'

$(document).ready ->

  # Call some other functions
  window.validation.init('#contactForm');
  window.svgeezy.init(false, 'png');

  # If we have flexbox support do crazy header stuff
  if Modernizr.flexbox
    window.animations.init();
    window.fullscreen.init ->
      $('#expertise').removeClass('flex--is-hidden');

  return
