import React, { useEffect, useState } from "react";

interface CountdownProps {
  counter: number;
}

const Countdown: React.FC<CountdownProps> = ({ counter }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  }, [counter]);

  return (
    <div className="flex flex-col gap-4 items-center animate-bounce">
      <h1 className={`font-bold text-6xl ${isAnimating ? "scale-up" : ""}`}>
        {counter}
      </h1>
    </div>
  );
};

export default Countdown;
