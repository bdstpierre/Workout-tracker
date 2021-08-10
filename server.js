const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public", {
  extensions: ['html']
}));

// Open a connection to the MongoDB using mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false});

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .populate('exercises')
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/exercises", (req, res) => {
  db.Exercise.find({})
  // .populate('exercises')
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts/:id", (req, res) => {
  db.Exercise.create(body)
  .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id }}, {new: true}))
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    // .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
