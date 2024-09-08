import express from 'express';
import { Recipe } from '../models/recipeModel.js';

const router = express.Router();

// Get all recipes
export const getRecipes = async (req, res) => { 
    try {
        console.log('working >:D');
        const recipes = await Recipe.find({});
        return res.status(200).json({
        count: recipes.length,
        data: recipes,
      });
    } catch (error) {
        res.status(500).send({ message: error.message });
        console.log('hmm it failed');
    }
}

// Get recipes by search query
export const getRecipeBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        let query = {};

        if (searchQuery) {
        // i is a flag for ignoring case sensitivity
        const name = new RegExp(searchQuery, "i");
        query.name = name;
        }

        if (tags) {
        const tagsArray = tags.split(',').filter(tag => tag);
        if (tagsArray.length > 0) {
            query.tags = { $in: tagsArray };
        }
        }
        
        console.log("Constructed Query:", query);

        // Execute the query
        const recipes = await Recipe.find(query);
        
        res.json({ data: recipes });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

// export const getPostsBySearch = async (req, res) => {
//     const { searchQuery, tags } = req.query;

//     try {
//         const title = new RegExp(searchQuery, "i");

//         const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

//         res.json({ data: posts });
//     } catch (error) {    
//         res.status(404).json({ message: error.message });
//     }
// }

// Get single recipe by ID
export const getRecipe = async (req, res) => { 
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id);
        return res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//   Create recipe
export const createRecipe = async (req, res) => {
    try {
        if ((req.body.isStandardised === true) && 
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
            message: 'You forgot a field: \n You selected the Standardised format so check that these fields are filled in: Name, Description, Author, Thumbnail, Difficulty, Steps, Ingredients',
          });
        }
    
        else if ((req.body.isStandardised === false) && 
        (!req.body.name ||
        !req.body.description ||
        !req.body.author ||
        !req.body.thumbnail ||
        !req.body.difficulty ||
        !req.body.editorHtml )) {
          console.log(req.body);
          return res.status(400).send({
            message: 'You forgot a field: \n You selected the Rich Text format so check that these fields are filled in: Name, Description, Author, Thumbnail, Difficulty, Text Editor Content',
          });
        }
    
        // Since steps, ingredients, and tags are arrays they will be processed differently
        let stepsString = req.body.steps;
        let stepsArray = stepsString.split('\n');
    
        let ingredientsString = req.body.ingredients;
        let ingredientsArray = ingredientsString.split('\n');
    
        let tagsString = req.body.tags;
        let tagsArray = tagsString.replaceAll(' ', '').split(',');
    
        // Images are optional and are for the custom format option, this will be an array of base 64 strings
        // const newImage = req.body.images
    
        const newRecipe = {
          name: req.body.name,
          author: req.body.author,
          description: req.body.description,
          thumbnail: req.body.thumbnail,
          tags: tagsArray,
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
}

// Update recipe
// This one needs work!!! Check older commits if it isn't working
export const updateRecipe = async (req, res) => {
    try {
        if (
          !req.body.name ||
          !req.body.author ||
          !req.body.steps ||
          !req.body.ingredients
        ) {
          return res.status(400).send({
            message: 'You forgot a field :(',
          });
        }
    
        req.body.steps = req.body.steps.trim().split('\n');
    
        req.body.ingredients = req.body.ingredients.trim().split('\n');
    
        const { id } = req.params;
        const result = await Recipe.findByIdAndUpdate(id, req.body);
    
        if (!result) {
          return res.status(404).json({ message: 'Recipe not found' });
        }
    
        return res
          .status(200)
          .send({ message: 'Recipe updated successfully' });
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
}

// Delete recipe
// This one needs work!!! Check older commits if it isn't working
export const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Recipe.findByIdAndDelete(id);
        if (!result) {
          return res.status(404).json({ message: 'Recipe not found' });
        }
        return res
          .status(200)
          .send({ message: 'Recipe deleted successfully' });
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
}

export default router;