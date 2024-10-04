import React, { useState } from "react";
import "./Button.css";

interface ButtonProps {
  btnText: string;
  onClick: () => any;
}

const Button = (props: ButtonProps) => {
  return (
    <div>
      <button className="btn" onClick={props.onClick}>
        {props.btnText}
      </button>
    </div>
  );
};

export default Button;
