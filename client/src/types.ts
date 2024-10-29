export interface RecipeObject {
    _id: string;
    name: string;
    description: string;
    author: string;
    createdAt: string;
    thumbnail: string;
    isStandardised: boolean;
    tags: string[];
    ingredients: string[];
    steps: string[];
    images: string[];
    difficulty: string;
    editorHtml: string;
  }