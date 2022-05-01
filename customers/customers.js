const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json());

const mongoose = require("mongoose");

require("./Customer");

const Customer = mongoose.model("Customer");

const start = async () => {
  mongoose
    .connect(
      `mongodb+srv://ikhal:${process.env.PASSWORD}@cluster1.m9jhq.mongodb.net/Cluster1?retryWrites=true&w=majority`
    )
    .then(() => console.log("Database is Connected!!!"))
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

start();

app.get("/", (req, res) => {
  console.log("This is the HomePage!");
  res.send("This is the customers service!");
});

app.post("/customer", (req, res) => {
  const newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };

  const customer = new Customer(newCustomer);

  customer
    .save()
    .then(() => console.log("New customer is created!"))
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  res.send("A customer is created successfully!");
});

app.get("/customers", (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get("/customer/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => {
      if (customer) {
        res.json(customer);
      } else {
        res.send("Invalid ID!!!");
      }
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/customer/:id", (req, res) => {
  Customer.findOneAndRemove(req.params.id)
    .then(() => console.log("Customer deleted!"))
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  res.send("The customer was deleted successfully!");
});

app.listen("5555", () => {
  console.log("Up and Running - This is our Customers service!");
});
