import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Tiptap from "../../components/TextEditor/Tiptap";
import parser from "html-react-parser";

import Navbar from "../../components/Navbar/Navbar";
import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import Tabs from "../../components/Tabs/Tabs";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import CreateRecipeForm from "../../components/CreateRecipeForm/CreateRecipeForm";

import "./CreateRecipe.css";

const CreateRecipe = () => {
  // Current Idea: 2 data entry formats, 1 for custom component breakdown and styling and another for WYSIWYG rich text editing?
  // Custom data format Code:
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [isStandardised, setIsStandardised] = useState(false);

  // TipTap Code:
  const [editorHtml, setEditorHtml] = useState("");

  const navigate = useNavigate();

  const handleSaveRecipe = () => {
    const data = {
      name,
      author,
      description,
      steps,
      ingredients,
      editorHtml,
      isStandardised,
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
      label: "Rich Text Editor",
      content: <Tiptap setEditorHtml={setEditorHtml} />,
    },
    {
      label: "Standardised Data Editor",
      content: (
        <CreateRecipeForm
          steps={steps}
          ingredients={ingredients}
          setSteps={setSteps}
          setIngredients={setIngredients}
        ></CreateRecipeForm>
      ),
    },
  ];

  return (
    <div>
      <Navbar></Navbar>
      <PageContentContainer>
        <h1 className="heading page-margin-top">Create A Recipe</h1>
        <h3>
          Welcome to our recipe creation page! Here, you have the option to
          enter your recipe in two different formats. Let's get cooking!
        </h3>
        <ul className="desc-list-container">
          <li>
            Rich Text Editor: a text editor that allows more freedom with how
            the recipe is displayed
          </li>
          <li>
            Standardised Data Editor: data fields that structure the recipe and
            displays recipes in a more consistent way
          </li>
        </ul>

        <ToggleButton
          setIsStandardised={setIsStandardised}
          isStandardised={isStandardised}
          leftText="Display Rich Text"
          rightText="Display Standardised"
        />

        <div className="form-container">
          <div className="form-field-container">
            <label className="form-label">Name of Recipe</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="form-field"
              value={name}
            />
          </div>
          <div className="form-field-container">
            <label className="form-label">Recipe Description</label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              className="form-field"
              value={description}
            />
          </div>
          <div className="form-field-container">
            <label className="form-label">Author</label>
            <input
              type="text"
              onChange={(e) => setAuthor(e.target.value)}
              className="form-field"
              value={author}
            />
          </div>
        </div>

        <Tabs tabs={tabSections} />
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <button className="p-2 bg-sky-300 m-8" onClick={handleSaveRecipe}>
            Save
          </button>
        </div>

        <h2>Preview</h2>
        <div className="ProseMirror">{parser(editorHtml)}</div>
      </PageContentContainer>
    </div>
  );
};

export default CreateRecipe;
