import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ShowRecipe.css";

import Recipe from "../RecipeIndex/RecipesIndex";

interface ShowEditorProps {
  name: string;
  wysiwygHtml: string;
  author: string;
  description: string;
  tags: string;
  difficulty: Array<string>;
}

const ShowEditor = (props: ShowEditorProps) => {
  return (
    <div>
      <h1 className="heading page-margin-top">{props.name}</h1>
      {/* {props.wysiwygHtml} */}
      <div dangerouslySetInnerHTML={{ __html: props.wysiwygHtml }}></div>
    </div>
  );
};

export default ShowEditor;
