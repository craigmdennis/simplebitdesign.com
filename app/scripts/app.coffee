console.log "'Allo from CoffeeScript!"

# Avoid `console` errors in browsers that lack a console.
(->
  method = undefined
  noop = ->

  methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeStamp",
    "trace",
    "warn" ]
  length = methods.length
  console = (window.console = window.console or {})
  while length--
    method = methods[length]

    # Only stub undefined methods.
    console[method] = noop  unless console[method]
)();

$(document).ready ->
  $('#form-contact').isHappy ->
    fields:

      "#name":
        required: true,
        message: "Please let us know what to call you."

      "#email":
        required: true,
        message: "Please tell us your email address so we can get in touch.",
        test: happy.email

      "#message":
        required: true,
        message: "We need a little more information than that",
        test: happy.email
