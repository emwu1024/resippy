import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import RecipeForm from "../../components/CreateRecipeForm/RecipeForm";

import "./CreateRecipe.css";

const CreateRecipe = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [difficulty, setDifficulty] = useState("5 Mins");
  const [steps, setSteps] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [images, setImages] = useState<Array<string>>([]);
  const [isStandardised, setIsStandardised] = useState(false);
  const [editorHtml, setEditorHtml] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSaveRecipe = async () => {
    const data = {
      name,
      author,
      description,
      thumbnail,
      tags,
      steps,
      difficulty,
      ingredients,
      editorHtml,
      isStandardised,
      images,
    };

    setLoading(true);

    axios
      .post("http://localhost:8000/recipes", data)
      .then(() => {
        setLoading(false);
        navigate("/recipes");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          alert(`Error: ${error.response.data.message}`);
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
        console.log(error);
      });
  };

  return (
    <div className="create-recipe-page">
      <PageContentContainer>
        <h1 className="heading page-margin-top">Let's get cooking!</h1>
        <div className="desc-container">
          <h3>Welcome to the recipe creation page!</h3>
          <h3>
            Here, you have the option to enter your recipe in two different
            formats:
          </h3>
        </div>
        <RecipeForm
          name={name}
          setName={setName}
          author={author}
          setAuthor={setAuthor}
          description={description}
          setDescription={setDescription}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          tags={tags}
          setTags={setTags}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          steps={steps}
          setSteps={setSteps}
          ingredients={ingredients}
          setIngredients={setIngredients}
          images={images}
          setImages={setImages}
          isStandardised={isStandardised}
          setIsStandardised={setIsStandardised}
          editorHtml={editorHtml}
          setEditorHtml={setEditorHtml}
          handleSaveRecipe={handleSaveRecipe}
          loading={loading}
        />
      </PageContentContainer>
    </div>
  );
};

export default CreateRecipe;
