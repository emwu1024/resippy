import React, { useState } from "react";
import "./WipComponent.css";
// import logo from "../../assets/cooking-in-progress.png";
import logo from "../../assets/cooking-in-progress-fire.png";

const WipComponent = () => {
  return (
    <div>
      <p>This feature is still being developed!</p>
      <img
        className="wip-image"
        src={logo}
        alt="WIP Graphic of a tired hamster in a chef outfit stiring food in a food truck"
      />
    </div>
  );
};

export default WipComponent;
