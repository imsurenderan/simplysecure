"use client";
import FileUpload from "./FileUpload";
import { useState } from "react";
import {
  isValidPassword,
  generateStrongPassword,
} from "../utils/handlePasswords";

import { encryptFile } from "../utils/handleData";

const Encryption: React.FC = () => {
  const [password, setPassword] = useState("");
  const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const generatePassword = () => {
    const newPassword = generateStrongPassword();
    setPassword(newPassword);
  };

  const handleFilesAdded = (files: FileList) => {
    setFiles(Array.from(files));
  };

  const handleEncrypt = async () => {
    if (files.length > 0 && password) {
      if (!isValidPassword(password)) {
        alert("The password does not meet the security requirements.");
        return;
      }

      for (const file of files) {
        try {
          const encryptedData = await encryptFile(file, password);
          const blob = new Blob([encryptedData], {
            type: "application/octet-stream",
          });

          // Create a download link for the blob
          const downloadUrl = window.URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = downloadUrl;
          anchor.download = file.name + ".ss";
          anchor.click();

          // Clean up
          window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
          console.error("Encryption failed for file " + file.name, error);
          alert("Encryption failed for file " + file.name);
        }
      }

      alert("All files have been processed.");
    } else {
      alert("Please select at least one file and enter a password.");
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <FileUpload onFilesAdded={handleFilesAdded} />
      <div className="file-list">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            <p className="text-black text-xl">{file.name}</p>
          </div>
        ))}
      </div>
      <div className="my-6 flex">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          className={`border-b-2 flex border-gray-300 p-2 mr-2 active:border-b-2 checked:border-b-2 focus:border-b-2 ${
            isValidPassword(password) ? "border-green-500" : "border-red-500"
          }`}
        />
        <div className="py-4">
          <button
            onClick={generatePassword}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate Password
          </button>
        </div>
      </div>
      <button
        onClick={handleEncrypt}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Encrypt File
      </button>
    </div>
  );
};

export default Encryption;
