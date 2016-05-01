videoExists = ->
  $('#bgvideo').length

play = ->
  $('#bgvideo')[0].play()

pause = ->
  $('#bgvideo')[0].pause()

isHeaderVisble = ->
  if $(window).scrollTop() <= $('header').height()
    return true
  else
    return false

playPause = ->
  if videoExists()
    if isHeaderVisble()
      play()
    else
      pause()

# If at top
$(document).on 'scrollend', playPause
