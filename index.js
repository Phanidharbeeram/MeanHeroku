const express = require("express");
const compression = require('compression')
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const api = require("./Routes/api");
const app = express();

const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(cors());
app.use(compression())
app.use(express.static(path.join(__dirname, "public")));
app.use("/route", api);
mongoose.connect(
  "mongodb+srv://PhanidharBeeram:Phani12zebra@heroku-y2fob.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (req, res) => {
    console.log("Connected to MongoDb");
  }
);
mongoose.set("useFindAndModify", false);

// app.get("/", (req, res) => {
//   res.send("hello");
// });
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.listen(port, (req, res) => {
  console.log("server connected at:" + port);
});
