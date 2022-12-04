'use strict';
// Execute:
// node main.js {day} {exo: (1/2)} {dryRun expected value}
// Read the readme for more...

// Agrs
const dayToRun = process.argv[2] ?? 1,
  exToRun = process.argv[3] ?? 1,
  dryRun = !!process.argv[4], 
  dryRunValue = process.argv[4],
  folder = `days/${dayToRun.padStart(2, '0')}/`,
  exo = `day${(exToRun != 1) ? '-' + exToRun : ''}`;

// Imports
const fs = require('fs'),
    readline = require('readline'),
    banner = require('./banner'),
    ruuuuuun = require(`./${folder}/${exo}`);

// Get ready to stream
const rl = readline.createInterface({
    input: fs.createReadStream(`${folder}input${dryRun ? '.sample' : ''}.txt`),
    crlfDelay: Infinity
});

// Reader
const readInput = async function (handlerAsync) {
    for await (const line of rl) {
        await handlerAsync(line);
    }
    // One more call to signal EOF
    await handlerAsync(undefined, true);
};
// Wrap log... 
const log = function () {
  console.log.apply(console, arguments);
};

// Main
async function openAdventCalendar(){
    log(banner()); // 🥹
    log("Here we gooo! " + ((dryRun) ? "(⚗️ Dry Run)" : "(🚀 For real)"))
    // Pour essayer de craner
    let start = process.hrtime(); 
    // ☢️ 🧠
    let result = await ruuuuuun(readInput, log);
    // ⏲️
    let elapsed = process.hrtime(start)[1] / 1000000;
    let sec = process.hrtime(start)[0];

    log("")
    if(dryRun){
        log(`🛂 Dry Run result check : ${(result == dryRunValue) ? '✅ seems good' : '❌ Nein!'}`);
        log("Result :")
        log(result);
        if(result != dryRunValue){
          log("Excepted :")
          log(dryRunValue);
        }
    }else{
      log("🎉 Result (do the 🍏+C 🍏+V stuff)")
      log("-------")
      log(result);
      log("-------")
    }
    
    
    log("")
    log(`🏁 Execution: ⚡️ ${sec} s, ${elapsed.toFixed(3)} ms`);
    log("")
    log("Bye! ❄️")
}

openAdventCalendar()
  .catch((e) => {
    log("")
    log("💥💥💥💥💥💥💥💥💥💥💥💥💥")
    log(" _________________________");
    log("|                         \\");
    log("| Oh oh! C'est moche ça !  > 🐛 ");
    log("|_________________________/");
    console.error(e);
    log("💥💥💥💥💥💥💥💥💥💥💥💥💥")
});