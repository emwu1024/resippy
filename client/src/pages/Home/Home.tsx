import React from "react";
import "./home.css";

import Button from "../../components/Buttons/Button/Button";
import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";

const Home = () => {
  return (
    <div>
      <div className="content-container">
        <div className="hero-image">
          <div className="hero-text">
            <h1>Resippys</h1>
          </div>
        </div>
        <br />
        <PageContentContainer width="50%">
          <h1 className="heading">Welcome to Resippys!</h1>
          <hr className="decorative-hr" />
          <p className="body-text margin-top-3">
            Ever step into the kitchen and completely forget <i>every</i> single
            recipe you've ever made?
          </p>
          <p className="body-text">Same.</p>
          <p className="body-text">
            This is a website I made to help me keep track of them all
          </p>
          <p className="body-text">and to practice coding</p>
          <br />
          <br />
          <Button btnText="Randomise Recipe Time!"></Button>
        </PageContentContainer>
      </div>
    </div>
  );
};

export default Home;
