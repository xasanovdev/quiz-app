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
      <p className="text-2xl font-semibold text-black">{question.question}</p>
      <ul className="mt-4 flex flex-col gap-4">
        {question.options?.map((option, index) => (
          <li key={index}>
            <label className="px-4 py-3 flex items-center gap-2 cursor-pointer border border-black rounded w-full">
              <input
                type="radio"
                id={option}
                name={`single-choice-${question.id}`}
                value={option}
                onClick={() => onOptionClick(option)}
              />

              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleChoiceQuestion;
