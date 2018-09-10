const mongoose = require("mongoose");

mongoose.model("Customer", {
  name: {
    type: String,
    require: true
  },
  imageUrl: {
    type: String,
    require: false
  },
  age: {
    type: Number,
    require: true
  },
  address: {
    type: String,
    require: false
  }
});
