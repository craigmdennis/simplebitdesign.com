require 'twitter-fetcher'

domId = 'tweet'

config =
  "id": '708613649645113344'
  "domId": domId
  "maxTweets": 1
  "enableLinks": true
  "showImages": false
  "showPermalinks": false
  "showUser": false
  "showTime": false
  "showRetweet": false
  "showInteraction": false

if $('#' + domId).length
  twitterFetcher.fetch(config)
