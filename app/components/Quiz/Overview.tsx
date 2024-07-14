import { OverviewAnswers } from "@/types/question";
import React from "react";

interface OverviewProps {
  overviewAnswers: OverviewAnswers[];
  score: number;
}

const Overview: React.FC<OverviewProps> = ({ overviewAnswers, score }) => {
  return (
    <div>
      <h2>Quiz Overview</h2>
      <div>Score: {score}</div>
      <pre>{JSON.stringify(overviewAnswers, null, 2)}</pre>
    </div>
  );
};

export default Overview;
