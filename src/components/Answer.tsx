import React from "react";
import { nanoid } from "nanoid";
import { Radio } from 'antd';
import { AnswerProps } from "../utility/types";

export const Answer: React.FC<AnswerProps> = (props: AnswerProps) => {
  const { 
    answer, 
    answerid,
    question, 
    onClick, 
    toggled, 
    isCorrect, 
    gameOver 
  } = props;



  function style() {

      if (toggled) {
        if (gameOver) {
          if (isCorrect) {
              return {backgroundColor: "rgb(87, 183, 106)"}
          } else {
              return {backgroundColor: "rgb(243, 139, 139)"}
          }
        } else {
              return {backgroundColor: "rgb(85, 187, 254)"}
        }
      }
  }

  return (
    
    <div key={nanoid()}>
      <Radio.Group
      name={question}
      style={style()}
      >
      <Radio.Button 
      value={answer}
      checked={toggled}
      onClick={onClick}
      >
      {answer}
      </Radio.Button>
    </Radio.Group>
      {/* <div className="radiobox">
        <input
          type="radio"
          id={answerid} // giving form and label their own pair id, allows clicking on label for same radio.
          value={answer}
          name={question} // groups answers together
          onClick={onClick}
          checked={toggled}
          readOnly
        />
      </div> */}
      {/* <label htmlFor={answerid} >
        {answer}
      </label> */}
      <br></br>
    </div>
  );
}

export default Answer