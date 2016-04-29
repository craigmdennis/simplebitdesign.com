require './vendor/_scrollstart'

$('#mapoverlay').click (e) ->
  e.stopPropagation()
  $(this).addClass('map-is-interactive')

$(document).on 'click scrollstart', ->
  $('#mapoverlay').removeClass('map-is-interactive')
