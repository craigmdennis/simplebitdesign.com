$(document).ready(function() {

    $(".header").mousemove(function(event) {
      cx = Math.ceil($(window).width() / 2.0);
      cy = Math.ceil($(window).height() / 2.0);
      dx = event.pageX - cx;
      dy = event.pageY - cy;

      tiltx = (dy / cy);
      tilty = - (dx / cx);
      radius = Math.sqrt(Math.pow(tiltx,2) + Math.pow(tilty,2));
      degree = (radius * 35);

      $(".js-rotate-3d").css("-webkit-transform","rotate3d(" + tiltx + ", " + tilty + ", 0, " + degree + "deg)");
    }).mouseout( function(event) {
      $(".js-rotate-3d").css("-webkit-transform","");
    });
    
});
