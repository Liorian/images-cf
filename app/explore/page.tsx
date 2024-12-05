'use client'

import React, {useState} from "react"
import Image from "next/image"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {ImageIcon, Sparkles} from "lucide-react"
import {cn} from "@/lib/utils"

export default function Component() {
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)
    const [imageLoaded, setImageLoaded] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const promptText = formData.get('prompt')
        
        if (!promptText) return
        
        setIsGenerating(true)
        setImageLoaded(false)
        
        try {
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: promptText }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate image')
            }

            const data = await response.json()
            setGeneratedImage(data.imagePath)
        } catch (error) {
            console.error('Error generating image:', error)
            // 这里可以添加错误提示
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* 头部区域 */}
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-bold">探索 AI 艺术创作</h1>
                    <p className="text-muted-foreground">
                        输入您的创意描述，让 AI 为您呈现独特的视觉作品
                    </p>
                </div>

                {/* 创作区域 */}
                <div className="grid md:grid-cols-5 gap-6 items-start">
                    {/* 左侧输入区 */}
                    <Card className="md:col-span-2 p-6 space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-lg font-medium">创作提示</h2>
                            <p className="text-sm text-muted-foreground">
                                描述越详细，生成的图像效果越好
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                name="prompt"
                                placeholder="例如：晨雾中的古老城堡，云海缭绕..."
                                className="resize-none"
                                required
                                disabled={isGenerating}
                            />
                            <Button
                                type="submit"
                                disabled={isGenerating}
                                className="w-full"
                            >
                                <Sparkles className="mr-2 h-4 w-4"/>
                                {isGenerating ? '创作中...' : '开始创作'}
                            </Button>
                        </form>
                    </Card>

                    {/* 右侧预览区 */}
                    <Card className="md:col-span-3 aspect-square relative bg-muted/30 overflow-hidden">
                        {generatedImage ? (
                            <div className="absolute inset-0">
                                <div className={cn(
                                    "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                                    imageLoaded ? "opacity-100" : "opacity-0"
                                )}>
                                    <Image
                                        src={generatedImage}
                                        alt="AI 生成的图片"
                                        fill
                                        className="object-cover"
                                        priority
                                        onLoadingComplete={() => {
                                            setTimeout(() => setImageLoaded(true), 200)
                                        }}
                                    />
                                    <div className={cn(
                                        "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 z-10",
                                        "transition-transform duration-700 ease-out",
                                        imageLoaded ? "translate-y-0" : "translate-y-full"
                                    )}>
                                        <p className="text-white text-sm">
                                            点击图片可以下载或分享
                                        </p>
                                    </div>
                                </div>

                                {/* 加载状态 */}
                                <div className={cn(
                                    "absolute inset-0 flex items-center justify-center transition-opacity duration-700",
                                    imageLoaded ? "opacity-0" : "opacity-100"
                                )}>
                                    <div className="w-8 h-8 border-4 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin"/>
                                </div>
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                                <div className="rounded-full bg-muted/80 p-4 mb-4">
                                    <ImageIcon className="w-8 h-8 text-muted-foreground"/>
                                </div>
                                <div className="text-center space-y-2 max-w-[240px]">
                                    <p className="text-sm font-medium">预览区域</p>
                                    <p className="text-xs text-muted-foreground">
                                        您的 AI 作品将在这里展示
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    )
}
