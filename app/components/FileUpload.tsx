"use client";
interface FileUploadProps {
  onFilesAdded: (files: FileList) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesAdded }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFilesAdded(event.target.files);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      onFilesAdded(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  };

  return (
    <div
      className="border-2 border-dashed p-24 text-center cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        id="fileUpload"
      />
      <label
        htmlFor="fileUpload"
        className="text-blue-600 hover:text-blue-800 p-24 cursor-pointer"
      >
        Drag and drop files here, or click to select files
      </label>
    </div>
  );
};

export default FileUpload;
