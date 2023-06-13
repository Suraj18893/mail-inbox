import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MailDetail from "./components/MailDetail";
import MailList from "./components/MailList";
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MailList />} />
        <Route path="/mail/:id" element={<MailDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
