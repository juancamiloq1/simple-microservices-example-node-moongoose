const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("This is our main Books endpoint!");
});

app.listen(4545, () => console.log("Books API running on port 4545..."));
