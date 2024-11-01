'use client'

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {ImageIcon} from "lucide-react";

export default function Component() {
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedImage, setGeneratedImage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const prompt = formData.get('prompt')

        setIsGenerating(true)
        // Simulate image generation
        await new Promise(resolve => setTimeout(resolve, 2000))
        setGeneratedImage('/placeholder.svg?height=512&width=512')
        setIsGenerating(false)
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-4 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">Generate Image from Text</h1>
                <p className="text-muted-foreground">
                    Turn your imagination into reality by generating images from your text descriptions
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                    <Input
                        name="prompt"
                        placeholder="Enter a description, e.g.: a beautiful cat..."
                        className="flex-1"
                        required
                        disabled={isGenerating}
                    />
                    <Button type="submit" disabled={isGenerating}>
                        {isGenerating ? 'Generating...' : 'Generate'}
                    </Button>
                </div>
            </form>

            <Card className="aspect-[4/3] flex items-center justify-center bg-muted">
                {generatedImage ? (
                    <img
                        src={generatedImage}
                        alt="Generated image"
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="text-muted-foreground flex flex-col items-center gap-2">
                        <ImageIcon className="w-12 h-12"/>
                        <span>Generated image will appear here</span>
                    </div>
                )}
            </Card>
        </div>
    )
}
