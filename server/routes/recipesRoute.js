import express from 'express';
import { Recipe } from '../models/recipeModel.js';

const router = express.Router();

// get method of Express sets up HTTP GET for the path '/'
// the arrow function in the second argument is a request handler that takes req and res as 2 parameters. req has information on incoming http request and res sends response back to client
router.get('/', async (request, response) => {
  try {
    console.log('test');
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

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const recipe = await Recipe.findById(id);
    return response.status(200).json(recipe);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// Since post = update, remember to autopopulate the fields with the previous data so that it isn't left empty.
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.steps ||
      !request.body.ingredients ||
      !request.body.publishedYear
    ) {
      return response.status(400).send({
        message: 'You forgot a field :(',
      });
    }
    const newRecipe = {
      title: request.body.title,
      author: request.body.author,
      description: request.body.description,
      steps: request.body.steps,
      ingredients: request.body.ingredients,
      publishedYear: request.body.publishedYear,
    };

    const recipe = await Recipe.create(newRecipe);
    return response.status(201).send(recipe);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.steps ||
      !request.body.ingredients ||
      !request.body.publishedYear
    ) {
      return response.status(400).send({
        message: 'You forgot a field :(',
      });
    }

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
