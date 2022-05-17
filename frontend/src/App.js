import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Login from "./components/Login";
import Singup from "./components/Singup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
