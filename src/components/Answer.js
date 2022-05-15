import React from "react";
import { nanoid } from "nanoid";

export default function Answer(props) {
  const { answer, answerid, question, onClick, toggled, isCorrect, gameOver } =
    props;

  function style() {
    let style;
    if (gameOver && toggled && isCorrect) {
      style = {
        backgroundColor: "green",
      };
    } else if (gameOver && toggled && isCorrect !== true) {
      style = {
        backgroundColor: "red",
      };
    } else if (gameOver === false && toggled) {
      style = {
        backgroundColor: "rgb(0, 153, 255)",
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
          checked={toggled} // should run a function that returns boolean, if there are other toggleds true then return false. if heldtrue is true then return opp.
          // hmm... what if.. if toggled = false then check if any toggled is true within the question answer group. if false, then return toggled true. if true, return toggled false.
          // onChange={} wip
          readOnly // remove for onChange
        />
      </div>
      <label htmlFor={answerid} style={style()}>
        {answer}
      </label>
      <br></br>
    </div>
  );
}
