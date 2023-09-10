import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import guessTheFlagStyles from '../../styles/guessTheFlag.module.css';

interface Question {
  correctCountryFlagUrl: string;
  correctCountryCountryName: string;
  optionsCountryNames: string[];
}

const GuessTheFlagGame: React.FC = () => {
  const router = useRouter();
  const region = router.query.mode;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Fetch questions
    if (region) {
      fetch(`/api/getGuessTheFlagQuestions?region=${region}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setQuestions(data)
          console.log(questions)
        })
        .catch((err) => {
          console.log('Error fetching data:', err)
        })
    }
  }, [region]);

  const handleAnswerClick = (selectedOption: string) => {
    // Correct answer
    if (selectedOption === questions[currentQuestionIndex].correctCountryCountryName) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of the game, show the result
      setShowResult(true);
    }
  };

  const renderOptions = () => {
    return questions[currentQuestionIndex].optionsCountryNames.map((option, index) => (
      <li
        key={index}
        className={guessTheFlagStyles.optionContainer}
      >
          <button
          className={guessTheFlagStyles.optionButton}
          onClick={() => handleAnswerClick(option)}
        >
          {option}
        </button>
      </li>

    ));
  };

  return (
    <div>
      {questions.length > 0 ? (
          showResult ? (
            <div>
              <h2>Result</h2>
              <p>Your Score: {score} / {questions.length}</p>
              {/* TODO Add a button to restart the game */}
            </div>
          ) : (
            <div>
              <p className={guessTheFlagStyles.score}>
                Your Score: {score} / {questions.length}
              </p>
              <img
                className={guessTheFlagStyles.flagImage}
                src={questions[currentQuestionIndex].correctCountryFlagUrl} alt="Flag"
              />
              <ul className={guessTheFlagStyles.optionsContainer}>
                {renderOptions()}
              </ul>
            </div>
          )
        ) : (
        <div> Loading... </div>
      )}

    </div>
  );
};

export default GuessTheFlagGame;
