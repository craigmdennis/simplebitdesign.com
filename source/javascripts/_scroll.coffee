require 'jquery-scrollto'

config =
  onlyIfOutside: true
  easing: 'ease-in-out'

$('[data-scrollto]').click (e) ->
  e.preventDefault()

  $this = $(this)
  target = $this.attr('data-scroll') || $this.attr('href')
  $( target ).ScrollTo({ config })
