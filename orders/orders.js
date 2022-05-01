const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
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
    CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: mongoose.Types.ObjectId(req.body.BookID),
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
  res.send("Your order was successfully saved!");
});

app.get("/orders", (req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id).then((order) => {
    if (order) {
      axios
        .get("http://localhost:5555/customer/" + order.CustomerID)
        .then((response) => {
          let orderObject = {
            customerName: response.data.name,
            bookTitle: "",
          };
          axios
            .get("http://localhost:4545/book/" + order.BookID)
            .then((response) => {
              console.log("here", response.data.title);
              orderObject.bookTitle = response.data.title;
              res.json(orderObject);
            });
        });
    } else {
      res.send("Invalid Order");
    }
  });
});

app.listen(7777, () => {
  console.log("Up and Runnig! -- This is the Orders service!");
});
