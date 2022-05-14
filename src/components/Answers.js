import React from "react";
import { nanoid } from "nanoid";

export default function Answers(props) {
  const { answer, answerClick } = props;
  return (
    <div className="answer-button" key={nanoid()}>
      <div
        className="button"
        onClick={answerClick}
        // style={style()}
      >
        {answer}
      </div>
    </div>
  );
}
//
//
// "toggled" prop for selection purposes
// id={innerItem.answerId} // need?
// toggled={innerItem} // new
//dont need correct answer if it already gives the mapped items in the other  file params
