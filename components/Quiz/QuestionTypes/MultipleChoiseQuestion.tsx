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
    <>
      <div>
        <p className="text-2xl font-semibold text-black">{question.question}</p>
        <ul className="mt-4 flex flex-col gap-4">
          {question.options?.map((option, index) => (
            <li key={index}>
              <label className="px-4 py-3 flex items-center gap-2 cursor-pointer border border-black rounded w-full">
                <input
                  type="checkbox"
                  id={option}
                  name={`multiple-choice-${question.id}`}
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onClick={() => onOptionClick(option)}
                />

                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MultipleChoiceQuestion;
