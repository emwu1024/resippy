import React, { useState } from "react";
import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import WipComponent from "../../components/WipComponent/WipComponent";

import "./Attribution.css";

const Attribution = () => {
  return (
    <div>
      <PageContentContainer width="50%">
        <h1 className="heading page-margin-top">Attributions</h1>
        <div className="attribution-container">
          <ol className="attribution-list">
            <li className="attribution-list-item">
              <a
                className="attribution-text"
                href="https://unsplash.com/@picoftasty?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              >
                Homepage Hero Image: Photo by Mae Mu{" "}
              </a>
              <a
                className="attribution-text"
                href="https://unsplash.com/photos/sliced-apple-and-red-strawberries-on-brown-wooden-chopping-board-LgnE31R9PGc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              >
                on Unsplash
              </a>
            </li>

            <li className="attribution-list-item">
              <a
                className="attribution-text"
                href="https://unsplash.com/@bartoshevicz"
              >
                Focaccia Image: Photo by Adam Bartoszewicz{" "}
              </a>
              <a
                className="attribution-text"
                href="https://unsplash.com/photos/sliced-bread-on-white-ceramic-plate-oTU3ai-ZSsc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              >
                on Unsplash
              </a>
            </li>

            <li className="attribution-list-item">
              <a
                className="attribution-text"
                href="https://unsplash.com/@keriliwi?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              >
                Pasta Al Pomodoro Image: Photo by Keriliwi{" "}
              </a>
              <a
                className="attribution-text"
                href="https://unsplash.com/photos/selective-focus-photography-of-fork-with-spaghetti-iQwJ8DGUT3U?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              >
                on Unsplash
              </a>
            </li>

            <li className="attribution-list-item">
              <a
                className="attribution-text"
                href="https://unsplash.com/@aminrmzni?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              >
                Chicken Sandwich Image: Photo by amin ramezani{" "}
              </a>
              <a
                className="attribution-text"
                href="https://unsplash.com/photos/a-sesame-seed-chicken-sandwich-with-lettuce-and-tomato-uo9TFEUwTc0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              >
                on Unsplash
              </a>
            </li>

            <li className="attribution-list-item">
              <a
                className="attribution-text"
                href="https://unsplash.com/@eprouzet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              >
                Baked Camembert Image: Photo by Eric Prouzet{" "}
              </a>
              <a
                className="attribution-text"
                href="https://unsplash.com/photos/a-variety-of-cheeses-are-displayed-in-a-display-case-J55Xn5F-w9w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              >
                on Unsplash
              </a>
            </li>

            <li className="attribution-list-item">
              <a
                className="attribution-text"
                href="https://react-icons.github.io/react-icons/"
              >
                Icons: Icons by React Icons
              </a>
            </li>

            <li className="attribution-list-item">
              <a
                className="attribution-text"
                href="https://www.freepik.com/free-vector/collection-hand-drawn-wooden-signs_922512.htm"
              >
                Wooden Sign Panel: Image by Freepik
              </a>
            </li>
          </ol>
        </div>
      </PageContentContainer>
    </div>
  );
};

export default Attribution;
