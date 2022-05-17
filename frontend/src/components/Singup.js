import React, { useState } from "react";
import firebaseConfig from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Singup = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [err, setErr] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();

  let handleSingup = () => {
    if (!name || !email || !password) {
      setErr("Fill the all details!");
    } else if (password.length < 7) {
      setErr("Password need minimum 8 character!");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "https://www.w3schools.com/w3images/avatar2.png",
          }).then(() => {
            // Profile updated!
            setErr("");
            setName("");
            setEmail("");
            setPassword("");
            axios.post("http://localhost:8000/users", {
              uid: auth.currentUser.uid,
              name: auth.currentUser.displayName,
              email: auth.currentUser.email,
              verified: auth.currentUser.emailVerified,
            });
            navigate("/");
          });
        })
        .catch((error) => {
          if (error.code == "auth/invalid-email") {
            setErr("Invalid email!");
          } else if (error.code == "auth/email-already-in-use") {
            setErr("This email already in use!");
          } else {
            setErr("");
          }
        });
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div id="singup">
      <div className="singup">
        <h1>Create a new account</h1>
        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name" />
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
        <p>{err}</p>
        <button onClick={handleSingup}>Singup</button>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Singup;
