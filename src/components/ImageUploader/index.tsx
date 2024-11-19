import React, { useCallback } from 'react';

const ImageUploader = ({ onImageSelect, className = "" }) => {
  const handleFileChange = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onImageSelect(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, solte apenas arquivos de imagem.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onImageSelect(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  return (
    <div
      className={`relative group ${className}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-90 group-hover:bg-opacity-100 transition-all">
        <svg 
          className="w-8 h-8 text-gray-400 mb-2" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <p className="text-sm text-gray-500 text-center px-4">
          Clique ou arraste uma foto
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;