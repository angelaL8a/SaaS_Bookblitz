// CORS Configuration for Express

// Define an array of allowed origins (whitelist)
const whitelist = ["http://localhost:5173"];

// Export the CORS options
export const corsOptions = {
  origin: function (origin, callback) {
    // Check if the requesting origin is in the whitelist
    if (whitelist.indexOf(origin) !== -1) {
      // If the origin is in the whitelist, allow the request
      callback(null, true);
    } else {
      // If the origin is not in the whitelist, reject the request with an error
      callback(new Error("Not allowed by CORS"));
    }
  },
};
