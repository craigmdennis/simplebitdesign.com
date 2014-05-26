validation = {}

(($) ->

  'use strict'

  validation =

    init: (param) ->

      form = $(param)
      # Call the validation plugin on the contact form
      form.validate

        invalidHandler: ->
          $('.btn-next').animateCSS('shake')

        highlight: (element) ->
          $(element).parent().addClass('has-additional')

        unhighlight: (element) ->
          $(element).parent().removeClass('has-additional')

        errorPlacement: (error, element) ->
          $wrap = $('<div class="additional-content block-danger">');
          $icon = $('<i class="icon-warning icon-left">').appendTo( $wrap );
          error.appendTo($wrap);
          $wrap.insertAfter(element);

        messages:
          message: 'Come on, you need to tell us somehing...'
          name: 'How do we know what to call you?'
          email:
            required: 'We need to be able to contact you'
            email: 'That doesn\'t look like an email address.'

  return

)(jQuery)
