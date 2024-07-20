import React, { useState } from "react";
import "./CreateRecipeForm.css";

interface CreateRecipeFormProps {
  steps: string;
  ingredients: string;
  setSteps: React.Dispatch<React.SetStateAction<string>>;
  setIngredients: React.Dispatch<React.SetStateAction<string>>;
}

const CreateRecipeForm = (props: CreateRecipeFormProps) => {
  return (
    <div>
      <div className="form-container">
        {/* <div className="form-field-container">
          <label className="form-label">Name of Recipe</label>
          <input
            type="text"
            onChange={(e) => props.setName(e.target.value)}
            className="form-field"
            value={props.name}
          />
        </div>
        <div className="form-field-container">
          <label className="form-label">Recipe Description</label>
          <input
            type="text"
            onChange={(e) => props.setDescription(e.target.value)}
            className="form-field"
            value={props.description}
          />
        </div>
        <div className="form-field-container">
          <label className="form-label">Author</label>
          <input
            type="text"
            onChange={(e) => props.setAuthor(e.target.value)}
            className="form-field"
            value={props.author}
          />
        </div> */}
        <div className="form-field-container">
          <label className="form-label">
            Recipe Steps (Start another step with a new line)
          </label>
          <textarea
            onChange={(e) => props.setSteps(e.target.value)}
            className="form-field"
            rows={5}
            value={props.steps}
          />
        </div>
        <div className="form-field-container">
          <label className="form-label">
            Ingredients (Separate ingredients with a new line)
          </label>
          <textarea
            onChange={(e) => props.setIngredients(e.target.value)}
            className="form-field"
            rows={5}
            value={props.ingredients}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateRecipeForm;
