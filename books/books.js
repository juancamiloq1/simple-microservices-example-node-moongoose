//* Load Express *//
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//* Load Mongoose *//
const Mongoose = require("mongoose");

require("./Book");
const Book = Mongoose.model("Book"); //.model("Book") make reference to the Book name model.

//* Connect mongoose *//
Mongoose.connect(
  "mongodb://juancamiloqhz:juancamilo2018@ds233212.mlab.com:33212/books-microservice-example",
  { useNewUrlParser: true },
  () => console.log("Database is connected!")
);

app.get("/", (req, res) => {
  res.send("This is our main Books endpoint!");
});

//* Create books funtionality *//
app.post("/book", (req, res) => {
  let newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher
  };

  let book = new Book(newBook);

  book
    .save()
    .then(() => {
      console.log("New book created!");
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
  res.send("A new book created with success!");
});

app.get("/books", (req, res) => {
  Book.find()
    .then(books => {
      res.status(200).json(books);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.get("/book/:id", (req, res) => {
  Book.findById({ _id: req.params.id })
    .then(book => {
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ not_found: "Book not found!" });
      }
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.listen(4545, () => console.log("Books API running on port 4545..."));
