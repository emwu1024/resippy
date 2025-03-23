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
  const [multipleImages, setMultipleImages] = useState<Array<File>>([]);
  const [isStandardised, setIsStandardised] = useState(true);
  const [editorHtml, setEditorHtml] = useState("");
  const [cloudinaryId, setCloudinaryId] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // NOTE: This should only run after thumbnail which is mandatory so cloudinaryPublicId will have been generated.
  const uploadMultiImage = async (cloudinaryId: string) => {
    try {
      let cloudinaryPublicId = cloudinaryId;
      let secureUrlList = [];
      for (let i = 0; i < multipleImages.length; i++) {
        cloudinaryPublicId = cloudinaryPublicId + "_image_" + (i + 1);
        const cloudData = await axios.post(
          `https://resippy.onrender.com/recipes/cloud`,
          {
            publicId: cloudinaryPublicId,
          }
        );

        const { signature, timestamp } = cloudData.data;
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

        const data = new FormData();
        data.append("file", multipleImages[i]);
        data.append("public_id", cloudinaryPublicId);
        data.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_SIGNED_PRESET
        );

        try {
          let apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?api_key=${apiKey}&timestamp=${timestamp}&signature=${signature}`;
          const res = await axios.post(apiUrl, data);
          const secureUrl = res.data.secure_url;
          secureUrlList.push(secureUrl);
        } catch (error) {
          alert("Thumbnail upload to Cloudinary failed. Logging Error.");
          console.log(error);
        }
      }
      return secureUrlList;
    } catch (error) {
      console.error(
        "Signature error. Logging the error.",
        error.response?.data || error.message
      );
    }
  };

  const uploadThumbnail = async (cloudinaryId: string) => {
    let cloudinaryPublicId = cloudinaryId + "_thumbnail";
    try {
      const cloudData = await axios.post(
        `https://resippy.onrender.com/recipes/cloud`,
        {
          publicId: cloudinaryPublicId,
        }
      );

      const { signature, timestamp } = cloudData.data;
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

      const data = new FormData();
      data.append("file", thumbnailImage);
      data.append("public_id", cloudinaryPublicId);
      data.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_SIGNED_PRESET
      );

      try {
        let apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?api_key=${apiKey}&timestamp=${timestamp}&signature=${signature}`;
        const res = await axios.post(apiUrl, data);
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
  };

  const getCloudinaryUuid = async () => {
    let cloudinaryPublicId = "";
    if (!thumbnailImage) {
      alert("No thumbnail was selected");
      return null;
    } else if (name == "" || author == "" || description == "") {
      alert("Recipe name or author or description was not entered");
      return null;
    } else if (isStandardised && (steps == "" || ingredients == "")) {
      alert(
        "You selected the form format. Check that you added steps and ingredients."
      );
      return null;
    } else if (!isStandardised && editorHtml == "") {
      alert(
        "You selected the Text Editor format. Check that you added some text to the editor."
      );
      return null;
    } else {
      if (cloudinaryId == "") {
        const uuid = crypto.randomUUID();
        cloudinaryPublicId = name.trim().replaceAll(" ", "") + "_" + uuid;
        setCloudinaryId(cloudinaryPublicId);
      } else {
        cloudinaryPublicId = cloudinaryId;
      }
      return cloudinaryPublicId;
    }
  };

  const handleSaveRecipe = async () => {
    // Upload to cloudinary and store secure url in below variable,then send secure cloudinary URL to backend
    setLoading(true);
    let cloudinaryId = await getCloudinaryUuid();
    let thumbnail;
    let images;
    if (cloudinaryId != null) {
      thumbnail = await uploadThumbnail(await cloudinaryId);
      if (multipleImages != undefined && multipleImages.length != 0) {
        images = await uploadMultiImage(await cloudinaryId);
      }

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

      axios
        .post("https://resippy.onrender.com/recipes", data)
        .then(() => {
          setLoading(false);
          navigate("/recipes");
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            alert(`Error: ${error.response.data.errors[0].msg}`);
          } else {
            alert("An unexpected error occurred. Please try again.");
          }
          console.log(error);
        });
    } else {
      // alert("publicId was null.");
      setLoading(false);
    }
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
          images={multipleImages}
          setImages={setMultipleImages}
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
