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
  const [newThumbnailImage, setNewThumbnailImage] = useState<File | null>(null);
  const [oldThumbnail, setOldThumbnail] = useState("");
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
        setOldThumbnail(response.data.thumbnail);
        setTags(response.data.tags);
        setDifficulty(response.data.difficulty);
        setImages(response.data.images);
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

  const uploadThumbnail = async () => {
    if (!newThumbnailImage) {
      alert("No thumbnail was selected");
      return null;
    }

    const data = new FormData();
    data.append("file", newThumbnailImage);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    try {
      let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      let apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const res = await axios.post(apiUrl, data);
      const secureUrl = res.data.secure_url;
      return secureUrl;
    } catch (error) {
      alert("Thumbnail upload to Cloudinary failed. Logging Error.");
    }
  };

  const formatArray = (recipeArray: string[]) => {
    const recipeString = recipeArray.join("\n");
    return recipeString;
  };

  const handleEditRecipe = async () => {
    setLoading(true);
    let thumbnail = "";
    if (newThumbnailImage != null) {
      thumbnail = await uploadThumbnail();
    } else {
      thumbnail = oldThumbnail;
    }

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
          thumbnail={newThumbnailImage}
          oldThumbNail={oldThumbnail}
          setThumbnail={setNewThumbnailImage}
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
