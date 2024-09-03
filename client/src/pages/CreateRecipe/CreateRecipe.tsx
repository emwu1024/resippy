import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Tiptap from "../../components/TextEditor/Tiptap";

import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import Tabs from "../../components/Tabs/Tabs";
import ToggleButton from "../../components/Buttons/ToggleButton/ToggleButton";
import CreateRecipeForm from "../../components/CreateRecipeForm/CreateRecipeForm";
import Button from "../../components/Buttons/Button/Button";

import { LuImagePlus } from "react-icons/lu";
import { IconContext } from "react-icons";

import "./CreateRecipe.css";

const CreateRecipe = () => {
  // Current Idea: 2 data entry formats, 1 for custom component breakdown and styling and another for WYSIWYG rich text editing?
  // Custom data format Code:
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [steps, setSteps] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [images, setImages] = useState<Array<string>>([]);
  const [isStandardised, setIsStandardised] = useState(false);

  // TipTap Code:
  const [editorHtml, setEditorHtml] = useState("");

  // Tab Code:
  const [activeTab, setActiveTab] = useState(0);

  const navigate = useNavigate();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const base64 = await convertToBase64(file);
      setThumbnail(base64);
    }
  };

  const handleSaveRecipe = async () => {
    const data = {
      name,
      author,
      description,
      thumbnail,
      steps,
      ingredients,
      editorHtml,
      isStandardised,
      images,
    };
    axios
      .post("http://localhost:8000/recipes", data)
      .then(() => {
        navigate("/recipes");
      })
      .catch((error) => {
        alert("You probably missed a field, check the console for more deets");
        console.log(error);
      });
  };

  const tabSections = [
    {
      label: "Text Editor",
      content: <Tiptap editorHtml={editorHtml} setEditorHtml={setEditorHtml} />,
    },
    {
      label: "Form",
      content: (
        <CreateRecipeForm
          steps={steps}
          ingredients={ingredients}
          images={images}
          setSteps={setSteps}
          setIngredients={setIngredients}
          setImages={setImages}
        ></CreateRecipeForm>
      ),
    },
  ];

  return (
    <div>
      <PageContentContainer>
        <h1 className="heading page-margin-top">Let's get cooking!</h1>
        <div className="desc-container">
          <h3>Welcome to the recipe creation page!</h3>
          <h3>
            Here, you have the option to enter your recipe in two different
            formats:
          </h3>
        </div>

        <ToggleButton
          setIsStandardised={setIsStandardised}
          isStandardised={isStandardised}
          leftText="Display Text Editor"
          rightText="Display Form"
          leftDesc="A tool that lets you be creative with how the recipe looks."
          rightDesc="A set of organised fields that makes sure recipes look consistent."
        />

        <div className="form-container">
          <h2 className="subheading-2 horizontal-centre">Recipe Details</h2>
          <div className="form-field-container">
            <label className="form-label">*Name of Recipe</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="form-field input-text"
              value={name}
            />
          </div>
          <div className="form-field-container">
            <label className="form-label">*Recipe Description</label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              className="form-field input-text"
              value={description}
            />
          </div>
          <div className="form-field-container">
            <label className="form-label">*Author</label>
            <input
              type="text"
              onChange={(e) => setAuthor(e.target.value)}
              className="form-field input-text"
              value={author}
            />
          </div>

          <div className="form-field-container">
            <label className="form-label" htmlFor="image-upload-input">
              <p>*Thumbnail</p>
            </label>

            <label
              className="form-label btn-upload-image vertical-centre"
              htmlFor="image-upload-input"
            >
              <IconContext.Provider value={{ color: "#e1be96", size: "30px" }}>
                <LuImagePlus />
              </IconContext.Provider>
              {thumbnail != "" ? (
                <span className="upload-desc">1 File Uploaded</span>
              ) : (
                <span className="upload-desc">Upload Image Here</span>
              )}
            </label>

            <input
              type="file"
              name="images"
              id="image-upload-input"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
        </div>

        <Tabs
          tabs={tabSections}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <Button btnText="Save" onClick={handleSaveRecipe}></Button>
        </div>

        {/* Preview To Be Added Later - Not part of MVP */}
        {/* <h2>Preview</h2>
        <div className="preview-container">
          
          <div className="ProseMirror">{parser(editorHtml)}</div>
        </div> */}
      </PageContentContainer>
    </div>
  );
};

export default CreateRecipe;

function convertToBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    // Reads into Base64
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
