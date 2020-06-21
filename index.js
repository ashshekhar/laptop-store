////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Getting Started

// 1. Vanilla JS    2. React.js     3. Node.js (Express.js is a framework of Node.js)

// Node.js is to implement the server side, we run it on the server and is not limited to just a browser running our HTML, CSS and JS
// There is no concept of files and folders in Node.js, everything is kind of a request

// Just write node on the terminal and it enters the console mode
// If you want to create your file like index.js and run, then be in the home directory (starter here) and type node index.js
// To automate the execute, we install nodemon, and just type nodemon to start it, instead of having to write node index.js everytime

// console.log("Hello World!");
// console.log("Second log");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Installing modules

// File System
const fs = require("fs");

// HTTP for web servers
const http = require("http");

// URL module for routing
const url = require("url");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Basics

// ${__dirname} is the directory name, here starter (automatically)
// utf-8 is the character encoding
const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");

// Turns the JSON data into an object
// laptopData eventually is an array containing all the laptop objects
const laptopData = JSON.parse(json);
console.log(laptopData);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Creating web servers
// In real world, people use a node framework called Express to handle routing and all

// Create server
const server = http.createServer((request, response) => {
  // Routing -> Implement different responses for different URLs
  const pathName = url.parse(request.url, true).pathname;

  // Extracting query from the URL (basically the id part)
  const id = url.parse(request.url, true).query.id;

  // 1. All Products Overview
  if (pathName === "/products" || pathName === "/") {
    response.writeHead(200, { "Content-type": "text/HTML" }); // 200 is the status code number if everything goes fine, just like 404 is error
    // response.end(`This is the products page!`);

    // Asynchronous file read, to avoid stopping the whole program waiting for this function to execute
    fs.readFile(
      `${__dirname}/templates/template-overview.html`,
      "utf-8",
      (error, data) => {
        let overviewOutput = data;
        fs.readFile(
          `${__dirname}/templates/template-card.html`,
          "utf-8",
          (error, data) => {
            const cardsOutput = laptopData
              .map((el) => replaceTemplate(data, el))
              .join("");
            overviewOutput = overviewOutput.replace("{%CARDS%}", cardsOutput);
            response.end(overviewOutput);
          }
        );
      }
    );

    // 2. Laptop Details
  } else if (pathName === "/laptop" && id < laptopData.length) {
    response.writeHead(200, { "Content-type": "text/HTML" }); // 200 is the status code number if everything goes fine, just like 404 is error
    // response.end(`This is the laptop page for laptop id: ${id}!`); // Example URL -> http://127.0.0.1:1337/laptop?id=4

    // Asynchronous file read, to avoid stopping the whole program waiting for this function to execute
    fs.readFile(
      `${__dirname}/templates/template-laptop.html`,
      "utf-8",
      (error, data) => {
        const laptop = laptopData[id];
        const output = replaceTemplate(data, laptop);
        response.end(output);
      }
    );
  }

  // 3. Route for Images
  else if (/\.(jpg|jpeg|gif|png)$/i.test(pathName)) {
    fs.readFile(`${__dirname}/data/img${pathName}`, (error, data) => {
      response.writeHead(200, { "Content-type": "image/jpeg" });
      response.end(data);
    });
  }

  // 4. URL not found
  else {
    response.writeHead(404, { "Content-type": "text/HTML" }); // 200 is the status code number if everything goes fine, just like 404 is error
    response.end(`URL was not found!`);
  }
});

// Listen to the port
// Type in 127.0.0.1:1337 on a browser to see the functionality
server.listen(1337, "127.0.0.1", () => {
  console.log("Listening to requests now");
}); // Default port number -> 1337 and our localhost is 127.0.01

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Templating -> Technique of coding one HTML template and using it for different ids, that is different URLs

function replaceTemplate(originalHtml, laptop) {
  let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
  output = output.replace(/{%IMAGE%}/g, laptop.image);
  output = output.replace(/{%PRICE%}/g, laptop.price);
  output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
  output = output.replace(/{%SCREEN%}/g, laptop.screen);
  output = output.replace(/{%CPU%}/g, laptop.cpu);
  output = output.replace(/{%STORAGE%}/g, laptop.storage);
  output = output.replace(/{%RAM%}/g, laptop.ram);
  output = output.replace(/{%ID%}/g, laptop.id);
  return output;
}
