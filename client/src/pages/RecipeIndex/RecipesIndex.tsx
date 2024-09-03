import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import Card from "../../components/Card/Card";
import examplePic from "../../assets/example-pic.webp";

const RecipesIndex = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/recipes")
      .then((response) => {
        setRecipes(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <PageContentContainer width="85%">
        <h1 className="heading page-margin-top">Recipe Index</h1>
        <Card
          recipeName="Tentacle Gnocchi"
          recipeDesc="A hearty pasta dish made with flour from the orc village and foraged tentacles. This is an example of a longer description to see how it gets handled"
          recipeImg={examplePic}
          recipeDate="31.08.24"
          recipeAuthor="Senshi"
        ></Card>
        <Card
          recipeName="Tentacle Gnocchi"
          recipeDesc="A hearty pasta dish made with flour from the orc village and foraged tentacles"
          recipeImg={examplePic}
          recipeDate="31.08.24"
          recipeAuthor="Senshi"
        ></Card>
        <Card
          recipeName="Tentacle Gnocchi"
          recipeDesc="A hearty pasta dish made with flour from the orc village and foraged tentacles"
          recipeImg={examplePic}
          recipeDate="31.08.24"
          recipeAuthor="Senshi"
        ></Card>
        <Card
          recipeName="Tentacle Gnocchi"
          recipeDesc="A hearty pasta dish made with flour from the orc village and foraged tentacles. lorem ispum dolor blah blah blah blah balh aksjdgfhlsjfks aksf ksdhg ksdlf jsld jlshdf gshg shgfl hiosahf id hilahslhdhlsbhsldgsl jls js js os "
          recipeImg={examplePic}
          recipeDate="31.08.24"
          recipeAuthor="Senshi"
        ></Card>
        <Card
          recipeName="Tentacle Gnocchi"
          recipeDesc="A hearty pasta dish made with flour from the orc village and foraged tentacles"
          recipeImg={examplePic}
          recipeDate="31.08.24"
          recipeAuthor="Senshi"
        ></Card>
        <Card
          recipeName="Tentacle Gnocchi"
          recipeDesc="A hearty pasta dish made with flour from the orc village and foraged tentacles alsfj al jasdl fjsl glds lsdfj vd gdf dkl js kdjsdlgd   d jldkg lsj d gdgj d dl  jdsf jldkj ldjg d kdj kf dg sj so s dkl dj gd jfos;jopfj  kd s jlsk glksjf ls"
          recipeImg={examplePic}
          recipeDate="31.08.24"
          recipeAuthor="Senshi"
        ></Card>
        <hr />
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
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/recipes/${recipe._id}`}>
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
