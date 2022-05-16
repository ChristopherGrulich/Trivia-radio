import shuffle from "./shuffle";
import { nanoid } from "nanoid";

export default function createStateObj(item) {
  const answersRandom = shuffle([
    item.correct_answer,
    ...item.incorrect_answers,
  ]);

  // replaceAll below will fix the API's escaped entities

  const answers = answersRandom.map((answer) => {
    return {
      answerid: nanoid(),
      answer: answer
        .replaceAll("&#039;", "'")
        .replaceAll("&amp;", "&")
        .replaceAll("&quot;", '"'),
      isCorrect: false,
      toggled: false,
    };
  });

  return {
    question: item.question
      .replaceAll("&#039;", "'")
      .replaceAll("&amp;", "&")
      .replaceAll("&quot;", '"'),
    answerObjects: answers,
    correct_answer: item.correct_answer,
  };
}
