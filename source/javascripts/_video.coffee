animations = require './_animations'

$('#tagline').on 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', ->
  document.getElementById('bgvideo').play()
