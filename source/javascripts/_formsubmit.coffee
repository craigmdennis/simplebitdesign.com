$contactForm = $('#contactform')
$fields = $contactForm.find('input', 'textarea')

disableForm = ->
  $fields.attr 'readonly', true
  $contactForm
    .find('button[type="submit"]')
    .addClass('has-icon')
    .attr('disabled', true)
    .text('Sending...')
    .append spinner.el

$contactForm.submit (e) ->
  e.preventDefault()
  disableForm()

  $form = $(this)
  $.post($form.attr('action'), $form.serialize()).then ->
    $('<div class="c-notice c-notice--success c-notice--fill c-notice--large">Message sent! We\'ll be in touch soon.</div>').insertBefore $contactForm
    $contactForm.remove()