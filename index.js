// Just write node on the terminal and it enters the console mode
// If you want to create your file like index.js and run, then be in the home directory (starter here) and type node index.js
// To automate the execute, we install nodemon, and just type nodemon to start it, instead of having to write node index.js everytime

// console.log("Hello World!");
// console.log("Second log");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Installing file system modules
const fs = require("fs");

// ${__dirname} is the directory name, here starter (automatically)
// utf-8 is the character encoding
const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");

// Turns the JSON data into an object
const laptopData = JSON.parse(json);
console.log(laptopData);

// Node.js was originally created to create web servers