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
      edit: obj => {
         try {
            writeFileSync(path.recipes, JSON.stringify(obj, null, 3), 'utf8');
         } catch {}
      },
      lists: JSON.parse(readFileSync(join(__dirname, 'database/recipes/lists.json'), 'utf8')),
      obj: () => {
         return JSON.parse(readFileSync(path.recipes, 'utf8'));
      }
   },
   stats: JSON.parse(readFileSync(join(__dirname, 'database/stats.json'), 'utf8')),
   window: (action, win) => {
      ipcRenderer.send('window', action, win);
   }
});