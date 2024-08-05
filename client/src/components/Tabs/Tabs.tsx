import React, { useState } from "react";
import Tab from "./Tab";
import "./Tabs.css";

interface Tabs {
  label: string;
  content: any;
}

interface TabsProps {
  tabs: Array<Tabs>;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  activeTab: number;
}

const Tabs = (props: TabsProps) => {
  const handleTabClick = (index: number) => {
    props.setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {props.tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            onClick={() => {
              handleTabClick(index);
            }}
            isActive={index === props.activeTab}
            tabWidth={`${100 / props.tabs.length}%`}
          />
        ))}
      </div>
      <div className="tab-content">
        <h2 className="subheading-2"> {props.tabs[props.activeTab].label} </h2>
        <hr className="decorative-hr" />
        {props.tabs[props.activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
