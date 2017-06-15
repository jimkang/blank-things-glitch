/* global __dirname */

// Via random line access in a text file, picks a random word.
// Watch out: A bunch of stuff happens on module load here.

var lineChomper = require('line-chomper');
var jsonfile = require('jsonfile');
// var probable = require('probable');

const defaultLinesInEachFile = 5000;
// const linesInLastFile = 4583;

function getLocationsForIndex(index) {
  var fileNumber = ~~(index / defaultLinesInEachFile);
  var filePath = __dirname + '/data/words.txt.part-a' +
    String.fromCharCode(97 + fileNumber);
  var offsetsPath = filePath + '-lineoffsets.json';

  return {
    filePath,
    offsetsPath,
    lineNumber: index % defaultLinesInEachFile
  };
}

// // Preload the line offset files for each word file and pack the offsets and word file
// // path into a probability table.
// var wordTable = [
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-aa-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-aa'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-ab-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-ab'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-ac-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-ac'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-ad-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-ad'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-ae-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-ae'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-af-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-af'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-ag-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-ag'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-ah-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-ah'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-ai-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-ai'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-aj-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-aj'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-ak-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-ak'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-al-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-al'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-am-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-am'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-an-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-an'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-ao-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-ao'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-ap-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-ap'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-aq-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-aq'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-ar-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-ar'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-as-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-as'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-at-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-at'}],
//   [defaultLinesInEachFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-au-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-au'}],
//   [linesInLastFile, {offsets: jsonfile.readFileSync(__dirname + '/data/words.txt.part-av-lineoffsets.json'), wordFile: __dirname + '/data/words.txt.part-av'}]
// ];

function getWord(index, done) {
  var {filePath, offsetsPath, lineNumber}  = getLocationsForIndex(index);

  lineChomper.chomp(
    filePath,
    {
      lineOffsets: jsonfile.readFileSync(offsetsPath),
      fromLine: lineNumber,
      lineCount: 1
    },
    readDone
  );

  function readDone(error, lines) {
    if (error) {
      done(error);
    }
    else if (!lines || !Array.isArray(lines) || lines.length < 1) {
      done(new Error('Could not get valid line for offset ' + index));
    }
    else {
      done(error, lines[0]);
    }
  }
}

module.exports = getWord;
