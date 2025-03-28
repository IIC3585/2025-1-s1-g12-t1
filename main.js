const { openCSV, readFirstLines, saveDataToFile, readStatus } = require('./src/utils');
const { columnstorows, rowstocolumns, swap, insertcolumn, rowdelete, columndelete, insertcolumn, tohtmltable } = require('./src/functions');
const { default: test } = require('node:test');

// Main function to process CSV data
async function processCSV() {
  try {
    let data = openCSV('src/data.csv');
    readFirstLines(data, 5);

    /* ################# FUNCIONES ################# */

    // Insertar datos en una nueva columna
    readStatus('insertcolumn');
    const columnToAdd = ['New A', 'New B', 'New C'];
    data = insertcolumn(data, 3, columnToAdd);
    console.log(data, '\n');
    
    // Eliminar la segunda fila
    readStatus('rowdelete');
    let dataWithoutRow = rowdelete(data, 1);
    console.log(dataWithoutRow, '\n');
    
    // Eliminar la columna 2
    readStatus('columndelete');
    let dataWithoutColumn = columndelete(data, 1);
    console.log(dataWithoutColumn, '\n');
    
    // Insertar una nueva fila después de la segunda fila
    readStatus('insertrow');
    const rowToAdd = ['Maria', 'Gonzalez', 'Fresa', 'New D'];
    let dataWithNewRow = insertrow(data, 1, rowToAdd);
    console.log(dataWithNewRow, '\n');
    
    // Convertir datos a formato tabla HTML
    readStatus('tohtmltable');
    let dataTable = tohtmltable(data);
    console.log(dataTable, '\n');

    /* ############################################ */

    saveDataToFile('output/data_modified.csv', data);
    saveDataToFile('output/data_table.html', dataTable);
    
    // Guardar ejemplos de las nuevas funciones
    saveDataToFile('output/without_row.csv', dataWithoutRow);
    saveDataToFile('output/without_column.csv', dataWithoutColumn);
    saveDataToFile('output/with_new_row.csv', dataWithNewRow);

  } catch (error) {
    console.error(`Error processing CSV: ${error.message}`);
  }
}

function testFunction(fn, input, expectedOutput) {
  let function_result = fn(...input);
  let test_result = function_result === expectedOutput;
  let message = test_result ? "\x1b[32mTEST PASSED\x1b[0m" : "\x1b[31mTEST FAILED\x1b[0m";
  
  console.log("\n----------------------------------");
  console.log("\nTest " + fn.name + ": " + message);
  // console.log("\nOriginal:");
  // console.log(input);
  console.log("\nResult after " + fn.name + ":");
  console.log(function_result);
  console.log("\nExpected:");
  console.log(expectedOutput);
  console.log("\n----------------------------------");
}

function testSwap() {
  const originalFileContent = `Juan, Perez, jperez@gmail.com
Ana, Flores, aflores@gmail.com
Luis, Prado, lprado@gmail.com`

  const expectedFileContent =  `jperez@gmail.com, Perez, Juan
aflores@gmail.com, Flores, Ana
lprado@gmail.com, Prado, Luis`

  let input = [originalFileContent, 1, 3];
  testFunction(swap, input, expectedFileContent);
}

function testRowsToColumns() {
  const originalFileContent = `Juan, Perez, jperez@gmail.com
Ana, Flores, aflores@gmail.com
Luis, Prado, lprado@gmail.com`

  const expectedFileContent =  `Juan, Ana, Luis
Perez, Flores, Prado
jperez@gmail.com, aflores@gmail.com, lprado@gmail.com`

  testFunction(rowstocolumns, [originalFileContent], expectedFileContent);
}

function testColumnsToRows() {
  const originalFileContent = `Juan, Ana, Luis
Perez, Flores, Prado
jperez@gmail.com, aflores@gmail.com, lprado@gmail.com`

  const expectedFileContent =  `Juan, Perez, jperez@gmail.com
Ana, Flores, aflores@gmail.com
Luis, Prado, lprado@gmail.com`

  testFunction(columnstorows, [originalFileContent], expectedFileContent);
}

// Execute the test function
testSwap();
testRowsToColumns();
testColumnsToRows();

// Execute the main function
processCSV();