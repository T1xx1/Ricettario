const { join } = require('path');

const json = require('../snippets/json.js');

let database = join(__dirname, 'database');
let month = 2629800000;

let path = join(database, 'recipes/main.json');

let recipes = json.read(path);

// New -> neverdone
for (let recipe in recipes) {
   if (recipes[recipe].date && recipes[recipe].list) {
      if ((new Date() - new Date(recipes[recipe].date.split('/').reverse().join('-'))) > month && recipes[recipe].list === 'nuove') recipes[recipe].list = 'mai';
   }
}

// Neverdone -> old
for (let recipe in recipes) {
   if (recipes[recipe].date && recipes[recipe].list) {
      if ((new Date() - new Date(recipes[recipe].date.split('/').reverse().join('-'))) > month && recipes[recipe].list === 'mai') recipes[recipe].list = 'vecchie';
   }
}

json.write(path, recipes);

// Backup
path = join(database, 'recipes/backup.json');

let backup = json.read(path);

for (let date in backup) {
   if ((new Date() - new Date(date.split('/').reverse().join('-'))) > month) delete backup[date];
}

backup[new Date().toLocaleDateString('it', {
   day: '2-digit',
   month: '2-digit',
   year: 'numeric',
})] = recipes;

json.write(path, backup);

// Stats
path = join(database, 'stats.json');

let stats = json.read(path);

stats.length = Object.keys(recipes).length;

json.write(path, stats);