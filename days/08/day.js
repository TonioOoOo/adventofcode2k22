let lines = []
  columns = [],
  visibleTrees = new Set();

// Find visible tree in a line
const computeVisible = function(lines, invert){
  for(let i = 0; i < lines.length; i++){
    var line = lines[i];
    let max = -1,
      x=0,
      z=0;
    for(let j = 0; j < line.length; j++){
      let value = parseInt(line[j]);
      if(value > max){
        visibleTrees.add(invert ? `${j}-${i}` : `${i}-${j}`);
        x = j;
        max = value;
      }
    }
    max = -1;
    for(let j = line.length; j > x; j--){
      let value = parseInt(line[j]);
      if(value > max){
        visibleTrees.add(invert ? `${j}-${i}` : `${i}-${j}`);
        z = j;
        max = value;
      }
    }
  }
}

module.exports = async (readInput, log) => {
  await readInput((line, eof) => {
    if(eof) return;
    lines.push(line);
    for(let j = 0; j < line.length; j++){
      columns[j] = (columns[j] ?? '') + line[j];
    }
  });
  computeVisible(lines);
  computeVisible(columns, true);
  return visibleTrees.size;
}