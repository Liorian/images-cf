'use client'

import React, {useState} from 'react'
import {Upload, X, Loader2} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Card} from '@/components/ui/card'
import Image from 'next/image'
import {cn} from '@/lib/utils'

export default function Component() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState<number[]>([])

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const files = Array.from(e.dataTransfer.files)
        setSelectedFiles(prev => [...prev, ...files].slice(0, 4))
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setSelectedFiles(prev => [...prev, ...files].slice(0, 4))
        }
    }

    const handleRemoveFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleUpload = async () => {
        setIsUploading(true)
        setUploadProgress(new Array(selectedFiles.length).fill(0))

        try {
            const uploads = selectedFiles.map(async (file, index) => {
                const formData = new FormData()
                formData.append('file', file)

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })

                if (!response.ok) {
                    throw new Error('Upload failed')
                }

                setUploadProgress(prev => {
                    const newProgress = [...prev]
                    newProgress[index] = 100
                    return newProgress
                })

                return await response.json()
            })

            await Promise.all(uploads)
            setSelectedFiles([])
            setUploadProgress([])
        } catch (error) {
            console.error('Upload error:', error)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* 头部区域 */}
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-bold">上传您的图片</h1>
                    <p className="text-muted-foreground">
                        支持拖放或选择文件上传，我们将为您安全存储并优化图片质量
                    </p>
                </div>

                {/* 上传控制区 */}
                <Card className="p-6 space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-lg font-medium">上传图片</h2>
                        <p className="text-sm text-muted-foreground">
                            最多可同时上传4张图片，支持 JPG、PNG 格式
                        </p>
                    </div>

                    <div
                        className={cn(
                            "border-2 border-dashed rounded-lg p-8 transition-colors duration-300",
                            isDragging ? "border-black bg-muted/50" : "border-muted",
                            "text-center space-y-4 cursor-pointer"
                        )}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground"/>
                        <div className="space-y-2">
                            <input
                                id="file-upload"
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileSelect}
                            />
                            <div className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                点击选择或拖放文件到此处
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            className="flex-1"
                            disabled={selectedFiles.length === 0 || isUploading}
                            onClick={handleUpload}
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    上传中...
                                </>
                            ) : (
                                '开始上传'
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setSelectedFiles([])}
                            disabled={selectedFiles.length === 0}
                        >
                            清空
                        </Button>
                    </div>
                </Card>

                {/* 预览区 */}
                {selectedFiles.length > 0 && (
                    <Card className="p-4 bg-muted/30">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[0, 1, 2, 3].map((index) => (
                                selectedFiles[index] && (
                                    <div
                                        key={index}
                                        className="relative aspect-square rounded-lg overflow-hidden bg-muted"
                                    >
                                        <Image
                                            src={URL.createObjectURL(selectedFiles[index])}
                                            alt={`Preview ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                        <button
                                            onClick={() => handleRemoveFile(index)}
                                            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                                        >
                                            <X className="h-4 w-4 text-white"/>
                                        </button>
                                        {uploadProgress[index] > 0 && uploadProgress[index] < 100 && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <div className="text-white font-medium">
                                                    {uploadProgress[index]}%
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>
                    </Card>
                )}
            </div>
        </div>
    )
}
