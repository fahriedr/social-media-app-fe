import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui'
import { supabase } from "@/lib/supabase/supabase-client"
import { API_CONFIG } from '@/lib/api/config'
import { uploadFile } from '@/lib/supabase/upload-file'
import { useUserContext } from '@/context/AuthContext'

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    media?: string[]
}


const FileUploader = ({ fieldChange, media }: FileUploaderProps) => {

    const {user}  = useUserContext()

    const [files, setFile] = useState<File[]>([])
    const [fileUrl, setFileUrl] = useState('')
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [urls, setUrls] = useState<string[]>([]);

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
        setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
    }, [files])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg']
        },
        multiple: true
    })

    const uploadFiles = async () => {
        const bucketName = API_CONFIG.supabase.bucketName
        if (files.length === 0) return alert("No files selected");
        setUploading(true);

        const uploadedUrls: string[] = [];

        const prefixPath = `images/users/${user.id}/post/${Date.now()}`

        for (const file of files) {
            const fileName = `${prefixPath}/${Date.now()}-${file.name}`;

            const uploadedFiles = await uploadFile(bucketName, file, fileName)

            if (!uploadedFiles) {
                return false
            }

            uploadedUrls.push(uploadedFiles);
        }

        setUrls(uploadedUrls);
        setUploading(false);
    };

    return (
        <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
            <input {...getInputProps()} className='cursor-pointer' />
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
                    <Button
                        onClick={(e) => {
                            e.stopPropagation(); // prevent dropzone trigger
                            uploadFiles();
                        }}
                        disabled={uploading}
                        className="shad-button_dark_4 mt-4 mb-4"
                    >
                        {uploading ? "Uploading..." : "Upload to Supabase"}
                    </Button>
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
    )
}

export default FileUploader