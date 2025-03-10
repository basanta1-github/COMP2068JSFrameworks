// Importing necessary modules
const connect = require("connect"); // Connect framework for building a middleware stack
const url = require("url"); // Node.js URL module to parse request URLs
const http = require("http"); // Node.js HTTP module to create the server

// Function to perform calculations based on URL parameters
function calculate(req, res) {
  // Parse the URL and extract the query parameters
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query; // Query object containing parameters like 'method', 'x', and 'y'

  // Extract the 'method' parameter and convert it to lowercase
  const method = query.method ? query.method.toLowerCase() : null;

  // Extract and parse 'x' and 'y' parameters from query as floating point numbers
  const x = parseFloat(query.x);
  const y = parseFloat(query.y);

  let result; // Variable to store the calculation result

  // Check if either 'x' or 'y' is not a valid number
  if (isNaN(x) || isNaN(y)) {
    // If invalid, send a 400 (Bad Request) response with an error message in JSON format
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "x and y must be valid numbers." }));
    return; // Exit the function early
  }

  // Perform the calculation based on the method provided in the URL
  switch (method) {
    case "add": // Addition case
      result = `${x} + ${y} = ${x + y}`; // Calculate and format the result as a string
      break; // Exit the switch statement

    case "subtract": // Subtraction case
      result = `${x} - ${y} = ${x - y}`; // Calculate and format the result as a string
      break; // Exit the switch statement

    case "multiply": // Multiplication case
      result = `${x} * ${y} = ${x * y}`; // Calculate and format the result as a string
      break; // Exit the switch statement

    case "divide": // Division case
      // Check if 'y' is 0 to prevent division by zero
      if (y === 0) {
        // If division by zero, send a 400 error response with a relevant error message
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Division by zero is not allowed." }));
        return; // Exit the function early
      }
      // If valid, perform the division and format the result as a string
      result = `${x} / ${y} = ${x / y}`;
      break; // Exit the switch statement

    default: // If an invalid method is provided
      // Send a 400 error response with a message stating the allowed methods
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error:
            "Invalid method. Please use add, subtract, multiply, or divide.",
        })
      );
      return; // Exit the function early
  }

  // **SECTION BREAK**: Returning the result after successful calculation
  // Send the result in a plain text format (even though we used a 400 status here)
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(result); // Send the result as the response body
}

// **SECTION BREAK**: Setup Connect server and middleware stack

// Create an instance of the Connect framework
const app = connect();

// **SECTION BREAK**: Middleware to log all incoming requests

// This middleware will log every request with a timestamp, method, and URL
app.use((req, res, next) => {
  // Log the timestamp, HTTP method (GET, POST, etc.), and the URL of the request
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware in the stack
});

// **SECTION BREAK**: Route handling for the '/lab3' endpoint

// Define the '/lab3' route where calculations are performed
app.use("/lab3", calculate); // The 'calculate' function will handle requests to '/lab3'

// **SECTION BREAK**: 404 Error handler for undefined routes

// This middleware will handle requests to any undefined routes
app.use((req, res) => {
  // If the route is not found, return a 404 error with a message in JSON format
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
});

// **SECTION BREAK**: Create the HTTP server and listen for requests

// Create the HTTP server using the Connect app as the request handler
const server = http.createServer(app);

// Make the server listen on port 3000, and log when the server is running
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/lab3");
});
