import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Recipe from "../RecipeIndex/RecipesIndex";
import "./ShowRecipe.css";

interface ShowEditorProps {
  name: string;
  wysiwygHtml: string;
  author: string;
  description: string;
  tags: Array<string>;
  difficulty: string;
}

const ShowEditor = (props: ShowEditorProps) => {
  return (
    <div>
      <h1 className="heading page-margin-top">{props.name}</h1>
      <div
        className="editor-content-container"
        dangerouslySetInnerHTML={{ __html: props.wysiwygHtml }}
      ></div>
    </div>
  );
};

export default ShowEditor;
