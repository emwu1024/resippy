import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import Navbar from '../components/Navbar/Navbar';
import PageContentContainer from '../components/PageContentContainer/PageContentContainer';

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
    <div>
      <Navbar></Navbar>
      <PageContentContainer>
        <h1 className="text-3xl my-8">Recipes List</h1>
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">
                Recipe Name
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Recipe Description
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={recipe._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {recipe.name}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {recipe.description}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {recipe.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {recipe.publishedYear}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/recipes/details/${recipe._id}`}>
                      {/* Debug Tip: React Icons + Typescript do NOT like the className attribute */}
                      <BsInfoCircle color="green" />
                    </Link>
                    <Link to={`/recipes/edit/${recipe._id}`}>
                      <AiOutlineEdit color="green" />
                    </Link>
                    <Link to={`/recipes/delete/${recipe._id}`}>
                      <MdOutlineDelete color="green" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/recipes/create"></Link>
      </PageContentContainer>
    </div>
  );
};

export default RecipesIndex;
