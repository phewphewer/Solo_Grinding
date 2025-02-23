require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// middleware
app.use(express.json());
app.use((request, response, next) => {
  console.log(request.path, request.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected on DB . . Listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Connection Failure");
  });
