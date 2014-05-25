animations = {}

(($) ->

  'use strict'

  animations =

    init: ->

      $('.hero-title').animateCSS('fadeIn', {delay:800})
      $('.logo').animateCSS('flipInY', {delay: 2000})
      $('.hero-subtitle').animateCSS('fadeIn', {delay:2000})

  return

)(jQuery)
