import React, { useState } from "react";
import "./HideyPanel.css";

const HideyPanel = (props: any) => {
  return (
    <div className="draw-outline-container">
      <div className="hidey-panel-container">
        <div className="hidey-panel"> {props.children}</div>
      </div>
    </div>
  );
};

export default HideyPanel;
