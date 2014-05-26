'use strict'

$(document).ready ->

  # Call some other functions
  window.animations.init();
  window.validation.init('#contactForm');
  window.svgeezy.init(false, 'png');
  window.fullscreen.init();

  return
