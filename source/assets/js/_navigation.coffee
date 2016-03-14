#= require jquery.scrollstart

$toggle = $('[data-toggle="navigation"]')
$nav = $('#navigation')
$button = $('#navigationbutton')
open = false

# $('<button id="hamburger" class="c-hamburger" role="button" type="button"><span class="c-hamburger__lines"><span class="h-accessible">Menu</span></span></button>').insertBefore( triggerClass )

$nav.addClass('is-closed')
$button.addClass('is-closed')

$toggle.click ->
  $nav.toggleClass('is-closed')
  $button.toggleClass('is-closed')
  open = true

$(document).on 'scrollend', ->
  if open
    $nav.addClass('is-closed')
    $button.addClass('is-closed')