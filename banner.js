// Best feature ever
// Obfuscation mode ON ! ^^

let banChars = ['🎄,🌟','⛄,🎄','🦌,🔔','🎄,🎁','🎄,🎅','🎄,🤶', '🧦,🎁'];

const randomChars = banChars[Math.floor(Math.random() * banChars.length)].split(',');

const arr = [...new Set(banChars.join(',').split(','))];
const hr = Array(Math.ceil(86/arr.length)).join(arr.join(',') + ',').split(',').slice(0,43).join('');
const banner = [];

let log = function(str){
  banner.push(str);
}
let bannerlog = function(line){
  banner.push(line.replaceAll('.', randomChars[0]).replaceAll(',', randomChars[1]));
}
module.exports = ()=>{
  log(hr)
  bannerlog(".".repeat(43))
  bannerlog("....,......................................")
  bannerlog("...,.,...,,,,,..,....,.,,,,,,.,....,.,,,,,.")
  bannerlog("..,...,..,....,.,....,.,......,,...,...,...")
  bannerlog(".,.....,.,....,.,....,.,,,,,..,.,..,...,...")
  bannerlog(".,,,,,,,.,....,.,....,.,......,..,.,...,...")
  bannerlog(".,.....,.,....,..,..,..,......,...,,...,...")
  bannerlog(".,.....,.,,,,,....,,...,,,,,,.,....,...,...")
  bannerlog("...........................................")
  bannerlog("..,,,,..,,,,,,.............................")
  bannerlog(".,....,.,..................................")
  bannerlog(".,....,.,,,,,..............................")
  bannerlog(".,....,.,..................................")
  bannerlog(".,....,.,..................................")
  bannerlog("..,,,,..,..................................")
  bannerlog(".".repeat(43))
  bannerlog("..,,,,,....................................")
  bannerlog(".,.....,..,,,,..,,,,,..,,,,,,..............")
  bannerlog(".,.......,....,.,....,.,...................")
  bannerlog(".,.......,....,.,....,.,,,,,...............")
  bannerlog(".,.......,....,.,....,.,...................")
  bannerlog(".,.....,.,....,.,....,.,...................")
  bannerlog("..,,,,,...,,,,..,,,,,..,,,,,,..............")
  bannerlog(".".repeat(43))
  log(hr)
  log("")
  return banner.join('\n');
}