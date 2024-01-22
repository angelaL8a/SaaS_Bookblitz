import dotenv from "dotenv";

// Configure environment variables from the '.env' file
dotenv.config(); // Load environment variables defined in the '.env' file into the Node.js process.

// Define the port on which the server will listen for HTTP requests.
export const PORT = process.env.PORT || 4000; // Configure the server port
// If an environment variable 'PORT' is found, it will be used; otherwise, the default port 4000 will be used.
