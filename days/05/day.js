const queues =[[],[],[],[],[],[],[],[],[]],
  positions=[1,5,9,13,17,21,25,29,33],
  orderRexex = /move ([\d]*) from ([\d]*) to ([\d]*)/;
let init = true, firstItr = true, queueCount = 3,
  boundary = " 1   2   3   4   5   6   7   8   9 ";

const move = async function(from, to, times){
  from--;
  to--;
  for (let i = 0; i < times; i++) {
    queues[to].push(queues[from].pop())
    await printMove(from, to);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let text = [...new Set('CBHWDJQPFZLGZNPJSVZCHZGTZCVBMMCQCGHSVLDFFGLFBJVLVGLNJ')];
let replaceGift = ['🎄', '🌟', '⛄', '🦌', '🔔','🎁','🎅','🤶', '🧦', '🔫', '🪀', '🩲', '🦖','🎮','🎀','🧸', '🪁'];
function replace(items, index, currentQueue){
  if(items.length > index){
    return replaceGift[text.indexOf(items[index])];
  } // 🧲
  if(currentQueue) return (items.length == index) ? "🧲" : "⛓️ ";
  return "⚫";
}

const clearLines = (n) => {
  if(int == 1) return;
    for (let i = 0; i < n; i++) {
      const y = i === 0 ? null : -1
      process.stdout.moveCursor(0, y)
      process.stdout.clearLine(1)
    }
    process.stdout.cursorTo(0)
  }
let int = 1;
const printMove = async function(from, to){
  clearLines(47)
  console.log("Move", int++)
  let me = "🏗️ 🔗"
  for (let j = 0; j < queueCount; j++) {
     me += (from == j || to == j) ? "⚙️ " : ((from > j || to > j) ? '🔗' : '⚫');
     me += (from > j || to > j) ? '🔗' : '⚫';
  }
  console.log(me)
  for(let i = 42; i >= 0; i--){
    let message = "💈⚫";
    for (let j = 0; j < queueCount; j++) {
       message += `${replace(queues[j], i, from == j || to == j)}⚫`; 
    }
    console.log(message)
  }
  console.log("🚧🚧1️⃣ 🚧2️⃣ 🚧3️⃣ 🚧4️⃣ 🚧5️⃣ 🚧6️⃣ 🚧7️⃣ 🚧8️⃣ 🚧9️⃣ 🪜")
  await sleep(40);
}



const putInQueue = function(char, queueIndex){
  if(char && char != " ") queues[queueIndex].unshift(char);
}


let score = 0;
module.exports = async (readInput, log) => {
  await readInput(async (line, eof) => {
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
        await move(match[2], match[3], match[1])
      }
    }
  });
  let result = "";
  for (let i = 0; i < queueCount; i++) {
      result += queues[i].pop()
    }
  return result;
};