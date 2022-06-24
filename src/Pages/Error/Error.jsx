import React from "react";
import { useNavigate } from 'react-router-dom';
import "../Display/display.css";

const Error = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className='EditButton' onClick={() => { navigate(-1) }}>
        <i className="fas fa-arrow-left"></i>
      </div>
      <div className='App'>
        <header className='App-header'>
          <div className="App-Error">
            <img src="https://i.ibb.co/fQnY17V/pngegg-2.png" alt="pngegg-2" border="0" />
          </div>
        </header>
      </div>
    </>
  );
};

export default Error;
