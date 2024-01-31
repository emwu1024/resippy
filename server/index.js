import express from "express"; // ES6 module syntax
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js"; // ES6 module syntax

// create an instance of the express application
const app = express();

// listen is a function of Express to start a server and listen to
// incoming connections with a callback function as second argument that
// gets executed when server starts
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to Database");
    // listen is a function of Express to start a server and listen to
    // incoming connections with a callback function as second argument that gets
    // executed when server starts
    app.listen(PORT, () => {
      console.log(`App is running on the port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
