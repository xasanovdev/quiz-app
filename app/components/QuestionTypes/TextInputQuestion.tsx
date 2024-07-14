// app/components/QuestionTypes/TextInputQuestion.tsx

import React from "react";
import type { Question } from "@/types/question";

interface TextInputQuestionProps {
  question: Question;
  textInputAnswer: string;
  onTextInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextInputSubmit: () => void;
}

const TextInputQuestion: React.FC<TextInputQuestionProps> = ({
  question,
  textInputAnswer,
  onTextInputChange,
  onTextInputSubmit,
}) => {
  return (
    <div>
      <p>{question.question}</p>
      <input type="text" value={textInputAnswer} onChange={onTextInputChange} />
      <button onClick={onTextInputSubmit}>Submit</button>
    </div>
  );
};

export default TextInputQuestion;
  