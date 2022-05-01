const mongoose = require("mongoose");

mongoose.model("Customer", {
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
