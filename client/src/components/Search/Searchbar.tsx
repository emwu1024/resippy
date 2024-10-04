import React, { useState } from "react";
import "./Searchbar.css";
import { BsSearchHeart } from "react-icons/bs";
import { IconContext } from "react-icons";

interface SearchbarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  searchPost: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Searchbar = (props: SearchbarProps) => {
  const [sizzle, setSizzle] = useState(false);
  return (
    <div className="searchbar">
      <button
        onMouseEnter={() => setSizzle(true)}
        onAnimationEnd={() => setSizzle(false)}
        className="icon-btn"
        onClick={props.searchPost}
      >
        {/* <div id={`${sizzle ? "steam-container" : ""} `}> */}
        <div id="steam-container">
          <div className="steam" id={`${sizzle ? "steam1" : ""}`}>
            {" "}
          </div>
          <div className="steam" id={`${sizzle ? "steam2" : ""}`}>
            {" "}
          </div>
          <div className="steam" id={`${sizzle ? "steam3" : ""}`}>
            {" "}
          </div>
          <div className="steam" id={`${sizzle ? "steam4" : ""}`}>
            {" "}
          </div>
          <div className="steam" id={`${sizzle ? "steam5" : ""}`}>
            {" "}
          </div>

          {/* <div className={`steam ${sizzle ? "visible" : ""}`} id="steam1">
            {" "}
          </div>
          <div className={`steam ${sizzle ? "visible" : ""}`} id="steam2">
            {" "}
          </div>
          <div className={`steam ${sizzle ? "visible" : ""}`} id="steam3">
            {" "}
          </div>
          <div className={`steam ${sizzle ? "visible" : ""}`} id="steam4">
            {" "}
          </div>
          <div className={`steam ${sizzle ? "visible" : ""}`} id="steam5">
            {" "}
          </div> */}
        </div>
        {/* className= {`search-icon ${sizzle ? "" : "sizzle"} `} */}
        <IconContext.Provider
          value={{ className: `search-icon ${sizzle ? "sizzle" : ""} ` }}
        >
          <BsSearchHeart size={"1.25rem"} />
        </IconContext.Provider>
      </button>
      <input
        type="text"
        onChange={(e) => props.setSearch(e.target.value)}
        className="search-input"
        value={props.search}
        onKeyDown={props.handleKeyPress}
        placeholder="Search here"
      />
    </div>
  );
};

export default Searchbar;
