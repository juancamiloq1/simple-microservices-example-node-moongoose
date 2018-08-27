//* Load Express *//
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

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

// Create books funtionality
app.post("/book", (req, res) => {
  console.log(req.body);
  res.send("00:D");
});

app.listen(4545, () => console.log("Books API running on port 4545..."));
