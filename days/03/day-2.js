/*
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.toArray();
*/
let score = 0,
  arrayItems = [];
// Perf evo static array [abcd..ABCD..] indexof
var getScore = function(c){
  let code = c.charCodeAt();
  return code >= 97 ? code - 96 : code - 38;
}

module.exports = async (readInput, log) => {
  await readInput((line, eof) => {
    if(arrayItems.length == 3 || eof){
      let badge = arrayItems[0]
        .filter(value => arrayItems[1].includes(value))
        .filter(value => arrayItems[2].includes(value));
      if(badge.length == 0 || arrayItems.length > 3){
        log(line);
        log(arrayItems);
      }
      score += getScore(badge[0]);
      arrayItems = [];
      i = 0;
      if(eof) return;
    }
    arrayItems.push(line.split(''));
  });
  return score; // 15337
};