import { body, validationResult } from "express-validator";

export const validateRecipe = [
  body("name").isString().notEmpty().withMessage("Recipe Name is required."),
  body("cloudinaryId")
    .isString()
    .notEmpty()
    .withMessage("Cloudinary ID is required."),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Recipe Description is required."),
  body("author")
    .isString()
    .notEmpty()
    .withMessage("Recipe Author is required."),
  body("thumbnail")
    .isString()
    .notEmpty()
    .withMessage("Recipe Thumbnail is required."),
  body("difficulty")
    .isString()
    .notEmpty()
    .withMessage("Recipe Difficulty is required."),

  body("isStandardised")
    .isBoolean()
    .withMessage("isStandardised must be a boolean value."),

  body("steps").custom((value, { req }) => {
    if (req.body.isStandardised) {
      if (!value || typeof value !== "string") {
        throw new Error(
          "Format selected is standardised so steps are required and must be a string."
        );
      }
    }
    return true;
  }),

  body("ingredients").custom((value, { req }) => {
    if (req.body.isStandardised) {
      if (!value || typeof value !== "string") {
        throw new Error(
          "Format selected is standardised so ingredients are required and must be a string."
        );
      }
    }
    return true;
  }),

  body("editorHtml").custom((value, { req }) => {
    if (!req.body.isStandardised) {
      if (!value.trim() || typeof value !== "string") {
        throw new Error(
          "Formated selected is Editor so the text in the editor cannot be empty and must be a string."
        );
      }
    }
    return true;
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
