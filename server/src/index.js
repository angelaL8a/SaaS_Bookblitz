// Import necessary modules
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/cors.js";
import { PORT } from "./config/env.js";

const app = express(); // Create an instance of the Express application.

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Start the server
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
