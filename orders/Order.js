const mongoose = require("mongoose");

mongoose.model("Order", {
  CustomerID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  BookID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  initialDate: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  deliveryDate: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});
