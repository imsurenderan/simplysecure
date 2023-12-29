"use client";
import FileUpload from "./FileUpload";
import { useState } from "react";
import { decryptFile } from "../utils/handleData";

const Decryption: React.FC = () => {
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesAdded = (files: FileList) => {
    setFiles(Array.from(files));
  };

  const handleDecrypt = async () => {
    if (files.length > 0 && password) {
      for (const file of files) {
        try {
          const fileBuffer = await file.arrayBuffer();
          const decryptedData = await decryptFile(fileBuffer, password);

          // Create a download link for the blob
          const blob = new Blob([decryptedData], {
            type: "application/octet-stream",
          });
          const downloadUrl = window.URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = downloadUrl;
          anchor.download = file.name.replace(".ss", "");
          anchor.click();

          // Clean up
          window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
          console.error("Decryption failed for file " + file.name, error);
          alert("Decryption failed for file " + file.name);
        }
      }

      alert("All files have been processed.");
    } else {
      alert("Please select at least one file and enter a password.");
    }
  };

  return (
    <div>
      <FileUpload onFilesAdded={handleFilesAdded} />
      <div className="file-list">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            <p className="text-black text-xl">{file.name}</p>
          </div>
        ))}
      </div>
      <div className="my-4 flex flex-col justify-center items-center">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="border-2 border-gray-300 p-2 mr-2"
        />
        <button
          onClick={handleDecrypt}
          className="bg-red-500 hover:bg-red-700 text-white font-bold my-4 py-2 px-4 rounded "
        >
          Decrypt File
        </button>
      </div>
    </div>
  );
};

export default Decryption;
