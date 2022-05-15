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
    }
    // else if (gameOver && isCorrect) {
    //   //trying to make correct button change to green to show which was correct after game
    //   style = {
    //     backgroundColor: "blue", //blue for debug, green for launch
    //   };
    // }
    else if (gameOver === false && toggled) {
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
