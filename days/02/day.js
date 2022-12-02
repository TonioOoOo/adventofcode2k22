const R = 1,
  P = 2,
  S = 3,
  scores = { Op:0, Me:0 },
  shapMap = { X: R, Y:P, Z: S, A: R, B:P, C: S };

module.exports = async (readInput) => {
  await readInput((line, eof) => {
    if(!line || eof){
      // Nothing to do
    }else{
      let item = line.split(' ');
      let opScore = shapMap[item[0]];
      let myScore = shapMap[item[1]];

      // scores.Op += opScore;
      scores.Me += myScore;

      if(opScore == myScore){
        // scores.Op += 3;
        scores.Me += 3;
      }else if((opScore > myScore || (opScore == R && myScore == S)) && !(opScore == S && myScore == R)){
        // scores.Op += 6;
      }else{
        scores.Me += 6;
      }
    }
  });
  return scores.Me; // 15337
};