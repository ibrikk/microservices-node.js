const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const mongoose = require("mongoose");
require("./Order");
const Order = mongoose.model("Order");

const start = async () => {
  mongoose
    .connect(
      `mongodb+srv://ikhal:Qwerty12@cluster0.isnui.mongodb.net/Cluster0?retryWrites=true&w=majority`
    )
    .then(() => console.log("Database is connected!"))
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

start();

app.get("/", (req, res) => {
  console.log("Orders service");
  res.send("This is the orders service!");
});

app.post("/order", (req, res) => {
  const newOrder = {
    customerId: req.body.CustomerID,
    bookId: req.body.BookID,
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate,
  };
  const order = new Order(newOrder);

  order
    .save()
    .then(() => console.log("Order saved!"))
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  res.send("Your order was successfully saved");
});

app.listen(7777, () => {
  console.log("Up and Runnig! -- This is the Orders service!");
});
