import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageSelect, 
  className = ""
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const processImage = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageSelect(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    processImage(file);
  }, [processImage]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  }, [processImage]);

  return (
    <div 
      className={`relative ${className}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center
          ${isDragging ? 'bg-blue-100/50' : ''} transition-colors rounded-lg`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id="imageUpload"
        />
        <label
          htmlFor="imageUpload"
          className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg cursor-pointer
            ${isDragging 
              ? 'bg-blue-500 text-white' 
              : 'bg-blue-500 text-white hover:bg-blue-600'} 
            transition-colors`}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span>Arraste ou escolha uma imagem</span>
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;