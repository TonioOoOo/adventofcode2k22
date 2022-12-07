let currentDirPath = [],
  lsMode = false,
  dirSizes = [],
  computeSize = 0,
  maxSize = 100000,
  rootDirName = 'root';

function computeSizes(size, log){
  for(let i = 0; i < currentDirPath.length; i++){
    let path = currentDirPath.slice(0, currentDirPath.length - i).join('/');
    dirSizes[path] = dirSizes[path] ? (dirSizes[path] + size) : size;
  }
}

module.exports = async (readInput, log) => {
  await readInput((line, eof) => {
    if(eof || line.startsWith('dir ')) return;
    if(line.startsWith('$ cd')){
        lsMode = false;
        let dir = line.split(' ')[2];
        switch (dir) {
          case '..':
            currentDirPath.pop();
            break;
          case '/':
            currentDirPath = [rootDirName];
            break;
          default:
            currentDirPath.push(dir);
        }
    }else if(line == '$ ls'){
      lsMode = true;
    }else if(lsMode){
      computeSizes(parseInt(line.split(' ')[0]), log);
    }
  });
  // Compute total size for directory
  delete dirSizes.root;
  return Object.keys(dirSizes)
    .map(key => dirSizes[key])
    .reduce((acc,val)=> (val <= maxSize ? (val+acc) : acc), 0);
};