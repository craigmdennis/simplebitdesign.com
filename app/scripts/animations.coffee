animations = {}

(($) ->

  'use strict'

  animations =

    init: ->

      $('.hero-title').animateCSS('fadeIn', {delay:800})
      $('.logo').animateCSS('fadeInUp', {delay: 2000})
      $('.hero-subtitle').animateCSS('fadeInDown', {delay:2000})

  return

)(jQuery)
