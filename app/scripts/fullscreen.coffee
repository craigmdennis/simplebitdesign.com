fullscreen = {}

(($, window) ->

  'use strict'

  fullscreen =

    targetClass: '.js-fullscreen-target'

    init: ->
      fullscreen.bind()
      fullscreen.setHeight()

    bind: ->
      $(window).on 'resize', fullscreen.setHeight

    getHeight: (element) ->
      $(element).height()

    setHeight: ->
      $(fullscreen.targetClass).css
        'min-height' : fullscreen.getHeight(window)

    destroy: ->
      $(window).off 'resize', fullscreen.setHeight
      $(fullscreen.targetClass).attr('style','')

  return

)(jQuery, window, document)
