const router = require("express").Router();
const Workout = require("../models/Workout.js");


router.get("/workouts", (req, res) => {
    Workout.find({})
      .then((dbWorkout) => {
        res.status(200).json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  
  router.post("/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, {
      $push: { exercises: req.body }
    })
      .then((dbExercise) => {
        res.status(200).json(dbExercise);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  
  router.post("/workouts", (req, res) => {
    Workout.create(req.body)
      .then((workout) => {
        res.status(200).json(workout);
      })
      .catch((err) => {
        res.status(400).workoutjson(err);
      });
  });
  
  router.get("/workouts/range", (req, res) => {
    Workout.find({})
      .then((dbWorkout) => {
        res.status(200).json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  
  module.exports = router;