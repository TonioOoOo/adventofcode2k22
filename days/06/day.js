let resultPosition = 0;
const sequenceLength = 4;

module.exports = async (readInput, log) => {
  await readInput((line, eof) => {
    if(eof) return;
    for(let i = 0; i < line.length; i++){
      if(new Set(line.slice(i,i+sequenceLength)).size == sequenceLength){
        resultPosition = i+sequenceLength;
        return;
      }
    }
  });
  return resultPosition;
};