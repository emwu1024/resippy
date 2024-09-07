import React from "react";
import "./Card.css";

interface CardProps {
  recipeImg: string;
  recipeName: string;
  recipeDesc: string;
  recipeDate: string;
  recipeAuthor: string;
  recipeTags?: Array<string>;
}

const Card = (props: CardProps) => {
  return (
    <div className="img-tape img-tape-3">
      <div className="card-container">
        <img
          className="card-img"
          src={props.recipeImg}
          alt={`Preview image of ${props.recipeName} `}
        />
        <p className="card-heading">{props.recipeName}</p>
        {props.recipeDesc.length > 80 ? (
          <p className="card-desc">{props.recipeDesc.slice(0, 79)}...</p>
        ) : (
          <p className="card-desc">{props.recipeDesc}</p>
        )}
        <span className="card-date">{props.recipeDate}</span>
        <span className="card-author">{props.recipeAuthor}</span>
        {/* Only display the first 3 tags otherwise it looks ugly */}
        {props.recipeTags?.map(
          (tag, index) => index < 3 && <span className="tag-text">#{tag} </span>
        )}
      </div>
    </div>
  );
};

export default Card;
