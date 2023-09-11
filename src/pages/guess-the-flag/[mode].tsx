import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import guessTheFlagStyles from '../../styles/guessTheFlag.module.css';

interface Question {
  correctCountryCountryCode: string;
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

  const handleRestartClick = () => {
    // Reset game state
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResult(false);
  }

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
            <div className={guessTheFlagStyles.resultContainer}>
              <p className={guessTheFlagStyles.resultScore}>
                Your Score: {score} / {questions.length}
              </p>
              <button
                className={guessTheFlagStyles.restartButton}
                onClick={handleRestartClick}
              >Restart</button>
            </div>
          ) : (
            <div>
              <p className={guessTheFlagStyles.score}>
                Your Score: {score} / {questions.length}
              </p>
              <img
                className={guessTheFlagStyles.flagImage}
                src={`https://flagcdn.com/w320/${questions[currentQuestionIndex].correctCountryCountryCode}.png`} alt="Flag"
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
