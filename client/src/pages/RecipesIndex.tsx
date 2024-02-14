import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipesIndex = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/recipes')
      .then((response) => {
        setRecipes(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl my-8">Recipes List</h1>
      <Link to="/recipes/create"></Link>
      <h1>RECIPES INDEX</h1>
    </div>
  );
};

export default RecipesIndex;
