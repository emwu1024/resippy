import React, { useState } from "react";
import "./ToggleButton.css";

const ToggleButton = (props) => {
  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          onChange={(e) => props.setIsRichText(!props.isRichText)}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleButton;
