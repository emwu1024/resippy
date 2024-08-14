import React, { useState } from "react";
import "./HideyPanel.css";

const HideyPanel = (props: any) => {
  const [isAnimationDone, setIsAnimationDone] = useState(true);

  return (
    <div
      className={`draw-outline-container ${
        props.isDisplayed ? "draw-outline-container-active" : ""
      }`}
    >
      <div className="hidey-panel-container">
        <div
          className={`hidey-panel ${
            props.isDisplayed ? "hidey-panel-active" : ""
          } ${isAnimationDone ? "" : "nudge"}`}
          onAnimationEnd={() => setIsAnimationDone(true)}
          onMouseEnter={() => setIsAnimationDone(false)}
        >
          {" "}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default HideyPanel;
