// app/components/QuestionTypes/TrueFalseQuestion.tsx

import React from "react";
import type { Question } from "@/types/question";

interface TrueFalseQuestionProps {
  question: Question;
  onOptionClick: (option: boolean) => void;
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
  question,
  onOptionClick,
}) => {
  return (
    <div>
      <p>{question.question}</p>
      <div>
        <input
          type="radio"
          id={`true-${question.id}`}
          name={`true-false-${question.id}`}
          value="true"
          onClick={() => onOptionClick(true)}
        />
        <label htmlFor={`true-${question.id}`}>True</label>
      </div>
      <div>
        <input
          type="radio"
          id={`false-${question.id}`}
          name={`true-false-${question.id}`}
          value="false"
          onClick={() => onOptionClick(false)}
        />
        <label htmlFor={`false-${question.id}`}>False</label>
      </div>
    </div>
  );
};

export default TrueFalseQuestion;
