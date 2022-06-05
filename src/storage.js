const { readFileSync, writeFileSync } = require('original-fs');
const { join } = require('path');

let database = join(__dirname, 'database');

// Change list new in neverdone if been 1 month from add
let path = join(database, 'recipes/main.json');

let recipes = JSON.parse(readFileSync(path, 'utf-8'));

for (let recipe in recipes) {
   if (recipes[recipe].date && recipes[recipe].list) {
      if ((new Date() - new Date(recipes[recipe].date.split('/').reverse().join('-'))) > 2629800000 && recipes[recipe].list === 'new') recipes[recipe].list = 'neverdone';
   }
}

writeFileSync(path, JSON.stringify(recipes, null, 3), 'utf8');

// Backup
path = join(database, 'recipes/backup.json');

let backup = JSON.parse(readFileSync(path, 'utf8'));

for (let date in backup) {
   if ((new Date() - new Date(date.split('/').reverse().join('-'))) > 2629800000) delete backup[date];
}

backup[new Date().toLocaleDateString('it', {
   day: '2-digit',
   month: '2-digit',
   year: 'numeric',
})] = recipes;

writeFileSync(path, JSON.stringify(backup, null, 3), 'utf8');

// Info
path = join(database, 'info.json');

let info = JSON.parse(readFileSync(path, 'utf8'));

info.length = Object.keys(recipes).length;

writeFileSync(path, JSON.stringify(info, null, 3), 'utf8');