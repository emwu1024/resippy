import React, { useState } from "react";
import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import WipComponent from "../../components/WipComponent/WipComponent";
import AuthorPic from "../../assets/example-pic.webp";

import "./About.css";

const About = () => {
  return (
    <div>
      <PageContentContainer>
        <div className="about-container page-margin-top">
          <div className="about-author-container">
            <img
              className="about-author-img"
              src={AuthorPic}
              alt={`Fake author pic of a chain smoking hamster`}
            />
          </div>
          <div className="about-text-container">
            <h1 className="heading horizontal-centre">About</h1>
            <p>Hey There!</p>
            <p>Welcome to my dark and twisted website</p>
            <p>Joking, it's just a recipe website</p>
            <p>
              For the sake of the semblance of anonymity, instead of using my
              face here's a picture of the websites mascot, a chain-smoking
              hamster line cook.
            </p>
          </div>
        </div>
      </PageContentContainer>
    </div>
  );
};

export default About;
