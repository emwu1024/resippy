import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateRecipe = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [steps, setSteps] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/recipes/${id}`)
      .then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setAuthor(response.data.author);
        setSteps(formatArray(response.data.steps));
        setIngredients(formatArray(response.data.ingredients));
        setPublishedYear(response.data.publishedYear);
      })
      .catch((error) => {
        alert(
          'Error in fetching the data for this recipe, check console for further information'
        );
        console.log(error);
      });
  }, []);

  const formatArray = (recipeArray) => {
    console.log('title:');
    console.log(recipeArray);
    // console.log(typeof recipeArray);
    // console.log(recipeArray);
    const recipeString = recipeArray.toString().split(',');
    let returnString = '';

    recipeString.forEach((item: string) => {
      returnString += item + '\n';
      console.log('Another: ' + item);
    });
    console.log(returnString);
    return returnString;
    // return recipeArray;
  };

  const handleEditRecipe = () => {
    const data = {
      name,
      description,
      author,
      steps,
      ingredients,
      publishedYear,
    };
    axios
      .put(`http://localhost:8000/recipes/${id}`, data)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Edit Recipe</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
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
            Steps (Separate steps with a new line)
          </label>

          {/* FIGURE OUT LATER AFTER INGREDIENTS */}
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
            rows={5}
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Ingredients (Separate ingredients with a new line)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
            rows={5}
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditRecipe}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateRecipe;
