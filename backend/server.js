const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./model/user.js");
const Course = require("./model/course.js");

mongoose.connect("mongodb+srv://mahfuj-nm-one:mahfuj123@nm-one-cluster.1jgtb.mongodb.net/nodemongoone?retryWrites=true&w=majority", () => {
  console.log("MongoDB Connected!");
});

const app = express();

app.use(cors());
app.use(express.json());

app.post("/users", (req, res) => {
  const items = {
    uid: req.body.uid,
    name: req.body.name,
    email: req.body.email,
    verified: req.body.verified,
  };

  const doc = new User(items);
  doc.save();
});

app.get("/users", async (req, res) => {
  const data = await User.find({});
  res.send(data);
});

app.post("/courses", (req, res) => {
  const items = {
    courseName: req.body.courseName,
    mentor: req.body.mentor,
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    price: req.body.price,
    rating: req.body.rating,
    color: req.body.color,
  };

  const doc = new Course(items);
  doc.save();
});

app.get("/courses", async (req, res) => {
  const data = await Course.find({});
  res.send(data);
});

app.get("/courses/:filter", async (req, res) => {
  const data = await Course.find({ courseName: req.params.filter });
  res.send(data);
});

app.get("/", (req, res) => {
  res.send("Hello MERN");
});

app.listen("8000", () => {
  console.log("Server running on 8000 port!");
});
