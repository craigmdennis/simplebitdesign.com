which = null
$trigger = null

$('[data-consolidate]').hover ->
  which = $(this).attr('data-consolidate')
  $trigger = $('[data-consolidate="' + which + '"]')
  .addClass('is-hovered')
, ->
  $trigger.removeClass('is-hovered')
