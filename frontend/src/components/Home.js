import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { async } from "@firebase/util";
import axios from "axios";

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  let [coursesList, setCoursesList] = useState([]);
  let [coursesFilter, setCoursesFilter] = useState([]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(auth.currentUser.displayName);
    } else {
      // User is signed out
      navigate("/login");
    }
  });

  let handleSingout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    async function courses() {
      const data = await axios.get("http://localhost:8000/courses");
      setCoursesList(data.data);
    }
    courses();
  }, []);

  let handleFilter = async (e) => {
    const data = await axios.get(`http://localhost:8000/courses/${e.target.value}`);
    setCoursesList(data.data);
  };

  useEffect(() => {
    async function courses() {
      const data = await axios.get("http://localhost:8000/courses");
      setCoursesFilter(data.data);
    }
    courses();
  }, []);

  return (
    <div>
      <button className="btn" onClick={handleSingout}>
        LOG OUT
      </button>
      <select onChange={handleFilter}>
        <option value="">All</option>
        {coursesFilter.map((item) => (
          <option>{item.courseName}</option>
        ))}
      </select>
      <div id="home">
        {coursesList.map((item) => (
          <div key={item._id} className="home">
            <div className="home_img">
              <img src={item.thumbnail} />
            </div>
            <h5 className="home_pos" style={{ background: item.color }}>
              {item.courseName}
            </h5>
            <h1>{item.title}</h1>
            <h2>
              Mentor : <span>{item.mentor}</span>
            </h2>
            <div className="price_rating">
              <Rating rating={item.rating} />
              <p>{item.price}</p>
            </div>
            <button style={{ background: item.color }} className="enroll_btn">
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
