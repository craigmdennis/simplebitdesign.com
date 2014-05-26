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

      # When scrolling on a touchscreen, prevent further resizes
      $(window).on 'touchstart', fullscreen.unbind

      # Trigger resize once when rotating device
      $(window).on 'orientationchange', fullscreen.setHeight

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

    unbind: ->
      # Unbind the resize event handler
      $(window).off 'resize', fullscreen.setHeight

    destroy: ->
      fullscreen.unbind();
      $(fullscreen.targetClass).attr('style','')

  return

)(jQuery, window, document)
