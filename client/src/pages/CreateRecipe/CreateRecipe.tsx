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
  const [cloudinaryId, setCloudinaryId] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadThumbnail = async () => {
    if (!thumbnailImage) {
      alert("No thumbnail was selected");
      return null;
    } else if (name == "" || author == "" || description == "") {
      alert("Recipe name or author or description was not entered");
    } else if (isStandardised && (steps == "" || ingredients == "")) {
      alert(
        "You selected the form format. Check that you added steps and ingredients."
      );
    } else if (!isStandardised && editorHtml == "<p></p>") {
      alert(
        "You selected the Text Editor format. Check that you added some text to the editor."
      );
    } else {
      const uuid = crypto.randomUUID();
      const cloudinaryPublicId =
        name.trim().replaceAll(" ", "") + "_" + uuid + "_thumbnail";

      try {
        const cloudData = await axios.post(
          `http://localhost:8000/recipes/cloud`,
          {
            publicId: cloudinaryPublicId,
          }
        );

        const { signature, timestamp, publicId } = cloudData.data;
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

        const data = new FormData();
        data.append("file", thumbnailImage);
        data.append("public_id", publicId);
        data.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_SIGNED_PRESET
        );

        try {
          let apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?api_key=${apiKey}&timestamp=${timestamp}&signature=${signature}`;
          const res = await axios.post(apiUrl, data);
          setCloudinaryId(cloudinaryPublicId);
          const secureUrl = res.data.secure_url;
          return secureUrl;
        } catch (error) {
          alert("Thumbnail upload to Cloudinary failed. Logging Error.");
          console.log(error);
        }
      } catch (error) {
        console.error(
          "Signature error. Logging the error.",
          error.response?.data || error.message
        );
      }
    }
  };

  const handleSaveRecipe = async () => {
    // Upload to cloudinary and store secure url in below variable,then send secure cloudinary URL to backend
    const thumbnail = await uploadThumbnail();

    const data = {
      name,
      cloudinaryId,
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
