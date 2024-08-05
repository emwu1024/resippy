import React, { useState } from "react";

const Tab = ({ label, onClick, isActive, tabWidth }) => (
  <div
    style={{ width: tabWidth }}
    className={`tab ${isActive ? "active" : ""}`}
    onClick={onClick}
  >
    {label}
  </div>
);

export default Tab;
