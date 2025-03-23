import React from "react";
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

  const getBorderRadius = (index: number, tabsLength: number) => {
    if (index === 0) {
      return "top-left-radius";
    } else if (index === tabsLength - 1) {
      return "top-right-radius";
    }
    return "";
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {props.tabs.map((tab, index) => {
          return (
            <Tab
              key={index}
              label={tab.label}
              onClick={() => {
                handleTabClick(index);
              }}
              isActive={index === props.activeTab}
              tabWidth={`${100 / props.tabs.length}%`}
              borderRadius={getBorderRadius(index, props.tabs.length)}
            />
          );
        })}
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
