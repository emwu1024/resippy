import React, { useState } from "react";
import Tab from "./Tab";
import "./Tabs.css";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            onClick={() => {
              handleTabClick(index);
            }}
            isActive={index === activeTab}
          />
        ))}
      </div>
      <div className="tab-content">
        <h2> {tabs[activeTab].label} </h2>
        <hr className="decorative-hr" />
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
