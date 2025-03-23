import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
// import { PORT } from "./config.js";
import recipesRoute from "./routes/recipesRoute.js";
import cors from "cors";

// create an instance of the express application
const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

// Rate Limiting Middleware:
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP Address. Please try again later.",
});

// middleware for parsing request body
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(
  mongoSanitize({
    replaceWith: "_", // Prevents dot notation attacks like {"profile.password": "hacked"}
    allowDots: false, // Ensures nested objects with dots are sanitized
  })
);
app.use(limiter);

// Allows all origins by default and prevents CORS errors from cropping up.
app.use(cors());

app.use("/recipes", recipesRoute);

// mongoose is a Object Data Modeling library for MongoDB in Node.js, connect() uses Promise based approach
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to Database");
    // listen is a function of Express to start a server and listen to incoming connections with a callback function as second argument that gets executed when server starts
    app.listen(port, () => {
      console.log(`App is running on the port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
