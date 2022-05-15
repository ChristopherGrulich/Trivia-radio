import React from "react";

export default function Question(props) {
  const { question } = props;

  return (
    <div className="question">
      <p>{question}</p>
    </div>
  );
}
