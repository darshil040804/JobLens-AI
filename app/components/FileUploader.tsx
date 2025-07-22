import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    /** current file (null = no file) */
    file: File | null
    /** callback to set/clear the file */
    onFileSelect: (file: File | null) => void
}

const FileUploader = ({ file, onFileSelect }: FileUploaderProps) => {
    // when user drops/selects a file, tell parent
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onFileSelect(acceptedFiles[0] ?? null)
    }, [onFileSelect])

    // no need for acceptedFiles here—parent drives everything
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: 20 * 1024 * 1024,
    })

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="space-y-4 cursor-pointer">
                    {file ? (
                        <div
                            className="uploader-selected-file"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src="/images/pdf.png"
                                alt="pdf"
                                className="size-10"
                            />
                            <div className="flex items-center space-x-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="p-2 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onFileSelect(null)
                                }}
                            >
                                <img
                                    src="/icons/cross.svg"
                                    alt="remove"
                                    className="w-4 h-4"
                                />
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                                <img
                                    src="/icons/info.svg"
                                    alt="upload"
                                    className="size-20"
                                />
                            </div>
                            <p className="text-lg text-gray-500">
                                <span className="font-semibold">Click to Upload</span> or
                                <span className="font-semibold"> Drag and Drop</span>
                            </p>
                            <p className="text-lg text-gray-500">PDF (max 20 MB)</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FileUploader
