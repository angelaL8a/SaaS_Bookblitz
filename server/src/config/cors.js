// CORS Configuration for Express

// Define an array of allowed origins (whitelist)
const whitelist = ["http://localhost:5173", "http://localhost:4000"];

// Export the CORS options
export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (whitelist.indexOf(origin) === -1) {
      return callback(
        new Error(
          `This site ${origin} does not have an access. Only specific domains are allowed to access it.`
        ),
        false
      );
    }

    return callback(null, true);
  },
  credentials: true,
};
