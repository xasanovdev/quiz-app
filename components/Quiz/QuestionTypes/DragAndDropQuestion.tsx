// app/components/DragAndDropQuestion.tsx

import { Question } from "@/types/question";
import React from "react";

interface DragAndDropQuestionProps {
  question: Question;
}

const DragAndDropQuestion: React.FC<DragAndDropQuestionProps> = ({
  question,
}) => {
  // Implement the drag-and-drop logic here
  return (
    <div>
      <p>{question.question}</p>
      {/* Implement drag-and-drop UI */}
    </div>
  );
};

export default DragAndDropQuestion;
