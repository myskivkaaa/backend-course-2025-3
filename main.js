// main.js

// --- Імпорти ---
const fs = require('fs'); // вбудований модуль для роботи з файлами
const { program } = require('commander'); // бібліотека для обробки аргум. ком. рядка

// --- Налаштування параметрів командного рядка ---
program
  .requiredOption('-i, --input <file>', 'Input JSON file')
  .option('-o, --output <file>', 'Output file')
  .option('-d, --display', 'Display result in console')
  .option('-m, --mfo', 'Show MFO code before bank name')
  .option('-n, --normal', 'Show only active banks');

  //бере аргументи з командного рядка і перетворює в зручний об'єкт
program.parse(process.argv); 
const options = program.opts();

// --- Перевірка обовʼязкового параметра ---
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

// --- Перевірка існування файлу ---
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

// --- Читання JSON файлу ---
const data = JSON.parse(fs.readFileSync(options.input, 'utf-8'));

// --- Обробка даних ---
let result = data
  .filter(bank => !options.normal || bank.COD_STATE === 1)
  .map(bank => options.mfo ? `${bank.MFO} ${bank.SHORTNAME}` : bank.SHORTNAME)
  .join('\n');

// --- Вивід результату ---
if (options.display) console.log(result);
if (options.output) fs.writeFileSync(options.output, result, 'utf-8');

// Minor update for lab 3
console.log("Lab 3 JSON processing program");
