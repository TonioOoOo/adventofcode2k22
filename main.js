'use strict';
// Execute:
// node main.js {day} {exo: (1/2)} {dryRun expected value OR 'benchmark'}
// Read the readme for more...

// Agrs
const dayToRun = process.argv[2] ?? 1,
  exToRun = process.argv[3] ?? 1,
  folder = `days/${dayToRun.padStart(2, '0')}/`,
  exo = `day${(exToRun != 1) ? '-' + exToRun : ''}`;

let dryRun = !!process.argv[4], 
    dryRunValue = process.argv[4],
    benchmark = (dryRunValue == 'benchmark');
if(benchmark){
  dryRun = false;
  dryRunValue = undefined;
}
let inputFile = `${folder}input${dryRun ? '.sample' : ''}.txt`;

// Imports
const fs = require('fs'),
    readline = require('readline'),
    banner = require('./banner'),
    ruuuuuun = require(`./${folder}/${exo}`);

// Create reader
const createReader = function(){
  return readline.createInterface({
      input: fs.createReadStream(inputFile),
      crlfDelay: Infinity
  });
}

// Reader
// Init Global static one
const rl = createReader();
const readInput = async function (handlerAsync) {
    // Get ready to stream
    for await (const line of rl) {
        await handlerAsync(line);
    }
    // One more call to signal EOF
    await handlerAsync(undefined, true);
};
const readInputBench = async function (handlerAsync) {
    // Create one reader for each read...
    const rlBench = createReader();
    // Get ready to stream
    for await (const line of rlBench) {
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
    log(banner()); // š„¹
    log("Here we gooo!", ((dryRun) ? "(āļø Dry Run)" : "(š For real)"))

    // ā²ļø - Pour essayer de craner
    console.time('\nš Execution ā”ļø')
    // ā¢ļø š§ 
    let result = await ruuuuuun(readInput, log);
    console.timeEnd('\nš Execution ā”ļø')

    log("")
    if(dryRun){
        log(`š Dry Run result check : ${(result == dryRunValue) ? 'ā seems good' : 'ā Nein!'}`);
        log("Result :")
        log(result);
        if(result != dryRunValue){
          log("Excepted :")
          log(dryRunValue);
        }
    }else{
      log("š Result (do the š+C š+V stuff)")
      log("-------")
      log(result);
      log("-------")
    }
    log("")
    log("Bye! āļø")
}

if(benchmark){
  const Benchmark = require('benchmark');
  log(banner()); // š„¹
  log("Here we gooo! (ā”ļø Benchmark)")
  log("Please be patient...")
  log("")
  const suite = new Benchmark.Suite;
  suite.add("š§Ŗ A", { defer: true,
    fn: async function(deferred) {
      await ruuuuuun(readInputBench, log, 'A');
      deferred.resolve();
    } })
    .add("š§Ŗ B", { defer: true,
    fn: async function(deferred) {
      await ruuuuuun(readInputBench, log, 'B');
      deferred.resolve();
    } })
    .on('cycle', (event) => log(String(event.target)))
    .on('complete', function(){log('Fastest is ' + this.filter('fastest').map('name'));log("");log("Bye! āļø")})
    .run({ 'async': true }); 
}else{
  openAdventCalendar()
    .catch((e) => {
      log("")
      log("š„š„š„š„š„š„š„š„š„š„š„š„š„")
      log(" _________________________");
      log("|                         \\");
      log("| Oh oh! C'est moche Ć§a !  > š ");
      log("|_________________________/");
      console.error(e);
      log("š„š„š„š„š„š„š„š„š„š„š„š„š„")
  });
}