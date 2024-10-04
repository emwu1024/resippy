import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ShowRecipe.css";

import Recipe from "../RecipeIndex/RecipesIndex";

import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import ShowEditor from "./ShowEditor";
import ShowForm from "./ShowForm";

const ShowRecipe = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="book-container">
      <PageContentContainer>
        {recipe.isStandardised ? (
          <ShowForm
            name={recipe.name}
            description={recipe.description}
            author={recipe.author}
            difficulty={recipe.difficulty}
            tags={recipe.tags}
            steps={recipe.steps}
            ingredients={recipe.ingredients}
            images={recipe.images}
          />
        ) : (
          <ShowEditor
            name={recipe.name}
            description={recipe.description}
            tags={recipe.tags}
            wysiwygHtml={recipe.editorHtml}
            author={recipe.author}
            difficulty={recipe.difficulty}
          />
        )}
      </PageContentContainer>
    </div>
  );
};

export default ShowRecipe;
