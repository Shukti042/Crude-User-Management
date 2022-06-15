import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import UserManagement from "./components/user-management.component"

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<UserManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
