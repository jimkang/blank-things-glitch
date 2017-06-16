/* global process */

var sb = require('standard-bail')();
var createWordnok = require('wordnok').createWordnok;
var callNextTick = require('call-next-tick');
var canonicalizer = require('canonicalizer');

var wordnok = createWordnok({
  apiKey: process.env.WORDNIK_KEY,
  logger: {
    log: function noOp() {}
  }
});

function getWord(done) {
  wordnok.getTopic(sb(singularize, done));

  function singularize(topic) {
    var singular = canonicalizer.getSingularAndPluralForms(topic)[0];
    callNextTick(done, null, singular);
  }
}

module.exports = getWord;
