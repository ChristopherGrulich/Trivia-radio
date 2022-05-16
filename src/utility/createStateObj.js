import shuffle from "./shuffle";
import { nanoid } from "nanoid";

export default function createStateObj(item) {
  // const s1 = JSON.stringify(item);
  // const s2 = JSON.parse(
  //   s1
  //     .replaceAll("&#039;", "'")
  //     .replaceAll("&amp;", "&") // Initially implemented to remove escaped chars from the entire gameData set... but have a bug here.
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
    correct_answer: item.correct_answer
      .replaceAll("&#039;", "'")
      .replaceAll("&amp;", "&")
      .replaceAll("&quot;", '"'),
  };
}
