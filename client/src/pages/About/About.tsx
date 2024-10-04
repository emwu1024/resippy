import React, { useState } from "react";
import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import WipComponent from "../../components/WipComponent/WipComponent";

import "./About.css";

const About = () => {
  return (
    <div>
      <PageContentContainer>
        <h1 className="heading page-margin-top">About</h1>
        <WipComponent />
      </PageContentContainer>
    </div>
  );
};

export default About;
