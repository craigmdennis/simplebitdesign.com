#= require 'responsive-nav/responsive-nav'

triggerClass = '.m-navigation.is-collapsible'
$toggle = $('#hamburger')

$('<button id="hamburger" class="c-hamburger" role="button" type="button"><span class="c-hamburger__lines"><span class="h-accessible">Menu</span></span></button>').insertBefore( triggerClass )

if $( triggerClass ).length > 0

  responsiveNav triggerClass,
    animate: true
    transition: 284
    # label: 'Menu' # String: Label for the navigation toggle
    # insert: 'before'
    customToggle: '#hamburger'
    # closeOnNavClick: true
    navClass: 'm-navigation--collapse'
    init: ->
    open: ->
    close: ->