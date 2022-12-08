let lines = [],
  columns = [],
  visibleTrees = new Set(),
  maxScore = 0;

const calcTreeVisibility = function(){
  for(tree of visibleTrees){
    let coord = tree.split('-').map(p => parseInt(p));
    let treeSize = parseInt(lines[coord[0]][coord[1]]);
    let score = right(coord[1], lines[coord[0]], treeSize, log)
      * left(coord[1], lines[coord[0]], treeSize, log)
      * right(coord[0], columns[coord[1]], treeSize, log)
      * left(coord[0], columns[coord[1]], treeSize, log);
      if(maxScore < score) maxScore = score;
  }
  return maxScore;
}
const right = function(position, line, treeSize){
  if(position == line.length - 1) return 0;
  let i = 0;
  for(i = position + 1; i < line.length; i++){
    if(parseInt(line[i]) >= treeSize)  break;
  }
  if(i == line.length) i--;
  return i - position;
}
const left = function(position, line, treeSize){
  if(position == 0) return 0;
  let i = 0;
  for(i =  position - 1; i >= 0; i--){
    if(parseInt(line[i]) >= treeSize) break;
  }
  if(i == -1) i++;
  return position - i;
}

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
    // Colonne sous forme de ligne
    for(let j = 0; j < line.length; j++){
      columns[j] = (columns[j] ?? '') + line[j];
    }
  });
  computeVisible(lines);
  computeVisible(columns, true);
  return calcTreeVisibility();
}