/*
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.toArray();
*/
let score = 0;


// Perf evo static array [abcd..ABCD..] indexof
var getScore = function(c){
  let code = c.charCodeAt();
  return code >= 97 ? code - 96 : code - 38;
}

module.exports = async (readInput) => {
  await readInput((line, eof) => {
    if(!line || eof){
      // Nothing to do
    }else{
      let middleIndex = Math.floor(line.length / 2);
      let parts = [line.slice(0, middleIndex).split(''), line.slice(middleIndex).split('')];

      // Perf evo => stop on first match
      let char = parts[0].filter(value => parts[1].includes(value));
      score += getScore(char[0]);
    }
  });
  return score; // 15337
};