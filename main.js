const { openCSV, readFirstLines, saveDataToFile } = require('./src/utils');
const { runTest, getTestCases } = require('./src/tests');

function runAllTests() {
  const csvData = openCSV('src/data.csv');
  readFirstLines(csvData, 5);
  const testCases = getTestCases(csvData);

  testCases.forEach(({ name, fn, input, outputType, expected }) => {
    const output = fn(...input).trim();
    runTest(name, output, expected);
    saveDataToFile(output, name, outputType);
  });
}

runAllTests();
