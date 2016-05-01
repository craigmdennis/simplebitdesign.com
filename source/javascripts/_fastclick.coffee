require 'fastclick'

if 'addEventListener' in document
  document.addEventListener 'DOMContentLoaded', ->
    FastClick.attach document.body
  , false

console.log "Fastclick is enabled"
