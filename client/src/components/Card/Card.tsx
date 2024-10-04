import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { useAuth0 } from "@auth0/auth0-react";

interface CardProps {
  recipeId: string;
  recipeImg: string;
  recipeName: string;
  recipeDesc: string;
  recipeDate: string;
  recipeAuthor: string;
  recipeTags?: Array<string>;
}

const Card = (props: CardProps) => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="img-tape img-tape-3">
      <div className="card-container">
        <img
          className="card-img"
          src={props.recipeImg}
          alt={`Preview image of ${props.recipeName} `}
        />
        <p className="card-heading truncate">{props.recipeName}</p>
        <p className="card-desc truncate">{props.recipeDesc}</p>
        <p className="card-date truncate">{props.recipeDate}</p>
        <p className="card-author truncate">{props.recipeAuthor}</p>
        {/* Only display the first 3 tags otherwise it looks ugly */}
        <div className="tag-container">
          {props.recipeTags?.map(
            (tag, index) =>
              tag && index < 3 && <span className="tag-text">#{tag} </span>
          )}
        </div>
        {isAuthenticated && (
          <span className="edit-icon">
            <Link to={`/recipes/edit/${props.recipeId}`}>
              <TbEdit color="green" size="1.75rem" />
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
