import React from 'react';

const Question = ({ questions, index }) => {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  let answerArray = [questions[index].correct_answer];

  questions[index].incorrect_answers.map((i) => answerArray.push(i));

  shuffleArray(answerArray);

  return (
    <div key={index}>
      <h3>
        {questions[index].question} ({index + 1}/8)
      </h3>
      <ul>
        {answerArray.map((answer, i) => (
          <li key={i}>
            <button className="btn_answers">{answer}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;