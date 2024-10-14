import React, { useState, useRef } from "react";
import "./QuizComponent.css";
import { quizQuestion } from "../DummyData/quizQuestions";

const QuizComponent = () => {
  const [index, setIndex] = useState(0); //for index
  const [getQuestion, setGetQuestion] = useState(quizQuestion[index]); //using index displaying first element in object
  const [clicked, setClicked] = useState(false); //using for disable and enable Next button
  const [lockOption, setLockOption] = useState(false); //using for locking options, once an option is clicked
  const [score, setScore] = useState(0); //using for updating the score to display at the end

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const options_array = [Option1, Option2, Option3, Option4];

  const getAnswer = (e, ans) => {
    if (lockOption === false) {
      if (getQuestion.answer === ans) {
        //adding correct class to selected option
        e.target.classList.add("correct");
        //changing state of setClicked to true to enable button on click any option
        setClicked(true);
        //changing state of setLockOption to true to make sure that we can't click options twice
        setLockOption(true);
        setScore((prev) => prev + 1);
      } else {
        // adding wrong class to selected option
        e.target.classList.add("wrong");
        //changing state of setClicked to true to enable button on click any option
        setClicked(true);
        //changing state of setLockOption to true to make sure that we can't click options twice
        setLockOption(true);

        //when a person select wrong answer it will automatically adds correct class to right answer
        options_array[getQuestion.answer - 1].current.classList.add("correct");
        // return null;
      }
    }
  };

  //nextbutton is use to navigate form one quiestion to another
  const nextButton = () => {
    setIndex(index + 1);
    setGetQuestion(quizQuestion[index + 1]);
    setLockOption(false);

    // if statement below is removing the css properties of previous question

    if (clicked) {
      options_array.map((item) => {
        item.current.classList.remove("wrong");
        item.current.classList.remove("correct");
      });
    }

    setClicked(false);
  };

  //button to restart quiz after completion

  const restartQuizBtn = () => {
    setIndex(0);
    setGetQuestion(quizQuestion[0]);
    setScore(0);
    lockOption(false);
  };

  return (
    <div className="quizWrapper">
      <h1>Quiz App</h1>
      <hr></hr>
      {index === quizQuestion.length ? (
        <div className="scoreboard">
          <marquee>
            {" "}
            <h2 className="finalScore">
              Your Score is {score} out of {quizQuestion.length}
            </h2>
          </marquee>
          <button className="restartButton" onClick={restartQuizBtn}>
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <div>
            <h3>
              {index + 1}. {getQuestion.question}
            </h3>
            <ul>
              <li
                onClick={(e) => {
                  getAnswer(e, 1);
                }}
                ref={Option1}
                className="option"
              >
                {getQuestion.option1}
              </li>
              <li
                onClick={(e) => {
                  getAnswer(e, 2);
                }}
                ref={Option2}
                className="option"
              >
                {getQuestion.option2}
              </li>
              <li
                onClick={(e) => {
                  getAnswer(e, 3);
                }}
                ref={Option3}
                className="option"
              >
                {getQuestion.option3}
              </li>
              <li
                onClick={(e) => {
                  getAnswer(e, 4);
                }}
                ref={Option4}
                className="option"
              >
                {getQuestion.option4}
              </li>
            </ul>
          </div>
          {clicked ? (
            <button onClick={nextButton} className="activeButton">
              Next
            </button>
          ) : (
            <button disabled className="disableButton">
              Next
            </button>
          )}
        </>
      )}
      <div className="questionCount">
        {index === quizQuestion.length ? quizQuestion.length : index + 1} out of{" "}
        {quizQuestion.length} Questions
      </div>
    </div>
  );
};

export default QuizComponent;
