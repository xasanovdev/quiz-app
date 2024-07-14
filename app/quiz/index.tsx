"use client";

import { questions } from "@/public/data/questions";
import React, { useState, useEffect } from "react";
import TrueFalseQuestion from "../components/Quiz/QuestionTypes/TrueFalseQuestion";
import DragAndDropQuestion from "../components/Quiz/QuestionTypes/DragAndDropQuestion";
import TextInputQuestion from "../components/Quiz/QuestionTypes/TextInputQuestion";

import { Answer, OverviewAnswers, Question } from "@/types/question";
import SingleChoiceQuestion from "../components/Quiz/QuestionTypes/SingleChoiseQuestion";
import MultipleChoiceQuestion from "../components/Quiz/QuestionTypes/MultipleChoiseQuestion";
import Overview from "../components/Quiz/Overview";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>(questions);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [overviewAnswers, setOverviewAnswers] = useState<OverviewAnswers[]>([]);
  const [score, setScore] = useState(0);
  const [textInputAnswer, setTextInputAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionClick = (option: string | boolean | string[]) => {
    if (
      currentQuestion.type === "single-choice" ||
      currentQuestion.type === "true-false"
    ) {
      setAnswers([
        ...answers,
        { question: currentQuestion.question, answer: option },
      ]);
    } else if (currentQuestion.type === "multiple-choice") {
      const selectedOptions =
        (answers[currentQuestionIndex]?.answer as string[]) || [];

      const newOptions = selectedOptions.includes(option as string)
        ? selectedOptions.filter((opt) => opt !== option)
        : [...selectedOptions, option as string];

      setAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[currentQuestionIndex] = {
          question: currentQuestion.question,
          answer: newOptions,
        };
        return updatedAnswers;
      });
    }
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInputAnswer(e.target.value);
  };

  const handleTextInputSubmit = () => {
    setAnswers([
      ...answers,
      { question: currentQuestion.question, answer: textInputAnswer },
    ]);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, quizQuestions.length - 1)
    );
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const submitQuiz = () => {
    const correctAnswers = quizQuestions.filter((question) => {
      const answer = answers.find((ans) => ans.question === question.question);
      if (!answer) return false;
      if (question.type === "multiple-choice") {
        return (
          JSON.stringify(answer.answer) === JSON.stringify(question.answer)
        );
      }
      return answer.answer === question.answer;
    });

    setScore(correctAnswers.length);

    setOverviewAnswers(
      quizQuestions.map((question) => {
        const answer = answers.find(
          (ans) => ans.question === question.question
        );
        if (!answer) {
          return {
            question: question.question,
            answer: "",
            isCorrect: false,
            isAnswered: false,
          };
        }
        if (question.type === "multiple-choice") {
          return {
            question: question.question,
            answer: answer.answer,
            isCorrect:
              JSON.stringify(answer.answer) === JSON.stringify(question.answer),
            isAnswered: true,
          };
        }
        return {
          question: question.question,
          answer: answer.answer,
          isCorrect: answer.answer === question.answer,
          isAnswered: true,
        };
      })
    );

    setIsSubmitted(true);
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "single-choice":
        return (
          <SingleChoiceQuestion
            key={question.id}
            question={question}
            onOptionClick={handleOptionClick}
          />
        );
      case "multiple-choice":
        return (
          <MultipleChoiceQuestion
            key={question.id}
            question={question}
            selectedOptions={
              (answers[currentQuestionIndex]?.answer as string[]) || []
            }
            onOptionClick={handleOptionClick}
          />
        );
      case "true-false":
        return (
          <TrueFalseQuestion
            key={question.id}
            question={question}
            onOptionClick={handleOptionClick}
          />
        );
      case "drag-and-drop":
        return <DragAndDropQuestion key={question.id} question={question} />;
      case "text-input":
        return (
          <TextInputQuestion
            key={question.id}
            question={question}
            textInputAnswer={textInputAnswer}
            onTextInputChange={handleTextInputChange}
            onTextInputSubmit={handleTextInputSubmit}
          />
        );
      default:
        return <p>{score}</p>;
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <Overview score={score} overviewAnswers={overviewAnswers} />
      ) : (
        <>
          {renderQuestion(currentQuestion)}
          <div>
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === quizQuestions.length - 1}
            >
              Next
            </button>
            <button onClick={submitQuiz}>Submit</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
