typed        = require 'typed.js'
shuffle      = require './vendor/_shuffle'

strings = $('#typed').attr('data-phrases')
strings = JSON.parse strings
strings = shuffle strings

settings =
  strings: strings
  typeSpeed: 10
  backSpeed: 0
  startDelay: 1000
  backDelay: 3000
  loop: true
  showCursor: false

$('#typed').typed settings

