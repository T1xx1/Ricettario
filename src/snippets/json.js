const { readFileSync, unlinkSync, writeFileSync } = require('fs');

class Json {
   constructor(path, initial = {}) {
      this.initial = initial;
      this.path = path;

      this.read();
   }

   del() {
      unlinkSync(this.path);
   }
   init() {
      this.value = this.initial;
      this.write();
   }
   read() {
      this.value = JSON.parse(readFileSync(this.path, 'utf8'));
   }
   write() {
      writeFileSync(this.path, JSON.stringify(this.value, null, 3));
   }
}

module.exports = Json;