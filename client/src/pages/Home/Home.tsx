import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

import Button from "../../components/Buttons/Button/Button";
import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import axios from "axios";

const Home = () => {
  const [randomId, setRandomId] = useState("");
  const navigate = useNavigate();

  const randomiseRecipe = async () => {
    try {
      const response = await axios.get("http://localhost:8000/recipes/random");
      const randomId = response.data;
      setRandomId(randomId);
      navigate(`/recipes/${randomId}`);
    } catch (error) {
      console.error("Error fetching random ID:", error);
    }
  };

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
            Stepped in the kitchen and forgotten{" "}
            <strong>
              <i>every</i>
            </strong>{" "}
            recipe you've ever made?
          </p>
          <p className="body-text margin-top-3">Same.</p>
          <p className="body-text margin-top-3">
            This is a website I made to keep track of them all!
          </p>
          <br />
          <br />
          <Button btnText="Gimme a recipe!" onClick={randomiseRecipe}></Button>
        </PageContentContainer>
      </div>
    </div>
  );
};

export default Home;
