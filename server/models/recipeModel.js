import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    steps: {
      type: Array,
      required: false,
    },
    ingredients: {
      type: Array,
      required: false,
    },
    publishedYear: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Recipe = mongoose.model('Recipe', recipeSchema);
