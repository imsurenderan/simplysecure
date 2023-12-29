"use client";
import { useState } from "react";

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onToggle }) => {
  const [isEncryption, setIsEncryption] = useState(true);

  const toggle = () => {
    const newMode = !isEncryption;
    setIsEncryption(newMode);
    onToggle(newMode);
  };

  return (
    <div className="flex items-center justify-between my-8">
      <button
        onClick={toggle}
        className={`px-12 py-4 rounded-l-sm ${
          isEncryption ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Encryption
      </button>
      <button
        onClick={toggle}
        className={`px-12 py-4 rounded-r-sm ${
          !isEncryption ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Decryption
      </button>
    </div>
  );
};

export default ToggleSwitch;

interface ToggleSwitchProps {
  onToggle: (isEncryption: boolean) => void;
}
