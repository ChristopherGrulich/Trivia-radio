import React from "react";
import createStateObj from "../utility/createStateObj";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import { trackPromise } from "react-promise-tracker";
import Question from "./Question";
import Answers from "./Answers";

export default function Trivia() {
  const [gameData, setGameData] = React.useState([
    {
      questionId: nanoid(),
      question: "|question|",
      answerObjects: [
        {
          answerid: nanoid(),
          answer: "|mappedAnswer|",
          correct_answer: "correct_answer",
          toggled: false, // new
        },
      ],
      correct_answer: "|correct_answer|",
      isCorrect: false, //new
    },
  ]);
  const [startNewGame, setStartNewGame] = React.useState(false);
  const [scoreCount, setScoreCount] = React.useState(0);
  const [gameStage, setGameStage] = React.useState(-0);
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

  // wouldn't it just make more sense for it to be a submit button?
  function answerClick(answerid) {
    //
    console.log("Answer Click function");
    console.log(answerid);
    console.log(gameData);
    setGameData((prev) => {
      //
      const updCo = prev?.map((otem) => {
        otem?.answerObjects?.map((innerOtem) => {
          if (answerid == innerOtem.answerid) {
          }
        });
      });
      //
      return {
        ...prev,
        isCorrect: updCo,
      };
    });
    // setGameData((prevData) => {
    //   //
    //   // prevData?.map((pam) => {
    //   //   //removed return
    //   //   // const updCorr = pam?.answerObjects?.map((answerObj) => {
    //   //   //   if (answerid == answerObj.answerid) {
    //   //   //     console.log("id match");
    //   //   //     if (pam.correct_answer == answerObj.answer) {
    //   //   //       return true;
    //   //   //       // console.log("correct and id match");
    //   //   //     } else if (pam.correct_answer != answerObj.answer) {
    //   //   //       return false;
    //   //   //       // console.log("incorrect and id match");
    //   //   //     } else {
    //   //   //       // console.log("null and id match");
    //   //   //       //SET QUESTION ISCORRECT NULL
    //   //   //       //return updated answer object
    //   //   //       // return {
    //   //   //       //   ...pam,
    //   //   //       //   isCorrect: null,
    //   //   //       // };
    //   //   //     }
    //   //   //     return {
    //   //   //       ...pam,
    //   //   //       isCorrect: updCorr,
    //   //   //     };
    //   //   //   }
    //   //   // });
    //   //   // if answerid == answerid then if correct answer = answer, then
    //   //   //
    //   // });
    //   //
    // });
    //
  }

  function submitGame() {
    console.log("Submit function");
    gameData?.map((el) => {
      if (el.isCorrect == true) {
        setScoreCount((prev) => prev + 1);
        console.log("Correct +1");
      }
    });
    //for each is correct, score + 1
    //count how many questions have isCorrect true
    //this equals the score state
    setGameStage(1); //Proceed to stage 1
  }

  function newGame() {
    console.log("newGame function");
    setGameStage(0); //Restart Game
    setStartNewGame((prev) => !prev);
    setScoreCount(0);
  }

  const triviaElements = gameData?.map((item) => {
    return (
      <div className="game-container" key={nanoid()}>
        <Question question={item.question} isCorrect={item.isCorrect} />
        <div className="answer-container" key={nanoid()}>
          {item?.answerObjects?.map((innerItem) => {
            return (
              <div key={nanoid()}>
                <Answers
                  answer={innerItem.answer}
                  answerClick={
                    () => answerClick(innerItem.answerid) // problem is here
                  }
                  // toggled={innerItem.toggled} // new, styling conditionals
                />
              </div>
            );
          })}
        </div>
        <hr></hr>
      </div>
    );
  });

  return (
    <div className="game-container">
      {triviaElements}
      {gameStage === 0 && (
        <div className="button-box" key={nanoid()}>
          <div className="button" onClick={submitGame} key={nanoid()}>
            Submit Answers
          </div>
        </div>
      )}
      {gameStage === 1 && (
        <div key={nanoid()}>
          <h2>Score: {scoreCount} / 5</h2>
          {scoreCount == 5 && (
            <div key={nanoid()}>
              <ReactConfetti />
              <h2>Perfect score, congrats!</h2>
            </div>
          )}
          <h3>Up for another round?</h3>
          <div className="button" onClick={newGame} key={nanoid()}>
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
