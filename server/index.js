import express from 'express'; // ES6 module syntax
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js'; // ES6 module syntax
import recipesRoute from './routes/recipesRoute.js';
import cors from 'cors';

// create an instance of the express application
const app = express();

// middleware for parsing request body
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Allows all origins by default and prevents CORS errors from cropping up.
app.use(cors());

app.use('/recipes', recipesRoute);

// mongoose is a Object Data Modeling library for MongoDB in Node.js, connect() uses Promise based approach
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected to Database');
    // listen is a function of Express to start a server and listen to incoming connections with a callback function as second argument that gets executed when server starts
    app.listen(PORT, () => {
      console.log(`App is running on the port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
