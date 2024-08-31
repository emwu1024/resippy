import React from "react";
import "./Card.css";

interface CardProps {
  recipeImg: string;
  recipeName: string;
  recipeDesc: string;
  recipeDate: string;
  recipeAuthor: string;
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
        <p className="card-desc">{props.recipeDesc}</p>
        <span className="card-date">{props.recipeDate}</span>
        <span className="card-author">{props.recipeAuthor}</span>
        {/* To do: 
      - maybe make a helper function to format date
      - edit database so created date and mandatory display image are added
      - Add enlarged hover effect
      - Clean database of old data so ready for new data
      - Add some actual data
       */}
      </div>
    </div>
  );
};

export default Card;
