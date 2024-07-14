// app/components/QuestionTypes/SingleChoiceQuestion.tsx

import React from "react";
import type { Question } from "@/types/question";

interface SingleChoiceQuestionProps {
  question: Question;
  onOptionClick: (option: string) => void;
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
  question,
  onOptionClick,
}) => {
  return (
    <div>
      <p>{question.question}</p>
      {question.options?.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={option}
            name={`single-choice-${question.id}`}
            value={option}
            onClick={() => onOptionClick(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default SingleChoiceQuestion;
