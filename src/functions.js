const _ = require('lodash');

/**
 * Generator: lee cada línea del CSV y la transforma en un array de celdas.
 */
function* parseCSVGenerator(csv) {
  const rows = csv.trim().split('\n');
  for (const row of rows) {
    yield row.split(',').map(cell => cell.trim());
  }
}

/**
 * parseCSV: Convierte el CSV (string) en un array de arrays usando el generator.
 */
const parseCSV = (csv) => [...parseCSVGenerator(csv)];

/**
 * toCSV: Convierte una matriz (array de arrays) a un string CSV.
 */
const toCSV = (matrix) =>
  matrix.map(row => row.join(',')).join('\n');

/**
 * insertcolumn: Inserta una columna en el CSV en la posición indicada.
 * 
 * Se implementa de forma curried para permitir partial evaluation y se utiliza
 * lodash chaining (que funciona como un pipe) para componer la transformación:
 * 
 * 1. Transforma el CSV a matriz usando parseCSV.
 * 2. Mapea cada fila insertando el valor correspondiente de la columna.
 * 3. Convierte la matriz resultante a CSV.
 */
const insertcolumn = _.curry((csv, n, column) =>
  _.chain(csv)
    .thru(parseCSV)
    .map((row, i) => [
      ...row.slice(0, n),       // toma desde el inicio hasta la posición n (exclusivo)
      column[i] ?? '',          // inserta el valor, o '' si no existe
      ...row.slice(n)           // continua con el resto de la fila
    ])
    .thru(toCSV)
    .value()
);

/**
 * tohtmltable: Convierte el CSV en una tabla HTML.
 * 
 * Utiliza lodash chaining para:
 * 1. Parsear el CSV a matriz.
 * 2. Mapear cada fila a un string con formato HTML.
 * 3. Juntar las filas e incluirlas en la etiqueta <table>.
 */
const tohtmltable = _.curry((csv) =>
  _.chain(csv)
    .thru(parseCSV)
    .map(row =>
      '\t<tr>\n' +
      row.map(cell => `\t\t<td>${cell}</td>`).join('\n') +
      '\n\t</tr>'
    )
    .join('\n')
    .thru(rows => `<table>\n${rows}\n</table>`)
    .value()
);

module.exports = {
  insertcolumn,
  tohtmltable
};
