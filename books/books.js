//* Load Express *//
const express = require("express");
const app = express();

//* Load Mongoose *//
const Mongoose = require("mongoose");
// Connect mongoose
Mongoose.connect(
  "mongodb://juancamiloqhz:juancamilo2018@ds233212.mlab.com:33212/books-microservice-example",
  { useNewUrlParser: true },
  () => console.log("Database is connected!")
);

app.get("/", (req, res) => {
  res.send("This is our main Books endpoint!");
});

app.listen(4545, () => console.log("Books API running on port 4545..."));
