import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui'

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    media?: string[];
    type: "post" | "profile",
    multiple: boolean
}


const FileUploader = ({ fieldChange, media, type = "profile", multiple = false }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    fieldChange(acceptedFiles); // 👈 pass files back to form
    setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
  }, [fieldChange]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpeg", ".jpg"] },
    multiple,
  });

  return (
    <div {...getRootProps()} className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer" />

      {previews.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4 w-full p-5 lg:p-10">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`preview-${i}`}
                className="file_uploader-img rounded-lg"
              />
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