import React from "react";
import createStateObj from "../utility/createStateObj";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import { trackPromise } from "react-promise-tracker";
import QuestionAnswer from "./QuestionAnswer";

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
          isToggled: false,
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

  function submit(e, answer, correctAnswer) {
    if (answer == correctAnswer) {
      //set stage questio isCorrect true, else if answer != correctAnswer false, else null
    }
    e.preventDefault();
    console.log("Submit function");
    setGameStage(1); //Proceed to stage 1
  }

  function onChange() {
    // undo previous boolean and change next
    console.log("onChange function");
    // document.querySelectorAll(
    //   'label[type="radio"]:checked'
    // ).style.backgroundColor = "red";
  }

  function newGame() {
    console.log("newGame function");
    setGameStage(0); //Restart Game
    setStartNewGame((prev) => !prev);
    setScoreCount(0);
  }

  return (
    <div className="game-container">
      <form onSubmit={submit(answer, correctAnswer)}>
        // WIP, we need to submit with answer and correct answer params, then
        toggle if isCorrect or not
        <QuestionAnswer
          gameData={gameData}
          onChange={onChange}
          gameStage={gameStage}
        />
        {gameStage === 0 && (
          <div className="button-box">
            <button
              className="button"
              // onClick={submit}
              type="submit"
            >
              Submit Answers
            </button>
          </div>
        )}
      </form>
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
          <div className="button" onClick={newGame}>
            Start New Game
          </div>
        </div>
      )}
      {/* <button onClick={submit}>Submit</button> form button also needs to be within form*/}
    </div>
  );
}

// function onChange(answerId) {
//   document.getElementById({ answerId }).addEventListener("click", () => {
//     document.querySelector(`label[type="radio"]`).classList.add("");
//   });
// }

//
//
// function submit() {
//   const nodeList = document.querySelectorAll('input[type="radio"]:checked');
//   // on to something here!!
//   [...nodeList].forEach((element) => {
//     if (element.value == element.getAttribute("correct_answer")) {
//       setScoreCount((prev) => prev + 1);
//       console.log("Yurekah!"); // testing purposes
//     } //add background coloring here
//     // classname ".answer-radio label"
//   });
//   setGameStage(1); //Proceed to stage 1
// }
