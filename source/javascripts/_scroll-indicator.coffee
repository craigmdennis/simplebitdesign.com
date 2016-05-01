require './vendor/_scrollstart'

$(window).on 'scrollstart', ->
  $('#scrollindicator').remove()
