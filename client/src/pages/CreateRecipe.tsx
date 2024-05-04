import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Tiptap from "../components/TextEditor/Tiptap";
import parser from "html-react-parser";

import Navbar from "../components/Navbar/Navbar";
import PageContentContainer from "../components/PageContentContainer/PageContentContainer";
import Tabs from "../components/Tabs/Tabs";
import CreateRecipeForm from "../components/CreateRecipeForm/CreateRecipeForm";

const CreateRecipe = () => {
  // Current Idea: 2 data entry formats, 1 for custom component breakdown and styling and another for WYSIWYG rich text editing?
  // Custom data format Code:
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [publishedYear, setPublishedYear] = useState("");

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
      publishedYear,
      editorHtml,
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
    { label: "First Tab", content: <Tiptap setEditorHtml={setEditorHtml} /> },
    {
      label: "Second Tab",
      content: (
        <CreateRecipeForm
          setName={setName}
          setAuthor={setAuthor}
          setDescription={setDescription}
          setSteps={setSteps}
          setIngredients={setIngredients}
          setPublishedYear={setPublishedYear}
        ></CreateRecipeForm>
      ),
    },
    { label: "Third Tab" },
  ];

  return (
    <div>
      <Navbar></Navbar>
      <PageContentContainer>
        <h1 className="heading page-margin-top">Create A Recipe</h1>
        <p>
          This page is for creating a new recipe. It allows you to choose
          between 2 different formats for data entry: Custom Format which will
          allow for a more standardised recipe format OR Rich Text which allows
          for more freedom with the recipe display
        </p>
        <Tabs tabs={tabSections} />
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          {/* <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Name of Recipe</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">
              Recipe Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2  w-full "
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">
              Recipe Steps (Separate steps with a new line)
            </label>
            <textarea
              // type="text"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
              rows={5}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">
              Ingredients (Separate ingredients with a new line)
            </label>
            <textarea
              // type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
              rows={5}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">
              Publish Year (to be automated later)
            </label>
            <input
              type="number"
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2  w-full "
            />
          </div> */}
          <button className="p-2 bg-sky-300 m-8" onClick={handleSaveRecipe}>
            Save
          </button>
        </div>

        {/* <Tiptap setEditorHtml={setEditorHtml} /> */}
        <div className="ProseMirror">{parser(editorHtml)}</div>
      </PageContentContainer>
    </div>
  );
};

export default CreateRecipe;
