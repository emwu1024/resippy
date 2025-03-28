import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import Paging from "../../components/Paging/Paging";
import Card from "../../components/Card/Card";
import Searchbar from "../../components/Search/Searchbar";
import ChipInput from "../../components/Search/ChipInput";

import { difficultyList } from "../../constants";
import "./RecipeIndex.css";
import { useQuery, formatDate } from "../../utils/utils";

interface Recipe {
  _id: string;
  name: string;
  description: string;
  author: string;
  difficulty: string;
  createdAt: string;
  thumbnail: string;
  tags: string[];
}

const RecipesIndex = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("all");
  const [tags, setTags] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const query = useQuery();
  const navigate = useNavigate();
  const page = Number(query.get("page")) || 1;
  const searchQuery = query.get("searchQuery");

  const searchPost = async () => {
    if (
      search.trim() ||
      tags.length > 0 ||
      (tags[0] != "" && tags[0] != undefined) ||
      rating != "all"
    ) {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/recipes/search`,
          {
            params: {
              searchQuery: search || "none",
              tags: tags.join(","),
              rating: rating || "all",
            },
          }
        );

        setRecipes(response.data.data);
        setLoading(false);

        navigate(
          `/recipes/search?searchQuery=${search || "none"}&tags=${tags.join(
            ","
          )}&rating=${rating || "all"}`
        );
      } catch (err) {
        console.log("Search error: ", err);
        setLoading(false);
      }
    } else {
      navigate("/recipes");
      fetchRecipes(page);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPost();
    }
  };

  const fetchRecipes = async (page: number) => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:8000/recipes/short", {
        params: { page },
      });
      setRecipes(data.data); // Set fetched recipes to state
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(page);
  }, [page]);

  useEffect(() => {
    searchPost();
  }, [rating]);

  return (
    <div>
      <PageContentContainer width="85%">
        <h1 className="heading page-margin-top">Recipe Index</h1>
        <div className="search-container">
          <div className="searchbar-container">
            <Searchbar
              search={search}
              setSearch={setSearch}
              handleKeyPress={handleKeyPress}
              searchPost={searchPost}
            />
            <div className="filter-container">
              <label className="help-text">Difficulty Filter</label>
              <select
                value={rating}
                onChange={async (e) => {
                  setRating(e.target.value);
                }}
                className="difficulty-search"
              >
                {difficultyList.map((rating, index) => {
                  return (
                    <option key={index} value={rating}>
                      {rating}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="chip-container">
            <ChipInput
              tags={tags}
              setTags={setTags}
              searchPost={searchPost}
              handleKeyPress={handleKeyPress}
            />
          </div>
        </div>
        {loading ? (
          <div className="loading-icon">
            <CircularProgress sx={{ color: "#c17d42" }} size="4rem" />
          </div>
        ) : (
          <div className="cards-container">
            {recipes.map((recipe) => (
              <Link to={`/recipes/${recipe._id}`} key={recipe._id}>
                <Card
                  recipeId={recipe._id}
                  recipeName={recipe.name}
                  recipeDesc={recipe.description}
                  recipeImg={recipe.thumbnail}
                  recipeDate={formatDate(new Date(recipe.createdAt))}
                  recipeAuthor={recipe.author}
                  recipeDifficulty={recipe.difficulty}
                  recipeTags={recipe.tags}
                ></Card>
              </Link>
            ))}
          </div>
        )}

        {recipes.length < 1 && !loading && (
          <p className="descriptive-text">No results found</p>
        )}

        {!searchQuery && !tags.length && <Paging page={Number(page)} />}
      </PageContentContainer>
    </div>
  );
};

export default RecipesIndex;
