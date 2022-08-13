const Ricettario = require('./core/ricettario');

const ricettario = new Ricettario();

let month = 2629800000;

for (let recipe in ricettario.value) {
   if (ricettario.value[recipe].date && ricettario.value[recipe].type === 'nuova' && (new Date() - new Date(ricettario.value[recipe].date)) > month) delete ricettario.value[recipe].type;
}

for (let recipe in ricettario.value) {
   if (ricettario.value[recipe].date && ricettario.value[recipe].type === undefined && (new Date() - new Date(ricettario.value[recipe].date)) > month) {
      if ([undefined, 0].includes(ricettario.value[recipe].count)) {
         ricettario.value[recipe].type = 'mai fatta';
      } else ricettario.value[recipe].type = 'vecchia';
   }
}

ricettario.write();