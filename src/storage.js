const { readFileSync, writeFileSync } = require('original-fs');
const { join } = require('path');

let database = join(__dirname, 'database');

let path = {
   recipes: join(database, 'recipes.json'),
}

let recipes = JSON.parse(readFileSync(path.recipes, 'utf8'));

writeFileSync(join(database, 'backup.json'), JSON.stringify(recipes), 'utf8');

recipes.forEach(recipe => {
   if (recipe.date) {
      if ((new Date() - new Date(recipe.date.split('/').reverse().join('-'))) > 2629800000 && recipe.category === 'new') recipe.category = 'neverdone';
   }
});

writeFileSync(path.recipes, JSON.stringify(recipes, null, 3), 'utf8');