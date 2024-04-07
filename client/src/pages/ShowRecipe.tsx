import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowRecipe = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Show Recipe</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Id</span>
          <span>{recipe._id}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Title</span>
          <span>{recipe.title}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Author</span>
          <span>{recipe.author}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Publish Year</span>
          <span>{recipe.publishYear}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Create Time</span>
          <span>{new Date(recipe.createdAt).toString()}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
          <span>{new Date(recipe.updatedAt).toString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowRecipe;
