const app = require("./app");
const cloudinary = require("cloudinary");
const connectToMongo = require("./db");


// handling uncaught exception
// like variable name is not defined
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

// config
if(process.env.NODE_ENV !== "PRODUCTION"){
  require("dotenv").config({ path: "backend/config/config.env" });
};


connectToMongo();

// Configure after mongoose connect
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.API_SECRET,
});

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});

//Unhandeled promise rejections like invalid connection string
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandeled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
