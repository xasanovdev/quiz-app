import { Question } from "@/types/question";

export const questions: Question[] = [
  {
    id: 1,
    type: "single-choice",
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "Which of the following are programming languages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: ["JavaScript", "Python"],
  },
  {
    id: 3,
    type: "true-false",
    question: "The sky is green.",
    answer: false,
  },
  // {
  //   id: 4,
  //   type: "drag-and-drop",
  //   question: "Arrange the words to form a sentence: 'world', 'Hello'",
  //   answer: ["Hello", "world"],
  // },
  {
    id: 5,
    type: "text-input",
    question: "What is 5 + 3?",
    answer: "8",
  },
];
