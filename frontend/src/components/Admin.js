import React, { useState } from "react";
import axios from "axios";

const Admin = () => {
  let [courseName, setCourseName] = useState("");
  let [mentor, setMentor] = useState("");
  let [title, setTitle] = useState("");
  let [thumbnail, setThumbnail] = useState("");
  let [price, setPrice] = useState("");
  let [rating, setRating] = useState("");
  let [color, setColor] = useState("");
  let [err, setErr] = useState("");

  let handleAdded = () => {
    if (!courseName || !mentor || !title || !thumbnail || !price || !rating || !color) {
      setErr("Fill the all details!");
    } else if (rating == "Rating") {
      setErr("Enter rating number!");
    } else {
      // Req server
      axios.post("http://localhost:8000/courses", {
        courseName: courseName,
        mentor: mentor,
        title: title,
        thumbnail: thumbnail,
        price: price,
        rating: rating,
        color: color,
      });

      // Value
      setCourseName("");
      setMentor("");
      setTitle("");
      setThumbnail("");
      setPrice("");
      setRating("");
      setColor("");
      setErr("");
    }
  };

  return (
    <div id="singup">
      <div className="singup">
        <h1>Add a course</h1>
        <input value={courseName} onChange={(e) => setCourseName(e.target.value)} type="text" placeholder="Enter course name" />
        <input value={mentor} onChange={(e) => setMentor(e.target.value)} type="text" placeholder="Enter mentor name" />
        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter title" />
        <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter price" />
        <input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} type="text" placeholder="Enter thumbnail link" />
        <select name="rating" onChange={(e) => setRating(e.target.value)} className="select_course">
          <option>Rating</option>
          <option>1</option>
          <option>1.5</option>
          <option>2</option>
          <option>2.5</option>
          <option>3</option>
          <option>3.5</option>
          <option>4</option>
          <option>4.5</option>
          <option>5</option>
        </select>
        <input onChange={(e) => setColor(e.target.value)} className="admin_color" type="color" />
        <p>{err}</p>
        <button onClick={handleAdded}>ADD +</button>
      </div>
    </div>
  );
};

export default Admin;
