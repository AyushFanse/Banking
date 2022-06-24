import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React from "react";
import Display from "../Display/Display";
import Error from "../Error/Error";

function RoutesPage() {

  const URL = `https://sahaj-banking.herokuapp.com`;

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Display URL={URL} />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default RoutesPage;
