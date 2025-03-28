import React, { useState } from "react";

import Tiptap from "../../components/TextEditor/Tiptap";
import ToggleButton from "../Buttons/ToggleButton/ToggleButton";
import ChipInput from "../Search/ChipInput";
import Tabs from "../Tabs/Tabs";
import Button from "../Buttons/Button/Button";
import FormTab from "./FormTab";

import { IconContext } from "react-icons";
import { LuImagePlus } from "react-icons/lu";
import { CircularProgress } from "@mui/material";

interface RecipeFormProps {
  name: string;
  author: string;
  description: string;
  thumbnail: File | null;
  oldThumbNail?: string;
  tags: Array<string>;
  difficulty: string;
  steps: string;
  ingredients: string;
  images: Array<File>;
  isImagesDifferent?: boolean;
  editorHtml: string;
  isStandardised: boolean;
  loading: boolean;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setThumbnail: React.Dispatch<React.SetStateAction<File | null>>;
  setTags: React.Dispatch<React.SetStateAction<Array<string>>>;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  setSteps: React.Dispatch<React.SetStateAction<string>>;
  setIngredients: React.Dispatch<React.SetStateAction<string>>;
  setImages: React.Dispatch<React.SetStateAction<Array<File>>>;
  setIsImagesDifferent?: React.Dispatch<React.SetStateAction<boolean>>;
  setEditorHtml: React.Dispatch<React.SetStateAction<string>>;
  setIsStandardised: React.Dispatch<React.SetStateAction<boolean>>;
  handleSaveRecipe: () => void;
}

const RecipeForm = (props: RecipeFormProps) => {
  // Tab Code:
  const [activeTab, setActiveTab] = useState(1);

  const difficultyList = [
    "5 Mins",
    "15 Mins",
    "30 Mins",
    "1 Hour",
    "2 Hours",
    "4 Hours",
    "8 Hours",
    "1 Day",
    "VERY HARD",
  ];

  const tabSections = [
    {
      label: "Text Editor",
      content: (
        <Tiptap
          editorHtml={props.editorHtml}
          setEditorHtml={props.setEditorHtml}
        />
      ),
    },
    {
      label: "Form",
      content: (
        <FormTab
          steps={props.steps}
          ingredients={props.ingredients}
          images={props.images}
          isImagesDifferent={props.isImagesDifferent}
          setSteps={props.setSteps}
          setIngredients={props.setIngredients}
          setImages={props.setImages}
          setIsImagesDifferent={props.setIsImagesDifferent}
        ></FormTab>
      ),
    },
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      props.setThumbnail(file);
    }
  };

  return (
    <div>
      <ToggleButton
        setIsStandardised={props.setIsStandardised}
        isStandardised={props.isStandardised}
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
            onChange={(e) => props.setName(e.target.value)}
            className="form-field input-text"
            value={props.name}
          />
        </div>
        <div className="form-field-container">
          <label className="form-label">*Recipe Description</label>
          <input
            type="text"
            onChange={(e) => props.setDescription(e.target.value)}
            className="form-field input-text"
            value={props.description}
          />
        </div>
        <div className="form-field-container">
          <label className="form-label">*Author</label>
          <input
            type="text"
            onChange={(e) => props.setAuthor(e.target.value)}
            className="form-field input-text"
            value={props.author}
          />
        </div>

        <div className="form-field-container">
          <label className="form-label">Tags</label>
          <ChipInput tags={props.tags} setTags={props.setTags} />
        </div>

        <div className="form-field-container">
          <label className="form-label">*Difficulty Rating</label>
          <select
            value={props.difficulty}
            onChange={(e) => props.setDifficulty(e.target.value)}
            className="form-field"
          >
            {difficultyList.map((rating, index) => {
              return (
                <option key={index} value={rating}>
                  {rating}
                </option>
              );
            })}
          </select>
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
            {props.thumbnail != null || props.oldThumbNail != null ? (
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
      <Button
        btnText={props.loading ? "Saving..." : "Save"}
        onClick={props.handleSaveRecipe}
        disabled={props.loading}
      ></Button>
      {props.loading && (
        <div className="loading-icon">
          {/* Value in color doesn't seem to matter as it is being set by CSS, but the attribute still needs to be there otherwise it defaults to the default color */}
          <CircularProgress sx={{ color: "#c17d42" }} size="2rem" />
        </div>
      )}

      {/* Preview To Be Added Later - Not part of MVP */}
      {/* <h2>Preview</h2>
        <div className="preview-container">
          
          <div className="ProseMirror">{parser(editorHtml)}</div>
        </div> */}
    </div>
  );
};

export default RecipeForm;
