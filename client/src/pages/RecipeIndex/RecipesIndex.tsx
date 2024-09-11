import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import Paging from "../../components/Paging/Paging";
import Card from "../../components/Card/Card";
import Searchbar from "../../components/Search/Searchbar";
import ChipInput from "../../components/Search/ChipInput";
import Button from "../../components/Buttons/Button/Button";

import examplePic from "../../assets/example-pic.webp";
import { useQuery, formatDate } from "../../utils/utils";

const RecipesIndex = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  // Tutorial uses useHistory which has been replaced with useNavigate as of react-router-dom v6
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const searchPost = async () => {
    if (search.trim() || tags.length > 0) {
      try {
        setLoading(true);

        // Logging the parameters before sending the request
        console.log("Search Query:", search);
        console.log("Tags:", tags.join(","));

        const response = await axios.get(
          `http://localhost:8000/recipes/search`,
          {
            params: {
              searchQuery: search || "none",
              tags: tags.join(","),
            },
          }
        );

        console.log("Full response: ", response);

        setRecipes(response.data.data);
        setLoading(false);

        navigate(
          `/recipes/search?searchQuery=${search || "none"}&tags=${tags.join(
            ","
          )}`
        );
      } catch (err) {
        console.log("Search error: ", err);
        setLoading(false);
      }
    } else {
      navigate("/recipes");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPost();
      console.log("enter button was pressed!");
    }
  };

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
        {recipes.map((recipe, index) => (
          <Link to={`/recipes/${recipe._id}`}>
            <Card
              recipeId={recipe._id}
              recipeName={recipe.name}
              recipeDesc={recipe.description}
              recipeImg={recipe.thumbnail}
              recipeDate={formatDate(new Date(recipe.createdAt))}
              recipeAuthor={recipe.author}
              recipeTags={recipe.tags}
            ></Card>
          </Link>
        ))}

        <Card
          recipeId={"123"}
          recipeName="Tentacle Gnocchi"
          recipeDesc="A hearty pasta dish made with flour from the orc village and foraged tentacles"
          recipeImg={examplePic}
          recipeDate="31.08.24"
          recipeAuthor="Senshi"
          recipeTags={["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"]}
        ></Card>
        <Searchbar
          search={search}
          setSearch={setSearch}
          handleKeyPress={handleKeyPress}
        />
        <ChipInput tags={tags} setTags={setTags} />
        <Button btnText="Search" onClick={searchPost}></Button>
        <Paging />
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
      </PageContentContainer>
    </div>
  );
};

export default RecipesIndex;
