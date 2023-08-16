import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Landing from "./Admin/Landing.jsx";
import Home from "./Admin/Home.jsx";
import TakeTally from "./poll/TakeTally.jsx";
import TallyCreate from "./Admin/TallyCreate.jsx";
import "../styles.css";

const App = () => {
  return (
    <div>
      <h1>Tally.io</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<TallyCreate />} />
          {/* <Route path='/test' element={<TakeTally />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
