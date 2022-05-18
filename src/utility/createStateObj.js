import shuffle from "./shuffle";
import { nanoid } from "nanoid";

export default function createStateObj(item, fixEscChars) {
  // Initially implemented to remove escaped chars directly from the entire gameData set... but have a bug here.
  // const s1 = JSON.stringify(item);
  // const s2 = JSON.parse(
  //   s1
  //     .replaceAll("&#039;", "'")
  //     .replaceAll("&amp;", "&")
  //     .replaceAll("&quot;", '"')
  // );

  const answersRandom = shuffle([
    item.correct_answer,
    ...item.incorrect_answers,
  ]);

  // replaceAll below will fix the API's escaped entities

  const answers = answersRandom.map((answer) => {
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
