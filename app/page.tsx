"use client";

import Countdown from "@/components/Countdown";
import NameInput from "@/components/NameInput";
import QuizContainer from "@/components/Quiz/QuizContainer";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [isUserStarted, setIsUserStarted] = useState<boolean>(false);
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(3);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isUserStarted && !isQuizStarted) {
      interval = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        setIsQuizStarted(true);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isUserStarted, isQuizStarted]);

  const quizStartCounter = () => {
    setIsUserStarted(true);
  };

    return (
    <div className="w-full min-h-screen container flex-center">
      {!isUserStarted ? (
        <NameInput name={name} setName={setName} onStart={quizStartCounter} />
      ) : isQuizStarted ? (
        <QuizContainer />
      ) : (
        <Countdown counter={counter} />
      )}
    </div>
  );
};

export default HomePage;
