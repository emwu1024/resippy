import React, { useState } from "react";
import "./CreateRecipeForm.css";

const CreateRecipeForm = (props) => {
  return (
    <div>
      <div className="form-container">
        <div className="form-field-container">
          <label className="form-label">Name of Recipe</label>
          <input
            type="text"
            onChange={(e) => props.setName(e.target.value)}
            className="form-field"
          />
        </div>
        <div className="form-field-container">
          <label className="form-label">Recipe Description</label>
          <input
            type="text"
            onChange={(e) => props.setDescription(e.target.value)}
            className="form-field"
          />
        </div>
        <div className="form-field-container">
          <label className="form-label">Author</label>
          <input
            type="text"
            onChange={(e) => props.setAuthor(e.target.value)}
            className="form-field"
          />
        </div>
        <div className="form-field-container">
          <label className="form-label">
            Recipe Steps (Start another step with a new line)
          </label>
          <textarea
            onChange={(e) => props.setSteps(e.target.value)}
            className="form-field"
            rows={5}
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
          />
        </div>
        <div className="form-field-container">
          <label className="form-label">
            Publish Year (to be automated later)
          </label>
          <input
            type="number"
            onChange={(e) => props.setPublishedYear(e.target.value)}
            className="form-field"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateRecipeForm;
