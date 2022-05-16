import React from "react";
import { nanoid } from "nanoid";

export default function Answer(props) {
  const { answer, answerid, question, onClick, toggled, isCorrect, gameOver } =
    props;

  function style() {
    let style;
    if (gameOver && toggled && isCorrect) {
      style = {
        backgroundColor: "rgb(87, 183, 106)",
      };
    } else if (gameOver && toggled && isCorrect !== true) {
      style = {
        backgroundColor: "rgb(243, 139, 139)",
      };
    } else if (gameOver === false && toggled) {
      style = {
        backgroundColor: "rgb(94, 180, 238)",
      };
    }

    return style;
  }

  return (
    <div className="answer-radio" key={nanoid()}>
      <div className="radiobox-test">
        <input
          type="radio"
          id={answerid} // giving form and label their own pair id, allows clicking on label for same radio.
          value={answer}
          name={question} // groups answers together
          onClick={onClick}
          checked={toggled}
          readOnly
        />
      </div>
      <label htmlFor={answerid} style={style()}>
        {answer}
      </label>
      <br></br>
    </div>
  );
}
