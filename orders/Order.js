const mongoose = require("mongoose");

mongoose.model("Order", {
  CustomerID: {
    type: String,
    required: false,
  },
  BookID: {
    type: String,
    required: false,
  },
  initialDate: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: String,
    required: true,
  },
});
