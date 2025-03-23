import "./Button.css";

interface ButtonProps {
  btnText: string;
  disabled?: boolean;
  onClick: () => any;
}

const Button = (props: ButtonProps) => {
  return (
    <div>
      <button className="btn" onClick={props.onClick} disabled={props.disabled}>
        {props.btnText}
      </button>
    </div>
  );
};

export default Button;
