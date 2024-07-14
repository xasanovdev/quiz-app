import React from "react";
import Button from "./Button";

interface NameInputProps {
  name: string;
  setName: (name: string) => void;
  onStart: () => void;
}

const NameInput: React.FC<NameInputProps> = ({ name, setName, onStart }) => (
  <div className="flex flex-col gap-4 max-w-96 w-full items-center">
    <p className="text-9xl font-mono">?</p>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name..."
      className="w-full border-b-2 placeholder:text-lg border-black outline-none px-2 py-1"
    />

    <div className="flex gap-2">
      <Button onClick={onStart} variant="black" size="large">
        {name.length < 3 ? "Next, I'm an anonymous user" : "Next"}
      </Button>
    </div>
  </div>
);

export default NameInput;
