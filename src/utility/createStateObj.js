import shuffle from "./shuffle";
import { nanoid } from "nanoid";

export default function createStateObj(pom) {
  const answersArray = shuffle([...pom.incorrect_answers, pom.correct_answer]); // randomized answers array

  const answers = answersArray.map((answer) => {
    return {
      answerid: nanoid(),
      answer,
      correct_answer: pom.correct_answer,
    };
  });

  return {
    questionId: nanoid(),
    question: pom.question,
    answerObjects: answers,
    correct_answer: pom.correct_answer,
  };
}
