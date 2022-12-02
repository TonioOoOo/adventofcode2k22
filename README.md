# Advent of code 2k22

## Run
> Il es possible de lancer en mode test avec le sample ou en mode normal.

```shell
node main.js {day} {exo: (1/2)} {dryRun expected value}
```

Exemple pour l'exo 1 day 1 avec le sample
```shell
main.js 1 1 24000
```

Exemple pour l'exo 1 day 1
```shell
main.js 1 1
```

Exemple pour l'exo 2 day 1
```shell
main.js 1 2
```

## Init un exo
1. Créer le dossier du jour dans `/days/` (pad avec 0, ex `/days/05/`)
2. Mettre le sample dans un txt `input.sample.txt`
3. Mettre l'input dans un txt `input.txt`
4. Mettre le code dans `day.js`
5. Mettre la part 2 dans `day-2.js`

Soit l'arbo
```
- days
| +- 01
| | +- input.sample.txt
| | +- input.txt
| | +- day.js
| | +- day-2.js
| +- 02
|   +- input.sample.txt
|   +- ...
```

Template de code :
```javascript
module.exports = async (readInput, logger) => {
  await readInput((line, eof) => {
    // Do stuff with line content (eof = end of file, line is undefined)
  });
  // Return result
  return 123;
};

```

## Les copains
- [François](https://github.com/fdubrez/advent-of-code-2k22)
- [JLT](https://gitlab.com/jltrom/aoc/)
- [Meven](https://github.com/mmeven/adventOfCode2022)
- [Mathieu](https://gitlab.com/gasouch/advent-of-code-2022/)