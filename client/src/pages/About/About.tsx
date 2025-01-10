import React, { useState } from "react";
import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import WipComponent from "../../components/WipComponent/WipComponent";
// import AuthorPic from "../../assets/example-pic.webp";
// import AuthorPic from "../../assets/authorimage1.jpg";
// import AuthorPic from "../../assets/authorimage2.jpg";
import AuthorPic from "../../assets/authorimage3.jpg";
// import AuthorPic from "../../assets/authorimage4.jpg";
// import AuthorPic from "../../assets/authorimage5.jpg";
// import AuthorPic from "../../assets/authorimage6.jpg";
// import AuthorPic from "../../assets/authorimage7.jpg";

import "./About.css";

const About = () => {
  return (
    <div>
      <PageContentContainer width="75%">
        <div className="about-container page-margin-top">
          <div className="about-author-container">
            <img
              className="about-author-img"
              src={AuthorPic}
              // src="../../assets/authorimage3.HEIC"
              alt={`A brown mug and a metal bowl of mango sago on a table with plants in the background.`}
            />
          </div>
          <div className="about-text-container">
            <h1 className="heading horizontal-centre">About</h1>
            <p>Hey there!</p>
            <p>Welcome to the Resippy's website ^-^</p>
            <p>This is a website I made to host:</p>
            <p>
              My recipes, friends recipes, and recipes from other sources to
              keep as reference.
            </p>
            <p>
              Parts of the website are still under development and recipes will
              be continuously added, so expect to see some changes here over
              time!
            </p>
          </div>
        </div>
      </PageContentContainer>
    </div>
  );
};

export default About;
