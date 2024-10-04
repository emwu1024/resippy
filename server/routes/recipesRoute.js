import express from 'express';
import { getRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe, getRecipeBySearch, getAllTags } from '../controllers/recipesController.js';

const router = express.Router();

router.get('/', getRecipes);
router.get('/search', getRecipeBySearch);
router.get('/tags', getAllTags);
router.get('/:id', getRecipe);
router.post('/',  createRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router;
