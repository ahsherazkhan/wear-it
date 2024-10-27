import React, { useState } from 'react';
import '../styles/getStarted.css';
import img from './getstarted.png';
import DragAndDrop from "./DragAndDrop.js";

const GetStarted = () => {
  const [showDragAndDrop, setShowDragAndDrop] = useState(false);

  const handleGetStartedClick = () => {
    setShowDragAndDrop(true);
  };

  return (
    <div className="try-on-extension">
      {!showDragAndDrop ? (
        <>
          <div className="illustration">
            <img src={img} alt="Virtual Try-On" />
          </div>

          <h2>Discover the future of fashion<br /> with our Smart Virtual Try-On.</h2>
          <p>
            where you can seamlessly try on clothes in real-time, explore personalized fits, and find your perfect style without ever leaving home.
          </p>

          <button className="get-started-button" onClick={handleGetStartedClick}>
            Get Started!
          </button>
        </>
      ) : (
        <DragAndDrop />
      )}
    </div>
  );
};

export default GetStarted;
