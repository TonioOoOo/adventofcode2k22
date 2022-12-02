
let topValues = [];
let value = 0;

module.exports = async (readInput, log) => {
  await readInput((line, eof) => {
    if(eof || !line){
      topValues.push(value);
      topValues = topValues.sort((a,b)=> (a - b)).slice(-3)
      value = 0;
    }else{
      value += parseInt(line);
    }
  });
  return topValues.reduce((a,x)=>a+x); // 207576
};

/** Solution 2
 * En mode variables
 **/

let max1 = 0, max2 = 0, max3 = 0;

const sol2 = async (readInput, log) => {
  await readInput((line, eof) => {
    if(eof || !line){
      if(max1 == 0) max1 = value;
      else if(max2 == 0) max2 = value;
      else if(max3 == 0) max3 = value;
      else if(max1 < value) max1 = value;
      else if(max2 < value) max2 = value;
      else if(max3 < value) max3 = value;

      value = 0;
    }else{
      value += parseInt(line);
    }
  });
  return max1 + max2 + max3;
};