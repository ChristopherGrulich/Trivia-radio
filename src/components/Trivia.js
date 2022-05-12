import React from "react";
import createStateObj from "../utility/createStateObj";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import { trackPromise } from "react-promise-tracker";

export default function Trivia() {
  const [gameData, setGameData] = React.useState([
    //gameData = [{}] from results
    {
      questionId: nanoid(),
      question: "|question|",
      answerObjects: [
        {
          answerid: nanoid(),
          answer: "|mappedAnswer|",
          correct_answer: "correct_answer",
        },
      ],
      correct_answer: "|correct_answer|",
    },
  ]);
  const [startNewGame, setStartNewGame] = React.useState(false);
  const [scoreCount, setScoreCount] = React.useState(0);
  const [gameStage, setGameStage] = React.useState(0);
  // gameStage: Where we are on the app: 0 for fresh arrival on game page, 1 for submitted state, 2 for new game state

  React.useEffect(() => {
    trackPromise(
      fetch("https://opentdb.com/api.php?amount=5&category=21&type=multiple")
        .then((res) => res.json())
        .then((data) =>
          setGameData(() =>
            data?.results?.map((pom) => {
              return createStateObj(pom);
            })
          )
        )
    );
  }, [startNewGame]);

  function submit() {
    const nodeList = document.querySelectorAll('input[type="radio"]:checked');
    // on to something here!! // Yureka!
    [...nodeList].forEach((element) => {
      if (element.value == element.getAttribute("correct_answer")) {
        setScoreCount((prev) => prev + 1);
        console.log("Yurekah!"); // testing purposes
      } //add background coloring here
      // classname ".answer-radio label"
    });
    setGameStage(1); //Proceed to stage 1
  }

  function newGame() {
    setGameStage(0); //Restart Game
    setStartNewGame((prev) => !prev);
    setScoreCount(0);
  }

  // function onChange(answerId) {
  //   document.getElementById({ answerId }).addEventListener("change", () => {
  //     document
  //       .querySelector(`label[for=${answerId}]`)
  //       .classList.add("selected-text");
  //   });
  // }

  // function onChange() {
  //   document.querySelectorAll(
  //     'input[type="radio"]:checked'
  //   ).style.backgroundColor = "blue";
  // }

  function Trivia() {
    return gameData?.map((item) => {
      return (
        <form>
          <div className="questionanswer-container" key={nanoid()}>
            <p className="question">{item.question}</p>
            <div className="answer-container">
              {item?.answerObjects?.map((innerItem) => {
                return (
                  <div className="answer-radio" key={nanoid()}>
                    <label for={innerItem.answerId}>
                      <input
                        type="radio"
                        id={innerItem.answerId} // giving form and label their own pair id, allows clicking on label for same radio.
                        value={innerItem.answer}
                        name={item.questionId} // groups answers together
                        correct_answer={item.correct_answer}
                        // onChange={onChange}
                        // onChange={onChange(innerItem.answerId)}
                      />
                      {innerItem.answer}
                    </label>
                    <br></br>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      );
    });
  }

  return (
    <div className="game-container">
      <Trivia />
      {gameStage === 1 && (
        <div>
          <h2>Score: {scoreCount} / 5</h2>
          {scoreCount == 5 && (
            <div>
              <ReactConfetti />
              <h2>Perfect score, congrats!</h2>
            </div>
          )}
          <h3>Up for another round?</h3>
          <div className="newgame-button" onClick={newGame}>
            Start New Game
          </div>
        </div>
      )}
      {gameStage === 0 && (
        <div className="submit-button" onClick={submit}>
          Submit Answers
        </div>
      )}
      {/* <button onClick={submit}>Submit</button> form button also needs to be within form*/}
    </div>
  );
}
