/* global __dirname, process */

var config = require('./config');
var callNextTick = require('call-next-tick');
var async = require('async');
var getWord = require('./get-word');
var fs = require('fs');
var probable = require('probable');
var ccBots = require('./data/ccbots.js');
var queue = require('d3-queue').queue;

var indexFileLocation = __dirname + '/data/index.txt';
var dryRun = false;
if (process.argv.length > 2) {
  dryRun = (process.argv[2].toLowerCase() == '--dry');
}

var index;
var theWord;

async.waterfall(
  [
    getIndex,
    getWord,
    storeWord,
    post,
    saveNewIndex
  ],
  wrapUp
);

function getIndex(done) {
  index = +(fs.readFileSync(indexFileLocation));
  callNextTick(done, null, index);
}

function storeWord(word, done) {
  theWord = word + '-industrial complex';
  callNextTick(done, null, word);
}

function post(word, done) {
  var ccWord = theWord + '!';
  var ccText = getCCText(pickBotsToCC(), 140 - ccWord);

  var q = queue();
  q.defer(postTweet, theWord);
  q.defer(postTweet, ccText + ccWord);
  q.awaitAll(moveOn);

  function moveOn(error, statusPostDataArray) {
    if (error) {
      // Do not prevent incrementing the index because of a failure.
      console.log(error, statusPostDataArray);
    }
    done();
  }
}

function postTweet(text, done) {  
  if (dryRun) {
    console.log('Would have tweeted:', text);
    callNextTick(done, null, {});
  }
  else {
    var body = {
      status: text
    };
    // twit.post('statuses/update', body, done);
  }
}

function saveNewIndex(done) {
  index += 1;
  fs.writeFileSync(indexFileLocation, index.toString());
  callNextTick(done);
}

function wrapUp(error) {
  if (error) {
    console.log(error, error.stack);
  }
}

function pickBotsToCC() {
  var numberOfBots = probable.rollDie(ccBots.length);
  var shuffled = probable.shuffle(ccBots);
  return shuffled.slice(0, numberOfBots);
}

function getCCText(ccUsers, maxLength) {
  var text = '';
  var piece;
  for (var i = 0; i < ccUsers.length; ++i) {
    piece = '@' + ccUsers[i] + ' ';
    if (piece.length + text.length > maxLength) {
      break;
    }
    text += piece;
  }

  return text;
}
