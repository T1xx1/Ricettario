const { contextBridge, ipcRenderer } = require('electron');
const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');

let path = {
   recipes: join(__dirname, 'database/recipes/main.json'),
};

contextBridge.exposeInMainWorld('preload', {
   recipes: {
      add: (name, recipe) => {
         let recipes = JSON.parse(readFileSync(path.recipes, 'utf8'));

         recipes[name] = recipe;

         writeFileSync(path.recipes, JSON.stringify(recipes, null, 3), 'utf8');
      },
      obj: JSON.parse(readFileSync(path.recipes, 'utf8')),
      lists: JSON.parse(readFileSync(join(__dirname, 'database/recipes/lists.json'), 'utf8'))
   },
   window: action => {
      ipcRenderer.send('window', action);
   }
});