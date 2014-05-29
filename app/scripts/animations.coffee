animations = {}

(($) ->

  'use strict'

  animations =

    init: ->

      $('.hero__title').exists ->
        $(this).animateCSS('fadeIn', {delay:800})

      $('.logo').exists ->
        $(this).animateCSS('fadeInUp', {delay: 2000})

      $('.hero__subtitle').exists ->
        $(this).animateCSS('fadeInDown', {delay:2000})

      $('.section__icon--more').exists ->
        $this = $(this)
        $this.animateCSS('fadeInDown', {delay:3000})

        # In mobile safari and chrome there is an issue where the position changes
        # when the browser bar diminishes so we have to remove the icon
        $(window).on 'touchend', ->
          $this.remove();

  return

)(jQuery)
