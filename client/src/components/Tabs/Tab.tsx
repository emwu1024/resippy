import React, { useState } from "react";

interface TabProps {
  label: string;
  onClick: () => any;
  isActive: boolean;
  tabWidth: string;
  borderRadius: string;
}

const Tab = (props: TabProps) => (
  <div
    style={{ width: props.tabWidth }}
    className={`tab ${props.isActive ? "active" : ""} ${props.borderRadius}`}
    onClick={props.onClick}
  >
    {props.label}
  </div>
);

export default Tab;
