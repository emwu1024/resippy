import React from "react";

import "./PageContentContainer.css";

interface PageContentContainerProps {
  width?: string;
  children?: React.ReactNode;
}

const PageContentContainer = (props: PageContentContainerProps) => {
  return (
    <div>
      <div
        className="page-content"
        style={props.width ? { width: props.width } : { width: "70%" }}
      >
        <div className="content-container">{props.children}</div>
      </div>
    </div>
  );
};

export default PageContentContainer;
