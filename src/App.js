// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SinittoMain from "./pages/SinittoMain";
import ProtectorMain from "./pages/ProtectorMain";
import Redirection from './pages/Redirection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/redirection" element={<Redirection />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sinitto-main" element={<SinittoMain />} />
        <Route path="/protector-main" element={<ProtectorMain />} />
      </Routes>
    </Router>
  );
}

export default App;
