import express from "express";
import {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeBySearch,
  getAllTags,
  getRandomRecipe,
  getAllUsedDifficulty,
  getRecipesShort,
} from "../controllers/recipesController.js";

import { validateRecipe } from "../validators/recipesValidator.js";

import { getCloudinarySignature } from "../controllers/cloudinaryControllers.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/short", getRecipesShort);
router.post("/cloud", getCloudinarySignature);
router.get("/search", getRecipeBySearch);
router.get("/tags", getAllTags);
router.get("/ratings", getAllUsedDifficulty);
router.get("/random", getRandomRecipe);
router.get("/:id", getRecipe);
router.post("/", validateRecipe, createRecipe);
router.put("/:id", validateRecipe, updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
