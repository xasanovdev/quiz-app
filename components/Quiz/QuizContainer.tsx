import Quiz from "@/app/quiz";
import React from "react";

const QuizContainer: React.FC = () => (
  <div className="flex flex-col gap-4 items-center">
    <h1 className="font-bold text-2xl">Quiz Application</h1>
    <Quiz />
  </div>
);

export default QuizContainer;
