const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const path = require("path");
const registerModel = require("./database/models");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));
const uri = process.env.DB_URI;
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

app.post("/add", (req, res) => {
  data = new registerModel(req.body);
  data
    .save()
    .then((result) => {
      res.end("SUCCESS");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Registration.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "gallery.html"));
});

app.get("/camps", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "our camps.html"));
});

app.get("/whygiveblood", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Why give blood.html"));
});

mongoose
  .connect(uri, connectionParams)
  .then(() => {
    console.log("Connected to database ");
    app.listen(port, () => {
      console.log(`Blood donation project is live at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
