/* global process */

var Twit = require('twit');
var Masto = require('masto');
var getWord = require('./get-word');

var mastodon;
var twit;

if (process.env.TWITTER_ACCESS_TOKEN) {
  twit = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
  setInterval(postTweet, 60 * 60 * 1000);
}

if (process.env.MASTODON_ACCESS_TOKEN) {
  mastodon = new Masto({
    access_token: process.env.MASTODON_ACCESS_TOKEN,
    api_url: 'https://botsin.space/api/v1/'
  });
  setInterval(postToot, 60 * 60 * 1000);
}

function getPhrase(word) {
  var capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
  return capitalizedWord + '-Industrial Complex';
}

function postTweet() {
  getWord(useWord);

  function useWord(error, word) {
    if (error) {
      console.log(error);
    }
    else {
      var body = {
        status: getPhrase(word)
      };
    }
    twit.post('statuses/update', body, wrapUp);
  }
}

function postToot() {
  getWord(useWord);

  function useWord(error, word) {  
    var body = {
      status: getPhrase(word)
    };
    mastodon.post('statuses', body, wrapUp);
  }
}

function wrapUp(error, data) {
  if (error) {
    console.log(error, error.stack);

    if (data) {
      console.log('data:', data);
    }
  }
  else {
    console.log('Completed.');
  }
}
