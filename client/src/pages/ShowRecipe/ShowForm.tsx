import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ShowRecipe.css";

import Recipe from "../RecipeIndex/RecipesIndex";
import { GiPaperClip } from "react-icons/gi";

interface ShowFormProps {
  name: string;
  description: string;
  author: string;
  difficulty: string;
  tags: string[];
  steps: string[];
  ingredients: string[];
  images: string[];
}

const ShowForm = (props: ShowFormProps) => {
  return (
    <div>
      <div className="book-content-container">
        <div className="book-left-page">
          <h1 className="heading page-margin-top">{props.name}</h1>
          <hr className="decorative-hr" />
          <p>{props.author}</p>
          <p>{props.description}</p>
          {props.images.map((image, index) => (
            <img className="recipe-img" src={image} alt="" />
          ))}
        </div>
        <div className="book-right-page">
          <div className="page-margin-top paperclip-page">
            <h2 className=" paperclip-page-header">Ingredients</h2>
            <ul className="paperclip-page-content">
              {props.ingredients.map((ingredient, index) => (
                <li className="paperclip-page-text">{ingredient}</li>
              ))}
            </ul>
            <div className="paperclip-page-icon">
              <GiPaperClip color="gray" size="4rem" />
            </div>
          </div>
          <br />
          <div className="steps-container">
            <h2 className="steps-header">Steps</h2>
            <ol className="steps-list">
              {props.steps.map((step, index) => (
                <li>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowForm;
