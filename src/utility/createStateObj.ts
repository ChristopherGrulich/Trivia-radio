import shuffle from "./shuffle";
import { nanoid } from "nanoid";

export default function createStateObj(item, fixEscChars) {

  const answersRandom = shuffle([
    item.correct_answer,
    ...item.incorrect_answers,
  ]);

  // replaceAll below will fix the API's escaped entities
  const answers = answersRandom.map((answer: string) => {
    return {
      answerid: nanoid(),
      answer: fixEscChars(answer),
      isCorrect: false,
      toggled: false,
    };
  });

  return {
    question: fixEscChars(item.question),
    answerObjects: answers,
    correct_answer: fixEscChars(item.correct_answer),
  };
}
