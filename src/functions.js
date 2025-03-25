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


const splitInRows = (file) => file.split('\n').map(row => row.trim())
const splitRowInCells = (row) => row.split(',').map(cell => cell.trim())

/**
* getRows: Convierte el contenido de un CSV (string) en un array de arrays. 
* Cada array representa una fila y contiene las celdas de esa fila.
 */
const getRows = (file) => {
  return splitInRows(file).map(row => splitRowInCells(row))
};

/**
* rowsToFile: Convierte un array de arrays (de las filas) en el contenido de un CSV (string). 
 */
const rowsToFile = (rows) => {
  return rows.map(row => row.join(', ')).join('\n')
}

/**
* columnsToRows: Convierte un array de arrays, donde cada array representa una columna; en un array de arrays de las filas.
 */
const columnsToRows = (columns) => {
  let column = columns[0]
  return column.map((_, i) => columns.map(column => column[i])); // Por cada valor i de la columna (total de filas), retorna un array con los valores [i] de cada columna
}

function columnstorows(file) {
  return rowsToFile(rowsToColumns(getRows(file)))
}

/**
* rowsToColumns: Convierte un array de arrays, donde cada array representa una fila; en un array de arrays de las columnas.
 */
const rowsToColumns = (rows) => {
  let row = rows[0]
  return row.map((_, i) => rows.map(row => row[i]))
}

function rowstocolumns(file) {
  return rowsToFile(rowsToColumns(getRows(file)))
}

/**
 * swap (file, n, m) - hace un swap de las columnas n y m
 */
function swap(file, n, m) {
  n--; m--;
  let columns = rowsToColumns(getRows(file));
  let aux = columns[m];
  columns[m] = columns[n];
  columns[n] = aux;
  return rowsToFile(columnsToRows(columns));
}


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
  columnstorows,
  rowstocolumns,
  swap,
  insertcolumn,
  tohtmltable
};
