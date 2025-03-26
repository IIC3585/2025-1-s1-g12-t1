const { openCSV, readFirstLines, saveDataToFile, readStatus } = require('./src/utils');
const { insertcolumn, rowdelete, columndelete, insertrow, tohtmltable } = require('./src/functions');

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

// Execute the main function
processCSV();
