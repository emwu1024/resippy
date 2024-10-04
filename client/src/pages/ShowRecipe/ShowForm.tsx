import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ShowRecipe.css";

import Recipe from "../RecipeIndex/RecipesIndex";

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
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Name: </span>
            <span>{props.name}</span>
          </div>
        </div>
        <div className="book-right-page">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Description: </span>
            <span>{props.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowForm;
