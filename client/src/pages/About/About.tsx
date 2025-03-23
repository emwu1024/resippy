import PageContentContainer from "../../components/PageContentContainer/PageContentContainer";
import AuthorPic from "../../assets/authorimage3.jpg";

import "./About.css";

const About = () => {
  return (
    <div>
      <PageContentContainer width="75%">
        <div className="about-container page-margin-top">
          <div className="about-author-container">
            <img
              className="about-author-img"
              src={AuthorPic}
              alt={`A brown mug and a metal bowl of mango sago on a table with plants in the background.`}
            />
          </div>
          <div className="about-text-container">
            <h1 className="heading horizontal-centre">About</h1>
            <p>Hey there!</p>
            <p>Welcome to the Resippy's website ^-^</p>
            <p>This is a website I made to host:</p>
            <p>
              My recipes, friends recipes, and recipes from other sources to
              keep as reference.
            </p>
            <p>
              Parts of the website are still under development and recipes will
              be continuously added, so expect to see some changes here over
              time!
            </p>
          </div>
        </div>
      </PageContentContainer>
    </div>
  );
};

export default About;
