import React from "react";
import "./Searchbar.css";

interface SearchbarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Searchbar = (props: SearchbarProps) => {
  return (
    <div>
      <div className="form-field-container">
        <label className="form-label">*Name of Recipe</label>
        <input
          type="text"
          onChange={(e) => props.setSearch(e.target.value)}
          className="form-field input-text"
          value={props.search}
          onKeyDown={props.handleKeyPress}
        />
      </div>
    </div>
  );
};

export default Searchbar;
