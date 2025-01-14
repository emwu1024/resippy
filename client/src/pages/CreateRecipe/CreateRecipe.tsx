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
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [tags, setTags] = useState<Array<string>>([]);
  const [difficulty, setDifficulty] = useState("5 Mins");
  const [steps, setSteps] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [images, setImages] = useState<Array<string>>([]);
  const [isStandardised, setIsStandardised] = useState(false);
  const [editorHtml, setEditorHtml] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadThumbnail = async () => {
    if (!thumbnailImage) {
      alert("No thumbnail was selected");
      return null;
    }

    const data = new FormData();
    data.append("file", thumbnailImage);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    try {
      // NOTE: might fail here? 19:37 uses process.env instead but idt that works with vite
      let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      let apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const res = await axios.post(apiUrl, data);
      const secureUrl = res.data.secure_url;
      return secureUrl;
    } catch (error) {
      // console.log("Thumbnail upload to Cloudinary failed. Logging Error.");
      alert("Thumbnail upload to Cloudinary failed. Logging Error.");
      console.log(error);
    }
  };

  const handleSaveRecipe = async () => {
    // Upload to cloudinary and st ore secure url in below variable,then send secure cloudinary URL to backend
    const thumbnail = await uploadThumbnail();

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
          thumbnail={thumbnailImage}
          setThumbnail={setThumbnailImage}
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
