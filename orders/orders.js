const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.json());

mongoose.connect(
  "mongodb://juancamiloqhz:juancamilo2018@ds155292.mlab.com:55292/orders-microservices-example",
  { useNewUrlParser: true },
  () => {
    console.log("Database connected - Orders Service");
  }
);

// Model is Loaded
require("./Order");
const Order = mongoose.model("Order");

app.get("/orders", (req, res, next) => {
  Order.find()
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.post("/order", (req, res, next) => {
  let newOrder = {
    customerID: mongoose.Types.ObjectId(req.body.customerID),
    bookID: mongoose.Types.ObjectId(req.body.bookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate
  };
  let order = new Order(newOrder);
  order
    .save()
    .then(() => {
      res.status(200).send("Order created with success!");
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.listen(7777, () => {
  console.log("Up and running in port 7777 - Orders service");
});
