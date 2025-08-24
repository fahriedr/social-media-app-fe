import React, { useCallback, useEffect, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui'
import { X } from "lucide-react"

type FileUploaderProps = {
  fieldChange: (FILES: (File | string)[]) => void;
  media?: string[];
  multiple: boolean
}


const FileUploader = ({ fieldChange, media, multiple = false }: FileUploaderProps) => {
  const [previews, setPreviews] = useState<string[]>(media || []);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    fieldChange([...previews, ...acceptedFiles]); // 👈 pass files back to form
    setPreviews(prev => [...prev, ...acceptedFiles.map(file => URL.createObjectURL(file))]);
  }, [fieldChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpeg", ".jpg", "webp"] },
    multiple,
    maxFiles: 3
  });

  const removeFile = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    fieldChange(updated);
  };

  return (
    <div {...getRootProps()} className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer" />

      {previews.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4 w-full p-5 lg:p-10">
            {previews.map((src, i) => (
              <div key={i} className="relative">
                <img
                  src={src}
                  alt={`preview-${i}`}
                  className="file_uploader-img rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent dropzone click
                    removeFile(i);
                  }}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <p className="file_uploader-label mt-2">
            Click or drag photos to replace
          </p>
        </>
      ) : (
        <div className="file_uploader-box text-center">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload"
            width={96}
            height={77}
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photos here
          </h3>
          <p className="text-light-4 small-regular mb-6">PNG, JPG</p>
          <Button className="shad-button_dark_4">Select from computer</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;