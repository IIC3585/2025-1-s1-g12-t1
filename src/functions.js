const { flow, curry, map, join, split, trim } = require('lodash/fp');
const _ = require('lodash');

/* NOTAS:
    - Notar que un CSV es un string.
    - La primera columna/fila, para efectos de input, es 1 y no 0.
    - Las filas se separan por saltos de línea (\n) y las columnas por comas (,). */

/***************************** FUNCIONES AUXILIARES  *****************************/

// Convierte string a fila array. Ej: "1,2,3" => ["1", "2", "3"]
const parseRow = flow(split(','), map(trim));

// Convierte un CSV en una matriz (array de arrays).
const parseCSV = flow(trim, split('\n'), map(parseRow));

// Convierte una matriz (array de arrays) a un CSV.
const toCSV = flow(map(join(',')), join('\n'));

// Transposición de una matriz mediante zip
const transpose = (matrix) => {
  const rowOrColLenght = matrix[0].length;
  const hasSameLength = rowOrCol => rowOrCol.length === rowOrColLenght;
  if (matrix.every(hasSameLength)) {
    return _.zip(...matrix);
  }
  else {
    throw new Error('Las filas o columnas no tienen la misma longitud');
  }
};

// Intercambia columnas de lugar en un array de clearcolumnas.
const swapColumns = (columns, i, j) => {
  const cols = [...columns]; // Copia para no modificar original
  [cols[i], cols[j]] = [cols[j], cols[i]];
  return cols;
};

// Renderiza una celda en una tabla HTML.
const tdRenderCell = (cell) => `\t\t<td>${cell}</td>`;

// Renderiza una fila en una tabla HTML.
const trRenderRow = (row) =>
  '\t<tr>\n' +
  row.map(tdRenderCell).join('\n') +
  '\n\t</tr>';

// Ubica las filas recibidas en una tabla HTML.
const wrapTable = (rows) => `<table>\n${rows}\n</table>`;

/***************************** FUNCIONES DEL ENUNCIADO  *****************************/

// Transpone el CSV (cambia filas por columnas o al revés).
const rowsToColumns = flow(parseCSV, transpose, toCSV);
const columnsToRows = flow(parseCSV, transpose, toCSV);

// Intercambia de columnas n y m en el CSV.
const swap = (csv, n, m) => flow(
  parseCSV,
  transpose,
  cols => swapColumns(cols, n - 1, m - 1),
  transpose,
  toCSV
)(csv);

// Elimina una fila del CSV en la posición indicada.
const rowDelete = curry((csv, n) => flow(
  parseCSV,
  (rows) => rows.filter((_, i) => i !== n - 1), // Filtra todas las filas, excepto la fila n
  toCSV
)(csv));

// Elimina una columna del CSV en la posición indicada.
const columnDelete = curry((csv, n) => flow(
  parseCSV,
  map(row => [
    ...row.slice(0, n - 1), // Toma desde el inicio hasta la posición n (exclusivo)
    ...row.slice(n)         // Toma desde n+1 hasta el final, saltando la columna n
  ]),
  toCSV
)(csv));

// Inserta una fila en el CSV después de la posición indicada.
const insertRow = curry((csv, n, newRow) => flow(
  parseCSV,
  matrix => [
    ...matrix.slice(0, n), // Toma desde el inicio hasta la posición n (inclusive)
    newRow,                // Inserta la nueva fila
    ...matrix.slice(n)     // Toma desde n+1 hasta el final
  ],
  toCSV
)(csv));

// Inserta una columna en el CSV en la posición siguiente a la indicada.
const insertColumn = curry((csv, n, column) => flow(
  parseCSV,
  (rows) => rows.map((row, i) => [
    ...row.slice(0, n - 1), // Toma desde el inicio hasta la posición n (exclusivo)
    column[i] ?? '',        // Inserta el valor de la columna en la posición n
    ...row.slice(n - 1)     // Toma desde n hasta el final
  ]),
  toCSV
)(csv));

// Convierte el CSV en una tabla HTML.
const toHtmlTable = flow(
  parseCSV,
  map(trRenderRow),
  join('\n'),
  wrapTable
);

module.exports = {
  rowsToColumns,
  columnsToRows,
  swap,
  rowDelete,
  columnDelete,
  insertRow,
  insertColumn,
  toHtmlTable
};
