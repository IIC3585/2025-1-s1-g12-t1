const green = '\x1b[32m';
const red = '\x1b[31m';
const blue = '\x1b[34m';
const noColor = '\x1b[0m';
const setGreen = (str) => `${green}${str}${noColor}`;
const setRed = (str) => `${red}${str}${noColor}`;
const setBlue = (str) => `${blue}${str}${noColor}`;

module.exports = {
  setGreen,
  setRed,
  setBlue
}