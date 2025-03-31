const { setRed, setGreen, setBlue } = require('./colors');
const {
    rowsToColumns, columnsToRows, swap, rowDelete,
    columnDelete, insertRow, insertColumn, toHtmlTable
  } = require('./functions');

// 🧪 Ejecuta un test
function runTest(name, actual, expected) {
  const passed = actual === expected;
  const status = passed ? setGreen('[✔ PASSED]') : setRed('[✘ FAILED]');
  console.log(`\n${status}\n${setBlue(name)}`);
  if (!passed) {
    console.log('\nExpected:\n' + expected);
    console.log('\nActual:\n' + actual);
  } else{
    console.log('-------------------------');
    console.log(actual);
  }
}

// 🧪 Lista de pruebas (índices 1-based)
function getTestCases(dataCSV) {
    return [
      {
        name: '1. rowsToColumns',
        fn: rowsToColumns,
        input: [`Pedro,Potter,Vainilla\nJuan,Weasley,Chocolate\nDiego,Granger,Aliado`],
        outputType: 'csv',
        expected: `Pedro,Juan,Diego\nPotter,Weasley,Granger\nVainilla,Chocolate,Aliado`
      },
      {
        name: '2. columnsToRows',
        fn: columnsToRows,
        input: [`Pedro,Juan,Diego\nPotter,Weasley,Granger\nVainilla,Chocolate,Aliado`],
        outputType: 'csv',
        expected: `Pedro,Potter,Vainilla\nJuan,Weasley,Chocolate\nDiego,Granger,Aliado`
      },
      {
        name: '3. swap(1, 3)',
        fn: swap,
        input: [dataCSV, 1, 3],
        outputType: 'csv',
        expected: `Vainilla,Potter,Pedro\nChocolate,Weasley,Juan\nAliado,Granger,Diego`
      },
      {
        name: '4. rowDelete(2)',
        fn: rowDelete,
        input: [dataCSV, 2],
        outputType: 'csv',
        expected: `Pedro,Potter,Vainilla\nDiego,Granger,Aliado`
      },
      {
        name: '5. columnDelete(2)',
        fn: columnDelete,
        input: [dataCSV, 2],
        outputType: 'csv',
        expected: `Pedro,Vainilla\nJuan,Chocolate\nDiego,Aliado`
      },
      {
        name: '6. insertRow-after(2)',
        fn: insertRow,
        input: [dataCSV, 2, ['Maria', 'Malfoy', 'Fresa']],
        outputType: 'csv',
        expected: `Pedro,Potter,Vainilla\nJuan,Weasley,Chocolate\nMaria,Malfoy,Fresa\nDiego,Granger,Aliado`
      },
      {
        name: '7. insertColumn-after(2)',
        fn: insertColumn,
        input: [dataCSV, 3, ['X', 'Y', 'Z']],
        outputType: 'csv',
        expected: `Pedro,Potter,X,Vainilla\nJuan,Weasley,Y,Chocolate\nDiego,Granger,Z,Aliado`
      },
      {
        name: '8. toHtmlTable',
        fn: toHtmlTable,
        input: [dataCSV],
        outputType: 'html',
        expected:
`<table>
\t<tr>
\t\t<td>Pedro</td>
\t\t<td>Potter</td>
\t\t<td>Vainilla</td>
\t</tr>
\t<tr>
\t\t<td>Juan</td>
\t\t<td>Weasley</td>
\t\t<td>Chocolate</td>
\t</tr>
\t<tr>
\t\t<td>Diego</td>
\t\t<td>Granger</td>
\t\t<td>Aliado</td>
\t</tr>
</table>`
      }
    ];
  }

module.exports = {
    runTest,
    getTestCases
};