import React from "react";
import type { Question } from "@/types/question";

interface MultipleChoiceQuestionProps {
  question: Question;
  selectedOptions: string[];
  onOptionClick: (option: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  selectedOptions,
  onOptionClick,
}) => {
  return (
    <div>
      <p>{question.question}</p>
      {question.options?.map((option, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={option}
            name={`multiple-choice-${question.id}`}
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => onOptionClick(option)}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;
