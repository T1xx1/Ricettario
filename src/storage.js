const { readFileSync, writeFileSync } = require('original-fs');
const { join } = require('path');

let database = join(__dirname, 'database');
let month = 2629800000;

let path = join(database, 'recipes/main.json');

let recipes = JSON.parse(readFileSync(path, 'utf-8'));

// New -> neverdone
{
   for (let recipe in recipes) {
      if (recipes[recipe].date && recipes[recipe].list) {
         if ((new Date() - new Date(recipes[recipe].date.split('/').reverse().join('-'))) > month && recipes[recipe].list === 'nuove') recipes[recipe].list = 'mai';
      }
   }

   writeFileSync(path, JSON.stringify(recipes, null, 3), 'utf8');
}

// Backup
{
   let path = join(database, 'recipes/backup.json');

   let backup = JSON.parse(readFileSync(path, 'utf8'));

   for (let date in backup) {
      if ((new Date() - new Date(date.split('/').reverse().join('-'))) > month) delete backup[date];
   }

   backup[new Date().toLocaleDateString('it', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
   })] = recipes;

   writeFileSync(path, JSON.stringify(backup, null, 3), 'utf8');
}

// Stats
{
   let path = join(database, 'stats.json');

   let stats = JSON.parse(readFileSync(path, 'utf8'));

   stats.length = Object.keys(recipes).length;

   writeFileSync(path, JSON.stringify(stats, null, 3), 'utf8');
}