const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  courseName: { type: String, required: true },
  mentor: { type: String, required: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, default: 4.8 },
  color: { type: String, required: true, default: "crimson" },
});

const Course = mongoose.model("course", courseSchema);

module.exports = Course;
