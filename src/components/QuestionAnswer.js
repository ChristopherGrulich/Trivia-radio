import React from "react";
import { nanoid } from "nanoid";

export default function QuestionAnswer(props) {
  const { gameData, onChange, gameStage, submit } = props;
  gameData?.map((item) => {
    return (
      <div className="questionanswer-container">
        <p className="question">{item.question}</p>
        <div className="answer-container">
          {item?.answerObjects?.map((innerItem) => {
            return (
              // the button click isnt the problem, the label is!
              <div className="answer-radio" key={nanoid()}>
                <div className="radiobox-test">
                  <input
                    type="radio"
                    id={innerItem.answerId} // giving form and label their own pair id, allows clicking on label for same radio.
                    value={innerItem.answer}
                    name={item.questionId} // groups answers together
                    onClick={submit(item.correct_answer, innerItem.answer)}
                    // checked={}
                    //   onChange={onChange}
                    // onChange={onChange(innerItem.answerId)}
                  />
                </div>
                <label htmlFor={innerItem.answerId}>{innerItem.answer}</label>
                <br></br>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
}
