import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import RecipeForm from "../../components/CreateRecipeForm/RecipeForm";
import "./UpdateRecipe.css";

const UpdateRecipe = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [difficulty, setDifficulty] = useState("5 Mins");
  // const [steps, setSteps] = useState<Array<string>>([]);
  // const [ingredients, setIngredients] = useState<Array<string>>([]);
  const [steps, setSteps] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [images, setImages] = useState<Array<string>>([]);
  const [isStandardised, setIsStandardised] = useState(false);
  const [editorHtml, setEditorHtml] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/recipes/${id}`)
      .then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setAuthor(response.data.author);
        setThumbnail(response.data.thumbnail);
        setTags(response.data.tags);
        setDifficulty(response.data.difficulty);
        setImages(response.data.images);
        console.log("images:  ");
        console.log(images);
        setIsStandardised(response.data.isStandardised);
        setEditorHtml(response.data.editorHtml);
        setSteps(formatArray(response.data.steps));
        setIngredients(formatArray(response.data.ingredients));
      })
      .catch((error) => {
        alert(
          "Error in fetching the data for this recipe, check console for further information"
        );
        console.log(error);
      });
  }, []);

  const formatArray = (recipeArray: string[]) => {
    // const recipeString = recipeArray.toString().split(",");
    const recipeString = recipeArray.join("\n");
    console.log("HERE: ");
    console.log(recipeArray);
    // let returnString = "";

    // recipeString.forEach((item: string) => {
    //   returnString += item + "\n";
    // });
    return recipeString;
  };

  const handleEditRecipe = () => {
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
      .put(`http://localhost:8000/recipes/${id}`, data)
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
    <div>
      <PageContentContainer>
        <h1 className="heading page-margin-top">Let's get cooking!</h1>
        <div className="desc-container">
          <h3>Welcome to the recipe edit page!</h3>
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
          handleSaveRecipe={handleEditRecipe}
          loading={loading}
        />
      </PageContentContainer>
    </div>
  );
};

export default UpdateRecipe;
