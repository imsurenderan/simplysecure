"use client";
import ToggleSwitch from "./ToggleSwitch";
import Encryption from "./Encryption";
import Decryption from "./Decryption";
import { useState } from "react";

export default function SimplySecure() {
  const [mode, setMode] = useState<"encryption" | "decryption">("encryption");

  return (
    <main className="flex flex-col items-center justify-start">
      <ToggleSwitch
        onToggle={(isEncryption) =>
          setMode(isEncryption ? "encryption" : "decryption")
        }
      />
      {mode === "encryption" ? <Encryption /> : <Decryption />}
    </main>
  );
}
