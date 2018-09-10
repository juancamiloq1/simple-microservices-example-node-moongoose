const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

require("./Customer");
const Customer = mongoose.model("Customer");

//* Connect mongoose *//
mongoose.connect(
  "mongodb://juancamiloqhz:juancamilo2018@ds149252.mlab.com:49252/customers-microservices-example",
  { useNewUrlParser: true },
  () => console.log("Customer database is connected!")
);

app.get("/", (req, res) => {
  res.send("This is our main Customers endpoint!");
});

//* Create books funtionality *//
app.post("/customer", (req, res) => {
  let newCustomer = {
    name: req.body.name,
    age: req.body.age,
    imageUrl: req.body.imageUrl,
    address: req.body.address
  };

  let customer = new Customer(newCustomer);

  customer
    .save()
    .then(() => {
      console.log("New customer created!");
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
  res.send("A new Customer created with success!");
});

app.get("/customers", (req, res) => {
  Customer.find()
    .then(customers => {
      res.status(200).json(customers);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.get("/customer/:id", (req, res) => {
  Customer.findById({ _id: req.params.id })
    .then(customer => {
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ not_found: "Customer not found!" });
      }
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/customer/:id", (req, res) => {
  Customer.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json("Customer removed with success!"))
    .catch(err => res.status(400).json("Customer NOT removed!"));
});

app.listen(5555, () => console.log("Customers API running on port 5555..."));
