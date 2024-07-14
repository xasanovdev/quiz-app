"use client";

import { questions } from "@/public/data/questions";
import React, { useState, useEffect } from "react";
import TrueFalseQuestion from "../../components/Quiz/QuestionTypes/TrueFalseQuestion";
import DragAndDropQuestion from "../../components/Quiz/QuestionTypes/DragAndDropQuestion";
import TextInputQuestion from "../../components/Quiz/QuestionTypes/TextInputQuestion";

import { Answer, OverviewAnswers, Question } from "@/types/question";
import SingleChoiceQuestion from "../../components/Quiz/QuestionTypes/SingleChoiseQuestion";
import MultipleChoiceQuestion from "../../components/Quiz/QuestionTypes/MultipleChoiseQuestion";
import Overview from "../../components/Quiz/Overview";
import Button from "@/components/Button";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import Modal from "@/components/Modal";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitModal, setSubmitModal] = useState(false);
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
      setAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[currentQuestionIndex] = {
          question: currentQuestion.question,
          answer: option,
          id: currentQuestion.id,
        };
        return updatedAnswers;
      });
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
          id: currentQuestion.id,
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
      {
        question: currentQuestion.question,
        answer: textInputAnswer,
        id: currentQuestion.id,
      },
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
    setSubmitModal(false);

    const correctAnswers = quizQuestions.filter((question) => {
      const answer = answers?.find((ans) => ans.id === question.id);
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
        const answer = answers.find((ans) => ans.id === question.id);
        if (!answer) {
          return {
            id: question.id,
            question: question.question,
            answer: "",
            isCorrect: false,
            isAnswered: false,
          };
        }
        if (question.type === "multiple-choice") {
          return {
            id: question.id,
            question: question.question,
            answer: answer.answer,
            isCorrect:
              JSON.stringify(answer.answer) === JSON.stringify(question.answer),
            isAnswered: true,
          };
        }

        return {
          id: question.id,
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
            selectedOption={answers[currentQuestionIndex]?.answer as string}
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
            selectedOption={answers[currentQuestionIndex]?.answer as string}
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
    <>
      <div className="w-full h-full">
        {isSubmitted ? (
          <Overview score={score} overviewAnswers={overviewAnswers} />
        ) : (
          <>
            <div className="w-full py-4 top-0 border-b border-gray-300">
              <div className="container flex gap-4">
                <button
                  className="hover:bg-gray-200 rounded-full w-9 h-9 disabled:opacity-55 disabled:cursor-not-allowed flex-center"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  <FaArrowLeft />
                </button>
                <div className="grow flex-center gap-2">
                  {quizQuestions.map((question, index) => (
                    <Button
                      variant={
                        answers?.find(
                          (ans) => ans.id === question.id ?? false
                        ) ?? false
                          ? "success"
                          : index === currentQuestionIndex
                          ? "secondary"
                          : "secondary_light"
                      }
                      className="h-2 grow"
                      key={question.id}
                      onClick={() => setCurrentQuestionIndex(index)}
                    ></Button>
                  ))}
                </div>
                <button
                  className="hover:bg-gray-200 rounded-full w-9 h-9 disabled:opacity-55 disabled:cursor-not-allowed flex-center"
                  onClick={handleNext}
                  disabled={currentQuestionIndex === quizQuestions.length - 1}
                >
                  <FaArrowRight />
                </button>
                <div className="flex gap-4">
                  <p className="flex items-center gap-2 text-lg font-bold">
                    {currentQuestionIndex + 1}/{questions.length}{" "}
                    <MdQuestionAnswer />
                  </p>
                  <Button onClick={() => setSubmitModal(true)}>Submit</Button>
                </div>
              </div>
            </div>

            <div className="container w-full mt-20">
              <div className="flex gap-1 px-12">
                <span className="text-2xl font-semibold">
                  {currentQuestionIndex + 1}.{" "}
                </span>
                <div className="grow">{renderQuestion(currentQuestion)}</div>
              </div>
            </div>
          </>
        )}

        <Modal
          isOpen={submitModal}
          onClose={() => setSubmitModal(false)}
          title=""
        >
          <p className="text-base font-medium">
            Are you sure you want to submit ?
          </p>
          <div className="flex gap-2 mt-4">
            <Button
              className="w-full"
              onClick={() => setSubmitModal(false)}
              variant="danger"
            >
              Close Modal
            </Button>
            <Button className="w-full" onClick={submitQuiz} variant="black">
              Submit
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Quiz;
