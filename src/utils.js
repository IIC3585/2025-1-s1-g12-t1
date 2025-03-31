const fs = require('fs');

function openCSV(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8').trim();
    } catch (error) {
        console.error(`Error reading CSV file: ${error.message}`);
        return '';
    }
}

function readFirstLines(csvData, numLines) {
    const lines = csvData.split('\n');
    const firstLines = lines.slice(0, numLines);
    const data = firstLines.join('\n');
    console.log('\nA CONTINUACIÓN LA DATA ORIGINAL:')
    console.log('-------------------------');
    console.log(data);
    console.log('-------------------------');
  }

function saveDataToFile(data, fileName, outputType) {
    try {
      const filePath = `./output/${fileName}.${outputType}`;
      fs.writeFileSync(filePath, data, 'utf8');
    } catch (error) {
      console.error(`Error saving data to file: ${error.message}`);
    }
  }

module.exports = {
  openCSV,
  readFirstLines,
  saveDataToFile
};