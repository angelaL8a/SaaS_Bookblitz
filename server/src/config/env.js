// This file configures the necessary environment variables for the application.
// Environment variables are sourced from a .env file and validated using env-var library.

import "dotenv/config"; // Loads environment variables from the .env file.

import env from "env-var"; // Imports the env-var library for secure environment variable validation and retrieval.

export const envs = {
  // Defines an object "envs" to store the environment variables required by the application.

  PORT: env.get("PORT").required().asPortNumber(),
  // Defines the "PORT" environment variable and retrieves it from env-var as a port number.
  // This variable is required to be present in the .env file.

  JWT_SECRET: env.get("JWT_SECRET").required().asString(),
  // Defines the "JWT_SECRET" environment variable and retrieves it from env-var as a string.
  // This variable is required to be present in the .env file and should be a string.

  MAIL_USER: env.get("MAIL_USER").required().asString(),
  MAIL_PASS: env.get("MAIL_PASS").required().asString(),
};
