imagesLoaded = require 'imagesloaded'
imagesLoaded.makeJQueryPlugin( $ )

$('[data-toggle="lazyload"]').imagesLoaded()
  # .always ( instance ) ->
  # .done ( instance ) ->
  .progress ( instance, image ) ->
    # result = image.isLoaded ? 'loaded' : 'broken'
    # console.log( 'image is ' + result + ' for ' + image.img.src )
    $( image.img ).addClass("is-loaded")
