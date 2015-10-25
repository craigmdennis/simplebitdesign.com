#= require 'responsive-nav/responsive-nav'

if $('.navigation.is-collapsible').length > 0
  responsiveNav ".navigation.is-collapsible",
    animate: true
    transition: 284
    label: "Menu" # String: Label for the navigation toggle
    insert: "before"
    # customToggle: ""
    # closeOnNavClick: true
    navClass: "navigation--collapse"
    init: -> # Function: Init callback
    open: -> # Function: Open callback
    close: -> # Function: Close callback