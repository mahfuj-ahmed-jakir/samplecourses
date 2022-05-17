import React, { useState } from "react";
import firebaseConfig from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [err, setErr] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();

  let handleSingin = () => {
    if (!email || !password) {
      setErr("Fill the all details!");
    } else if (password.length < 7) {
      setErr("Password need minimum 8 character!");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          setErr("");
          setEmail("");
          setPassword("");
          navigate("/");
        })
        .catch((error) => {
          if (error.code == "auth/wrong-password") {
            setErr("Wrong password!");
          } else if (error.code == "auth/user-not-found") {
            setErr("Wrong email!");
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
        <h1>Login your account</h1>
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
        <p>{err}</p>
        <button onClick={handleSingin}>Login</button>
        <Link to="/singup">Singup</Link>
      </div>
    </div>
  );
};

export default Login;
