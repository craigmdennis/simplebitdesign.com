# console.log ''Allo from CoffeeScript!'
'use strict';

# Avoid `console` errors in browsers that lack a console.
(->
  method = undefined
  noop = ->

  methods = [
    'assert',
    'clear',
    'count',
    'debug',
    'dir',
    'dirxml',
    'error',
    'exception',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'log',
    'markTimeline',
    'profile',
    'profileEnd',
    'table',
    'time',
    'timeEnd',
    'timeStamp',
    'trace',
    'warn' ]
  length = methods.length
  console = (window.console = window.console or {})
  while length--
    method = methods[length]

    # Only stub undefined methods.
    console[method] = noop  unless console[method]
)();

$(document).ready ->

  # Call the validation plugin on the contact form
  $('#contactForm').validate

    highlight: (element) ->
      $(element).parent().addClass('has-additional')

    unhighlight: (element) ->
      $(element).parent().removeClass('has-additional')

    errorPlacement: (error, element) ->
      $wrap = $('<div class="additional-content block-danger">')
      $wrap.html(error).insertAfter(element);

    messages:
      message: 'We need to know what would you like our help you with.'
      name: 'Please tell us your name so we know what to call you.'
      email:
        required: 'Please tell us your email address so we can get in touch.'
        email: 'That doesn\'t look like an email address.'
