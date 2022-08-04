const { readFile, writeFile } = require('fs');

const json = {
   read: path => new Promise(response => readFile(path, 'utf8', (err, data) => {
      if (err) throw err;

      response(JSON.parse(data));
   })),
   write: (path, data) => writeFile(path, JSON.stringify(data, null, 3), err => {
      if (err) throw err;
   }),
}

module.exports = json;