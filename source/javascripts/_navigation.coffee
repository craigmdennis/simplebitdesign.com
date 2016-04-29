transformicon = require 'vendor/_transformicons'

$toggle = $('[data-toggle="navigation"]')
$nav = $('#navigation')
open = false

$toggle.click ->
  $nav.toggleClass('is-open')
  $('body').toggleClass('navigation-is-open')
  transformicon.toggle('.tcon')
  open = true
