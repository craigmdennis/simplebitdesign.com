animations = {}

(($) ->

  'use strict'

  animations =

    init: ->

      $('.logo').animateCSS('fadeInUp', {delay: 800})
      $('.hero-title').animateCSS('fadeInUp', {delay:1000})
      $('.hero-subtitle').animateCSS('fadeIn', {delay:1400})

  return

)(jQuery)
