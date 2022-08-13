const LocalStorage = require('../snippets/localstoragem');

class Ricettario extends LocalStorage {
   constructor() {
      super('Ricettario', '1.0', {});
   }

   add(name, link, type) {
      this.value[name] = {
         date: new Date().toISOString(),
         link: link,
      }

      if (type !== 'nessuna') this.value[name].type = type;

      this.write();
   }
   edit(obj) {
      try {
         this.value = obj;

         this.write();
      } catch {}
   }
   count(name) {
      if (this.value[name].count === undefined) {
         this.value[name].count = 1;
      } else this.value[name].count++;

      this.write();
   }
}

module.exports = Ricettario;