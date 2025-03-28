import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

import "./ShowRecipe.css";
import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import ShowEditor from "./ShowEditor";
import ShowForm from "./ShowForm";

import { RecipeObject } from "../../types";

const ShowRecipe = () => {
  const [recipe, setRecipe] = useState<RecipeObject>({
    _id: "",
    name: "",
    description: "",
    author: "",
    createdAt: "",
    thumbnail: "",
    tags: [],
    ingredients: [],
    steps: [],
    images: [],
    isStandardised: false,
    difficulty: "",
    editorHtml: "",
  });
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
      <PageContentContainer width="95%">
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
            wysiwygHtml={DOMPurify.sanitize(recipe.editorHtml)}
            author={recipe.author}
            difficulty={recipe.difficulty}
          />
        )}
      </PageContentContainer>
    </div>
  );
};

export default ShowRecipe;
