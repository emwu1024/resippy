import React, { useState } from "react";
import "./ToggleButton.css";

interface ToggleButtonProps {
  isStandardised: boolean;
  setIsStandardised: React.Dispatch<React.SetStateAction<boolean>>;
  leftText?: string;
  rightText?: string;
  leftDesc?: string;
  rightDesc?: string;
}

const ToggleButton = (props: ToggleButtonProps) => {
  return (
    <div>
      <div className="toggle-container">
        {props.leftText ? (
          <div>
            <span className="toggle-text">{props.leftText}</span>
          </div>
        ) : null}
        <div>
          <label className="switch">
            <input
              type="checkbox"
              onChange={() => props.setIsStandardised(!props.isStandardised)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        {props.rightText ? (
          <div>
            <span className="toggle-text">{props.rightText}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ToggleButton;
