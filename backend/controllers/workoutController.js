const { request } = require("express");
const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (request, response) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  response.status(200).json(workouts);
};
// get a single workouts
const getWorkout = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No Such workout" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return response.status(404).json({ error: "No such workout" });
  }
  response.status(200).json(workout);
};
// create new workout
const createWorkout = async (request, response) => {
  const { title, reps, load } = request.body;

  //add doc to db
  try {
    const workout = await Workout.create({ title, reps, load });
    response.status(201).json(workout);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No Such workout" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return response.status(400).json({ error: "No such workout" });
  }
  response.status(200).json(workout);
};

// update a workout
const updateWorkout = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No Such workout" });
  }
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...request.body,
    }
  );

  if (!workout) {
    return response.status(400).json({ error: "No such workout" });
  }
  response.status(200).json(workout);
};
module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
