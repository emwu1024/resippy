import React, { useState } from "react";
import "./ToggleButton.css";

interface ToggleButtonProps {
  isRichText: boolean;
  setIsRichText: React.Dispatch<React.SetStateAction<boolean>>;
  leftText?: string;
  rightText?: string;
}

const ToggleButton = (props: ToggleButtonProps) => {
  return (
    <div className="toggle-container">
      {props.leftText ? (
        <span className="toggle-text">{props.leftText}</span>
      ) : null}
      <label className="switch">
        <input
          type="checkbox"
          onChange={() => props.setIsRichText(!props.isRichText)}
        />
        <span className="slider round"></span>
      </label>
      {props.rightText ? (
        <span className="toggle-text">{props.rightText}</span>
      ) : null}
    </div>
  );
};

export default ToggleButton;
