////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Getting Started

// 1. Vanilla JS    2. React.js     3. Node.js (Express.js is a framework of Node.js)


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
const url = require('url');


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
    const pathName = url.parse(request.url,true).pathname;

    // Extracting query from the URL (basically the id part)
    const id = url.parse(request.url,true).query.id;

    if(pathName === '/products' || pathName === '/') {
        response.writeHead(200,{'Content-type':'text/HTML'}); // 200 is the status code number if everything goes fine, just like 404 is error
        response.end(`This is the products page!`);
    } 
    
    else if (pathName === '/laptop' && id < laptopData.length){
        response.writeHead(200,{'Content-type':'text/HTML'}); // 200 is the status code number if everything goes fine, just like 404 is error
        response.end(`This is the laptop page for laptop id: ${id}!`); // Example URL -> http://127.0.0.1:1337/laptop?id=4
    }

    else {
        response.writeHead(404,{'Content-type':'text/HTML'}); // 200 is the status code number if everything goes fine, just like 404 is error
        response.end(`URL was not found!`);
    }
});

// Listen to the port 
// Type in 127.0.0.1:1337 on a browser to see the functionality
server.listen(1337,'127.0.0.1', () => {
    console.log("Listening to requests now")
}); // Default port number -> 1337 and our localhost is 127.0.01


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
