import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import HeadeRoute from "./components/HeaderRoute";
import SearchPage from "./components/SearchPage";
import Details from "./components/Details";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";



function App() {
  return (
    <div style={{ backgroundColor: "#040714", minHeight: "100vh" }}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/category/:route" element={<HeadeRoute />} />
            <Route exact path="/search" element={<SearchPage />} />
            <Route exact path="/detail/:_id" element={<Details />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
