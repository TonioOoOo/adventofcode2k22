let score = 0;
module.exports = async (readInput, log) => {
  await readInput((line, eof) => {
    if(line && !eof){
      let elements = line.split(',')
        .map(p => p.split('-').map(q => parseInt(q)));
      elements.sort((a,b) => a[0]-b[0]);
      score += elements[0][1] >= elements[1][0] ? 1 : 0;
    }
  });
  return score;
};