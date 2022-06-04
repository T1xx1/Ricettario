const { contextBridge, ipcRenderer } = require('electron');
const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');

let path = {
   database: './src/database',
};

path['recipes'] = join(path.database, 'recipes.json');
path['categories'] = join(path.database, 'categories.json');

contextBridge.exposeInMainWorld('preload', {
   recipes: {
      add: recipe => {
         let recipes = JSON.parse(readFileSync(path.recipes, 'utf8'));

         recipes.push(recipe);

         writeFileSync(path.recipes, JSON.stringify(recipes, null, 3), 'utf8');
      },
      array: JSON.parse(readFileSync(path.recipes, 'utf8')),
      categories: JSON.parse(readFileSync(path.categories, 'utf8')),
   },
   window: action => {
      ipcRenderer.send('window', action);
   }
});