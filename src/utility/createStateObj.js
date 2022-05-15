import shuffle from "./shuffle";
import { nanoid } from "nanoid";

export default function createStateObj(item) {
  const answersRandom = shuffle([
    item.correct_answer,
    ...item.incorrect_answers,
  ]);

  const answers = answersRandom.map((answer) => {
    return {
      answerid: nanoid(),
      answer,
      isCorrect: false,
      toggled: false,
    };
  });

  return {
    question: item.question,
    answerObjects: answers,
    correct_answer: item.correct_answer,
  };
}
