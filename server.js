const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Open a connection to the MongoDB using mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false});

// routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
