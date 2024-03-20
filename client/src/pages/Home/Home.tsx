import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import Navbar from "../../components/Navbar/Navbar";
import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="content-container">
        <div className="hero-image">
          <div className="hero-text">
            <h1>Resippys</h1>
          </div>
        </div>
        <br />
        <PageContentContainer>
          <div className="page-content">
            <h1>Welcome to Resippys!</h1>
            <p>
              This is a website I made to help me keep track of the recipes that
              I've made as I keep forgetting which recipes I know everytime I
              step into the kitchen.
            </p>
            <p>
              I also made this website so that I could practice my coding skills
            </p>
            <br />
            <br />
            <h2>How do I use this website?</h2>
            <p>
              Asides from using it like a normal website through, idk clicking
              through stuff till you find what your looking for. You'll be able
              to find an index of all of the recipes in the recipes section.
              You'll be able to find an atlas of recipes (once i've made that
              feature) through the atlas navlink, and you can look through the
              about page for some great lorem ipsum text.
            </p>
          </div>
        </PageContentContainer>
      </div>
    </div>
  );
};

export default Home;
