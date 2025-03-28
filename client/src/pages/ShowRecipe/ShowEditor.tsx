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
      <hr className="decorative-hr" />
      <p>By: {props.author}</p>
      <p>Difficulty: {props.difficulty}</p>
      <div
        className="editor-content-container"
        dangerouslySetInnerHTML={{ __html: props.wysiwygHtml }}
      ></div>
    </div>
  );
};

export default ShowEditor;
