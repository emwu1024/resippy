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
    thumbnail: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: false,
    },
    steps: {
      type: Array,
      required: function() {
        return this.isStandardised;
      },
    },
    ingredients: {
      type: Array,
      required: function() {
        return this.isStandardised;
      },
    },
    editorHtml: {
      type: String,
      required: function() {
        return !this.isStandardised;
      },
    },
    isStandardised: {
      type: Boolean,
      required: true,
    },
    images: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Recipe = mongoose.model('Recipe', recipeSchema);
