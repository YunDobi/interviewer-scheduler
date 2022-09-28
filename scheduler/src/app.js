import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Application from "components/Application";
import Login from "components/Login";

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="admin" element={<Application />} component={<Application />}></Route>
          <Route path="main" element={<Application />} component={<Application />}></Route>
        </Routes>
    </Router>
  );
}
