import React, { useState } from "react";

const CreateRecipeForm = (props) => {
  //   TO DO: styling of compoennt, current names are from tutorial but not using MUI so not working

  return (
    <div>
      <div className="flex">
        <div className="m">
          <label className="text-xl">Name of Recipe</label>
          <input
            type="text"
            onChange={(e) => props.setName(e.target.value)}
            className="border-2 "
          />
        </div>
        <div className="my-4">
          <label className="text">Recipe Description</label>
          <input
            type="text"
            onChange={(e) => props.setDescription(e.target.value)}
            className="border-2"
          />
        </div>
        <div className="my-4">
          <label className="text-xl">Author</label>
          <input
            type="text"
            onChange={(e) => props.setAuthor(e.target.value)}
            className="border-2"
          />
        </div>
        <div className="my-4">
          <label className="text">
            Recipe Steps (Separate steps with a new line)
          </label>
          <textarea
            onChange={(e) => props.setSteps(e.target.value)}
            className="border-2"
            rows={5}
          />
        </div>
        <div className="my-4">
          <label className="text-xl">
            Ingredients (Separate ingredients with a new line)
          </label>
          <textarea
            onChange={(e) => props.setIngredients(e.target.value)}
            className="border-2 "
            rows={5}
          />
        </div>
        <div className="my-4">
          <label className="text-xl">
            Publish Year (to be automated later)
          </label>
          <input
            type="number"
            onChange={(e) => props.setPublishedYear(e.target.value)}
            className="border-2"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateRecipeForm;
