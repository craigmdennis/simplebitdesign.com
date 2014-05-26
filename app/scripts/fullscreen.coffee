fullscreen = {}

(($, window) ->

  'use strict'

  fullscreen =

    targetClass: '.js-fullscreen-target'

    init: ( callback ) ->
      fullscreen.bind()
      fullscreen.setHeight()
      fullscreen.callback( callback )

    bind: ->
      $(window).on 'resize', fullscreen.setHeight

    getHeight: ( element ) ->
      $(element).height()

    setHeight: ->
      $(fullscreen.targetClass).css
        'min-height' : fullscreen.getHeight(window)

    callback: ( callback ) ->
      # Check if the callback is a function
      if typeof callback == 'function'
        # Execute the callback and return the origin element as `this`
        callback.call( this )

    destroy: ->
      $(window).off 'resize', fullscreen.setHeight
      $(fullscreen.targetClass).attr('style','')

  return

)(jQuery, window, document)
