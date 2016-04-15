require 'what-input'
require '_fastclick'
require '_navigation'
require '_twitter'
require '_formspree'

$('#mapoverlay').click (e) ->
  e.stopPropagation()
  $(this).addClass('map-is-interactive')

$(document).on 'click scrollstart', ->
  $('#mapoverlay').removeClass('map-is-interactive')
