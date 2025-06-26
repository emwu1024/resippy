import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import Button from "../../components/Buttons/Button/Button";
import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import axios from "axios";

const Home = () => {
  const [rating, setRating] = useState("all");
  const [usedRatings, setUsedRatings] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          "https://resippy.onrender.com/recipes/ratings"
        );
        setUsedRatings(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  const randomiseRecipe = async () => {
    try {
      const response = await axios.get(
        `https://resippy.onrender.com/recipes/random`,
        {
          params: {
            rating: rating || "all",
          },
        }
      );

      const randomId = response.data;
      navigate(`/recipes/${randomId}`);
    } catch (error) {
      console.error("Error fetching random ID:", error);
    }
  };

  return (
    <div className="home-page">
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
          <br />
          <div className="filter-container">
            <label className="help-text">Difficulty Filter</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="difficulty-search"
            >
              {usedRatings.map((rating, index) => {
                return (
                  <option key={index} value={rating}>
                    {rating}
                  </option>
                );
              })}
            </select>
          </div>
          <Button btnText="Gimme a recipe!" onClick={randomiseRecipe}></Button>
        </PageContentContainer>
      </div>
    </div>
  );
};

export default Home;
