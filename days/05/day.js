const queues =[[],[],[],[],[],[],[],[],[]],
  positions=[1,5,9,13,17,21,25,29,33],
  orderRexex = /move ([\d]*) from ([\d]*) to ([\d]*)/;
let init = true, firstItr = true, queueCount = 3,
  boundary = " 1   2   3   4   5   6   7   8   9 ";

const move = function(from, to, times){
  from--;
  to--;
  for (let i = 0; i < times; i++) {
    queues[to].push(queues[from].pop())
  }
}
const putInQueue = function(char, queueIndex){
  if(char && char != " ") queues[queueIndex].unshift(char);
}


let score = 0;
module.exports = async (readInput, log) => {
  await readInput((line, eof) => {
    if(!line || eof){
      // Nothing to do
    }else{
      if(line == boundary){
        init = false;
      }else if(init){
        if(firstItr){
          queueCount = (line.length+1) / 4;
          queues
          boundary = boundary.slice(0, line.length);
          firstItr = false;
        }
        for (let i = 0; i < queueCount; i++) {
          putInQueue(line[positions[i]], i);
        }
      }else{ // Order
        let match = line.match(orderRexex);
        move(match[2], match[3], match[1])
      }
    }
  });
  let result = "";
  for (let i = 0; i < queueCount; i++) {
      result += queues[i].pop()
    }
  return result;
};