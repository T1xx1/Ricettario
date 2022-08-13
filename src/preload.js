require('./update');

const { join } = require('path');

const { contextBridge, ipcRenderer } = require('electron');

const Json = require('./snippets/json');
const Ricettario = require('./core/ricettario');

const ricettario = new Ricettario();

contextBridge.exposeInMainWorld('preload', {
   types: new Json(join(__dirname, 'data/types.json')).value,
   ricettario: {
      add: (name, link, type) => ricettario.add(name, link, type),
      edit: obj => ricettario.edit(obj),
      count: name => ricettario.count(name),
      value: ricettario.value
   },
   ipc: win => ipcRenderer.send('win', win)
});