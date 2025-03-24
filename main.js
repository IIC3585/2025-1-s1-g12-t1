const { openCSV, readFirstLines, saveDataToFile, readStatus } = require('./src/utils');
const { insertcolumn, tohtmltable } = require('./src/functions');

// Main function to process CSV data
async function processCSV() {
  try {
    let data = openCSV('src/data.csv');
    readFirstLines(data, 5);

    /* ################# FUNCIONES ################# */

    // Insertar datos en una nueva columna
    readStatus('columnToAdd');
    const columnToAdd = ['New A', 'New B', 'New C'];
    data = insertcolumn(data, 3, columnToAdd);
    console.log(data, '\n');
    
    // Convertir datos a formato tabla HTML
    readStatus('tohtmltable');
    let dataTable = tohtmltable(data);
    console.log(dataTable, '\n');

    /* ############################################ */

    saveDataToFile('output/data_modified.csv', data);
    saveDataToFile('output/data_table.html', dataTable);

  } catch (error) {
    console.error(`Error processing CSV: ${error.message}`);
  }
}

// Execute the main function
processCSV();
