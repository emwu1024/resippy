import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: function() {
        return this.isStandardised;
      },
    },
    author: {
      type: String,
      required: function() {
        return this.isStandardised;
      },
    },
    description: {
      type: String,
      required: function() {
        return this.isStandardised;
      },
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
