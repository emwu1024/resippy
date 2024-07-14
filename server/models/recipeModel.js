import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    steps: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    editorHtml: {
      type: String,
      required: false,
    },
    isRichText: {
      type: Boolean,
      required: true,
    },
    photos: {
      type: Array,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

export const Recipe = mongoose.model('Recipe', recipeSchema);
