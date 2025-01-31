import express from "express";
import { Recipe } from "../models/recipeModel.js";

const router = express.Router();

// Get all recipes
export const getRecipes = async (req, res) => {
  const { page } = req.query;
  try {
    // Can change limit later
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Recipe.countDocuments({});

    console.log("Server Working!");

    const recipes = await Recipe.find({})
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    return res.status(200).json({
      count: recipes.length,
      data: recipes,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log("Server NOT working. Check network?");
  }
};

// Old code: break in case of emergency
// export const getRecipes = async (req, res) => {
//     try {
//         console.log('working >:D');
//         const recipes = await Recipe.find({});
//         return res.status(200).json({
//         count: recipes.length,
//         data: recipes,
//       });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//         console.log('hmm it failed');
//     }
// }

export const getRecipeBySearch = async (req, res) => {
  const { searchQuery, tags, rating } = req.query;

  try {
    const name = new RegExp(searchQuery, "i");
    // const recipes = await Recipe.find({ $or: [ { name }, { tags: { $in: tags.split(',') } } ]});
    // const recipes = await Recipe.find({ $and: [{difficulty: "8 Hours"}, {$or: [ { name }, { tags: { $in: tags.split(',') } } ]}]});

    let recipes;
    if (rating == "none" || rating == undefined || rating == "all") {
      recipes = await Recipe.find({
        $or: [{ name }, { tags: { $in: tags.split(",") } }],
      });
      // console.log("Searched WITHOUT rating");
    } else if (tags.length != 0 || searchQuery != "none") {
      recipes = await Recipe.find({
        $and: [
          { difficulty: rating },
          { $or: [{ name }, { tags: { $in: tags.split(",") } }] },
        ],
      });
      // console.log("Searched WITH rating");
    } else {
      // console.log("Searched WITH ONLY rating");
      recipes = await Recipe.find({ difficulty: rating });
    }

    res.json({ data: recipes });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const result = await Recipe.aggregate([
      { $unwind: "$tags" },
      { $match: { tags: { $ne: "" } } },
      { $group: { _id: null, uniqueTags: { $addToSet: "$tags" } } },
      { $project: { _id: 0, uniqueTags: 1 } },
    ]);
    const sortedTags = result[0]?.uniqueTags.sort();
    if (sortedTags) {
      res.json(sortedTags);
    } else {
      res.status(404).json({ message: "No tags found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsedDifficulty = async (req, res) => {
  try {
    const distinctDifficulties = await Recipe.distinct("difficulty");
    if (distinctDifficulties) {
      res.json(distinctDifficulties);
    } else {
      res.status(404).json({ message: "No used difficulty ratings found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single recipe by ID
export const getRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    return res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a random recipe
export const getRandomRecipe = async (req, res) => {
  const { rating } = req.query;
  try {
    let randomRecipe;
    if (rating == "all") {
      randomRecipe = await Recipe.aggregate([{ $sample: { size: 1 } }]);
    } else {
      randomRecipe = await Recipe.aggregate([
        {
          $match: { difficulty: rating },
        },
        { $sample: { size: 1 } },
      ]);
    }

    res.json(randomRecipe[0]._id || { message: "No recipe found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//   Create recipe
export const createRecipe = async (req, res) => {
  try {
    if (
      req.body.isStandardised === true &&
      (!req.body.name ||
        !req.body.description ||
        !req.body.author ||
        !req.body.thumbnail ||
        !req.body.difficulty ||
        !req.body.steps ||
        !req.body.ingredients)
    ) {
      console.log(req.body);
      return res.status(400).send({
        message:
          "You forgot a field: \n You selected the Standardised format so check that these fields are filled in: Name, Description, Author, Thumbnail, Difficulty, Steps, Ingredients",
      });
    } else if (
      req.body.isStandardised === false &&
      (!req.body.name ||
        !req.body.description ||
        !req.body.author ||
        !req.body.thumbnail ||
        !req.body.difficulty ||
        !req.body.editorHtml)
    ) {
      console.log(req.body);
      return res.status(400).send({
        message:
          "You forgot a field: \n You selected the Rich Text format so check that these fields are filled in: Name, Description, Author, Thumbnail, Difficulty, Text Editor Content",
      });
    }

    // Since steps, ingredients, and tags are arrays they will be processed differently
    let stepsString = req.body.steps;
    let stepsArray = stepsString.split("\n");

    let ingredientsString = req.body.ingredients;
    let ingredientsArray = ingredientsString.split("\n");

    // Images are optional and are for the custom format option, this will be an array of base 64 strings
    // const newImage = req.body.images

    const newRecipe = {
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      thumbnail: req.body.thumbnail,
      tags: req.body.tags,
      difficulty: req.body.difficulty,
      steps: stepsArray,
      ingredients: ingredientsArray,
      editorHtml: req.body.editorHtml,
      isStandardised: req.body.isStandardised,
      images: req.body.images,
    };

    const recipe = await Recipe.create(newRecipe);
    return res.status(201).send(recipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update recipe
export const updateRecipe = async (req, res) => {
  try {
    if (
      req.body.isStandardised === true &&
      (!req.body.name ||
        !req.body.description ||
        !req.body.author ||
        !req.body.thumbnail ||
        !req.body.difficulty ||
        !req.body.steps ||
        !req.body.ingredients)
    ) {
      console.log(req.body);
      return res.status(400).send({
        message:
          "You forgot a field: \n You selected the Standardised format so check that these fields are filled in: Name, Description, Author, Thumbnail, Difficulty, Steps, Ingredients",
      });
    } else if (
      req.body.isStandardised === false &&
      (!req.body.name ||
        !req.body.description ||
        !req.body.author ||
        !req.body.thumbnail ||
        !req.body.difficulty ||
        !req.body.editorHtml)
    ) {
      console.log(req.body);
      return res.status(400).send({
        message:
          "You forgot a field: \n You selected the Rich Text format so check that these fields are filled in: Name, Description, Author, Thumbnail, Difficulty, Text Editor Content",
      });
    }

    req.body.steps = req.body.steps.trim().split("\n");

    req.body.ingredients = req.body.ingredients.trim().split("\n");

    const { id } = req.params;
    const result = await Recipe.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res.status(200).send({ message: "Recipe updated successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete recipe
// This one needs work!!! Check older commits if it isn't working
export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Recipe.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    return res.status(200).send({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default router;
