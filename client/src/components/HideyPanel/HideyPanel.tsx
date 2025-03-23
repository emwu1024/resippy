import React, { useState } from "react";
import "./HideyPanel.css";

const HideyPanel = (props: any) => {
  const [isNudgeDone, setIsNudgeDone] = useState(true);
  const [isSwingingDone, setIsSwingingDone] = useState(false);

  const onAnimationEnd = async (e: React.AnimationEvent<HTMLDivElement>) => {
    setIsNudgeDone(true);
    setIsSwingingDone(true);
  };

  return (
    <div
      className={`draw-outline-container ${
        props.isDisplayed ? "draw-outline-container-active" : ""
      }`}
    >
      <div className="hidey-panel-container">
        <div
          className={`hidey-panel ${
            props.isDisplayed && !isSwingingDone ? "hidey-panel-active" : ""
          } ${isNudgeDone ? "" : "nudge"} ${isSwingingDone ? "visible" : ""}`}
          onAnimationEnd={(e) => onAnimationEnd(e)}
          onMouseEnter={() => setIsNudgeDone(false)}
        >
          {" "}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default HideyPanel;
