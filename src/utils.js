const fs = require('fs');

function openCSV(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading CSV file: ${error.message}`);
        return '';
    }
}

function readFirstLines(csvData, numLines) {
    const lines = csvData.split('\n');
    const firstLines = lines.slice(0, numLines);
    const data = firstLines.join('\n');
    console.log(`First ${numLines} lines of CSV)`);
    console.log('-------------------------');
    console.log(data, '\n');
  }

function saveDataToFile(filePath, data) {
    try {
      fs.writeFileSync(filePath, data, 'utf8');
      console.log(`Data saved to ${filePath}`);
    } catch (error) {
      console.error(`Error saving data to file: ${error.message}`);
    }
  }

  function readStatus(f) {
    console.log(`=> Función: ${f}`);
    console.log('-------------------------');
  }

  module.exports = {
    openCSV,
    readFirstLines,
    saveDataToFile,
    readStatus
  };