animations = {}

(($) ->

  'use strict'

  animations =

    init: ->

      $('.hero__title').animateCSS('fadeIn', {delay:800})
      $('.logo').animateCSS('fadeInUp', {delay: 2000})
      $('.hero__subtitle').animateCSS('fadeInDown', {delay:2000})
      $('.section__icon--more').animateCSS('fadeInDown', {delay:5000})

  return

)(jQuery)
