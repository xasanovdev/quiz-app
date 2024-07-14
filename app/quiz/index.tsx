"use client";

import { questions } from "@/public/data/questions";
import React, { useState, useEffect } from "react";
import TrueFalseQuestion from "../components/QuestionTypes/TrueFalseQuestion";
import DragAndDropQuestion from "../components/QuestionTypes/DragAndDropQuestion";
import TextInputQuestion from "../components/QuestionTypes/TextInputQuestion";

import { Question } from "@/types/question";
import SingleChoiceQuestion from "../components/QuestionTypes/SingleChoiseQuestion";
import MultipleChoiceQuestion from "../components/QuestionTypes/MultipleChoiseQuestion";

interface Answer {
  question: string;
  answer: string | string[] | boolean;
}

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [textInputAnswer, setTextInputAnswer] = useState("");

  useEffect(() => {
    setQuizQuestions(questions);
  }, []);

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
      const userAnswer = answers.find(
        (answer) => answer.question === question.question
      )?.answer;

      if (question.type === "single-choice" || question.type === "true-false") {
        return userAnswer === question.answer;
      } else if (question.type === "multiple-choice") {
        return JSON.stringify(userAnswer) === JSON.stringify(question.answer);
      } else if (question.type === "text-input") {
        return userAnswer === question.answer;
      } else {
        return false;
      }
    });

    setScore(correctAnswers.length);
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
      {quizQuestions.length > 0 && renderQuestion(currentQuestion)}
      <div>
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
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
      <div>Score: {score}</div>
      <pre>Answer: {answers.map((val) => val.answer)}</pre>
    </div>
  );
};

export default Quiz;
