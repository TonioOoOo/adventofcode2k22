const R = 1,
  P = 2,
  S = 3,
  shapMap = { A: R, B:P, C: S };
let score = 0;

module.exports = async (readInput, log) => {
  await readInput((line, eof) => {
    if(!line || eof){
      // Nothing to do
    }else{
      let item = line.split(' ');
      let opponentMove = shapMap[item[0]];
      let needEnd = item[1];

      if(needEnd == 'X') { // Loose
        if(opponentMove == R) score += S;
        else if(opponentMove == P) score += R;
        else if(opponentMove == S) score += P;

      }else if (needEnd == 'Y'){ // Draw
        score += (opponentMove + 3);
      }else if(needEnd == 'Z'){ // Win
        if(opponentMove == R) score += P;
        else if(opponentMove == P) score += S;
        else if(opponentMove == S) score += R;
        score += 6;
      }
    }
  });
  return score; // 15337
};