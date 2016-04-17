focusstate = 'is-focussed'

getData = (el) ->
  $(el).data().focus

# Event handler needs to be document
# to detect events in Bootstrap modals
$(document).on 'focus', '[data-focus]', ->
  $(this)
    .closest getData( this )
    .addClass focusstate

$(document).on 'blur', '[data-focus]', ->
  $(this)
    .closest getData( this )
    .removeClass focusstate

# console.log 'Focus Parent Loaded'
