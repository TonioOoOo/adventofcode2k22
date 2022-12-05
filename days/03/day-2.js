let score = 0,
  arrayItems = [];

var getScore = function(c){
  let code = c.charCodeAt();
  return code >= 97 ? code - 96 : code - 38;
}

const alphabet = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'];
var getScoreAlph = function(c){
  return alphabet.indexOf(c) + 1;
}

module.exports = async (readInput, log, benchmark) => {
  let getScoreFn = (benchmark == 'A') ? getScore : getScoreAlph;
  await readInput((line, eof) => {
    if(arrayItems.length == 3 || eof){
      let badge = arrayItems[0]
        .filter(value => arrayItems[1].includes(value))
        .filter(value => arrayItems[2].includes(value));
      if(badge.length == 0 || arrayItems.length > 3){
        log(line);
        log(arrayItems);
      }
      score += getScoreFn(badge[0]);
      arrayItems = [];
      i = 0;
      if(eof) return;
    }
    arrayItems.push(line.split(''));
  });
  return score; // 15337
};