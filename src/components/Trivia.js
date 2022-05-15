import React from "react";
import Question from "./Question";
import Answer from "./Answer";
import createStateObj from "../utility/createStateObj";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import { trackPromise } from "react-promise-tracker";
import GameStats from "./GameStats";

export default function Trivia() {
  const [gameData, setGameData] = React.useState([
    {
      question: "|question|",
      answerObjects: [
        {
          answerid: "nanoid",
          answer: "|mappedAnswer|",
          isCorrect: false,
          toggled: false,
        },
      ],
      correct_answer: "|correct_answer|",
    },
  ]);
  const [gameStats, setGameStats] = React.useState(
    JSON.parse(localStorage.getItem("gameStats")) || {
      totalGames: 0,
      totalWins: 0,
    }
  );
  const [endGame, setEndGame] = React.useState(false); // once all answers selected // submit button
  const [scoreCount, setScoreCount] = React.useState(0); // track score
  const [startNewGame, setStartNewGame] = React.useState(false);
  const [gameStage, setGameStage] = React.useState(0);
  // gameStage: Where we are on the app: 0 for fresh arrival on game page, 1 for submitted state, 2 for new game state

  React.useEffect(() => {
    trackPromise(
      fetch(
        "https://opentdb.com/api.php?amount=5&category=20&difficulty=medium&type=multiple"
      )
        .then((res) => res.json())
        .then((data) =>
          setGameData(() =>
            data.results.map((item) => {
              return createStateObj(item);
            })
          )
        )
    );
  }, [startNewGame]);

  React.useEffect(() => {
    localStorage.setItem("gameStats", JSON.stringify(gameStats));
  }, [gameStats]);

  //

  function onClick(answerid) {
    setGameData((prevData) => {
      //
      return prevData?.map((pam) => {
        //
        const diffData = pam?.answerObjects?.map((ansObj) => {
          if (answerid == ansObj.answerid) {
            return {
              ...ansObj,
              toggled: !ansObj.toggled,
              // toggled: true,
            };
            // How to retrieve the question?! param wont work..
          } // // // // // ===> Only do below (set toggle false) for answers matching their question (or questionid, but in that case will also have to update the radio name groups)
          // if ((question = question)) {
          //   return {
          //     ...ansObj,
          //     toggled: false,
          //   };
          // } else
          else {
            // return {
            //   ...ansObj,
            //   toggled: false, // however, this must only set false to the answers in the questiongroup (questionID)
            // };
            return ansObj;
          }
        });
        //
        return {
          ...pam,
          answerObjects: diffData,
          // questionToggled: true,
        };
        //}
      });
      //
    });
  }

  function correctChecker() {
    setGameData((prevData) => {
      //
      return prevData?.map((pom) => {
        //
        const upd = pom?.answerObjects?.map((innerPom) => {
          //
          if (innerPom.toggled && pom.correct_answer == innerPom.answer) {
            setScoreCount((prevCount) => prevCount + 1);
            return {
              ...innerPom,
              isCorrect: true,
            };
          } else {
            return innerPom;
          }
          //
        });
        //
        return {
          ...pom,
          answerObjects: upd,
        };
      });
    });
    //
    gameBoard(); // Game statistics
  }

  // async
  function gameBoard() {
    // await correctChecker();

    // console.log(scoreCount); // problem is that scoreCount isnt rendered yet
    setGameStats((prevHistory) => {
      if (scoreCount == 5) {
        return {
          ...prevHistory,
          totalGames: prevHistory.totalGames + 1,
          totalWins: prevHistory.totalWins + 1,
        };
      } else {
        return {
          ...prevHistory,
          totalGames: prevHistory.totalGames + 1,
        };
      }

      // return {
      //   ...prevHistory,
      //   totalGames: prevHistory.totalGames + 1,
      //   totalAnswers: prevHistory.totalAnswers + 20,
      //   totalCorrect: prevHistory.totalCorrect + { scoreCount }, // need to fix
      //   // need to fix
      //   totalWins:
      //     { scoreCount } == 5
      //       ? prevHistory.totalWins + 1
      //       : prevHistory.totalWins,
      // };
    });
    // }
  }

  function submit() {
    correctChecker();
    setEndGame(true);
    setGameStage(1); // Proceed to stage 1
  }

  function newGame() {
    setEndGame(false);
    setStartNewGame((prev) => !prev);
    setScoreCount(0);
    setGameStage(0); // Reset game
  }

  const gameElements = gameData?.map((trivia) => {
    return (
      <div className="game-container" key={nanoid()}>
        <Question question={trivia.question} />
        <div className="answer-container">
          {trivia?.answerObjects?.map((innerTrivia) => {
            return (
              <div>
                <Answer
                  key={nanoid()}
                  answer={innerTrivia.answer}
                  answerid={innerTrivia.answerid}
                  onClick={() => onClick(innerTrivia.answerid)}
                  toggled={innerTrivia.toggled}
                  isCorrect={innerTrivia.isCorrect}
                  gameOver={endGame}
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
      {gameStage == 0 && (
        <div>
          {gameElements}
          <div className="button-box">
            <div className="button" onClick={submit}>
              Submit Answers
            </div>
          </div>
        </div>
      )}
      {gameStage == 1 && (
        <div>
          {gameElements}
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
      <GameStats
        totalGames={gameStats?.totalGames}
        totalWins={gameStats?.totalWins}
      />
    </div>
  );
}
