import express from 'express';
import { Recipe } from '../models/recipeModel.js';

const router = express.Router();

// get method of Express sets up HTTP GET for the path '/'
// the arrow function in the second argument is a request handler that takes req and res as 2 parameters. req has information on incoming http request and res sends response back to client
router.get('/', async (request, response) => {
  try {
    console.log('working >:D');
    const recipes = await Recipe.find({});
    return response.status(200).json({
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
    console.log('hmm it failed');
  }
});

// Get individual recipe
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const recipe = await Recipe.findById(id);
    return response.status(200).json(recipe);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// Create
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.description ||
      !request.body.author ||
      !request.body.steps ||
      !request.body.ingredients ||
      !request.body.publishedYear
    ) {
      console.log(request.body);
      return response.status(400).send({
        message: 'You forgot a field :(',
      });
    }

    // Since steps and ingredients are arrays they will be processed differently
    let stepsString = request.body.steps;
    let stepsArray = stepsString.split('\n');

    let ingredientsString = request.body.ingredients;
    let ingredientsArray = ingredientsString.split('\n');

    const newRecipe = {
      name: request.body.name,
      author: request.body.author,
      description: request.body.description,
      steps: stepsArray,
      ingredients: ingredientsArray,
      publishedYear: request.body.publishedYear,
    };

    const recipe = await Recipe.create(newRecipe);
    return response.status(201).send(recipe);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// Update | Edit
// take away trailing whitespaces if existent
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.author ||
      !request.body.steps ||
      !request.body.ingredients ||
      !request.body.publishedYear
    ) {
      return response.status(400).send({
        message: 'You forgot a field :(',
      });
    }

    // ok real talk there's probably a better way to handle arrays in mongodb but im not sure what it is rn
    // so will revisit this later but for now we ball

    request.body.steps = request.body.steps.trim().split('\n');

    request.body.ingredients = request.body.ingredients.trim().split('\n');

    const { id } = request.params;
    const result = await Recipe.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Recipe not found' });
    }

    return response
      .status(200)
      .send({ message: 'Recipe updated successfully' });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// Delete recipe
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Recipe.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'Recipe not found' });
    }
    return response
      .status(200)
      .send({ message: 'Recipe deleted successfully' });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;
