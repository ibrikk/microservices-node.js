const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());

const mongoose = require("mongoose");

require("./Book");
const Book = mongoose.model("Book");

const start = async () => {
  mongoose
    .connect(
      `mongodb+srv://ikhal:${process.env.PASSWORD}@cluster0.vikwg.mongodb.net/Cluster0?retryWrites=true&w=majority`
    )
    .then(() => console.log("Database is connected!"))
    .catch((err) => console.error(err));
};

start();
app.get("/", (req, res) => {
  res.send("This is the books service");
});

app.post("/book", (req, res) => {
  const newBook = {
    title: req.body.title,
    author: req.body.author,
    numberOfPages: req.body.numberOfPages,
    publisher: req.body.publisher,
  };

  const book = new Book(newBook);

  book
    .save()
    .then(() => {
      console.log("New book created!");
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  res.send("A new book is created with success!");
});

app.get("/books", (req, res) => {
  Book.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/book/:id", (req, res) => {
  // res.send(req.params.id);
  Book.findById(req.params.id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/book/:id", (req, res) => {
  Book.findOneAndRemove(req.params.id)
    .then(() => console.log("Book removed!"))
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  res.send("The book was successfully removed!");
});

app.listen(4545, () => {
  console.log("Up and Running!! -- This is our Books service");
});
