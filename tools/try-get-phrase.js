var getWord = require('../get-word');

getWord(logPhrase);

function logPhrase(error, word) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(word.charAt(0).toUpperCase() + word.slice(1) + '-Industrial Complex');
  }
}
