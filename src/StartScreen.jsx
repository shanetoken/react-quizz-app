import { useState } from 'react';
import QuizFetcher from './QuizFetcher';

export default function StartScreen() {
  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart(!start);
  };

  return (
    <>
      {!start && (
        <>
          <h2>Welcome to the general quizz</h2>
          <h3>8 questions to test your knowledge about the civilization</h3>
          <button onClick={handleStart}>Begin your test</button>
        </>
      )}
      <>{start && <QuizFetcher />}</>
    </>
  );
}
