let max = 0;
let value = 0;

module.exports = async (readInput) => {
  await readInput((line, eof) => {
    if(!line || eof){
      if(max < value) max = value;
      value = 0;
    }else{
      value += parseInt(line);
    }
  });
  return max; // 69883
};