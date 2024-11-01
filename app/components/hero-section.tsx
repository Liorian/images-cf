'use client'

import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Upload} from "lucide-react"
import Image from "next/image"

export function HeroSection() {
    return (
        <div className="grid md:grid-cols-2 gap-12 py-12">
            <div className="space-y-6 flex flex-col justify-center">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                    分享你的瞬间给全世界
                </h1>
                <p className="text-muted-foreground text-lg">
                    我们的图片托管平台让你，分享和发现质量的视觉效果变得简单，今天就开始吧！
                </p>
                <Button className="gap-2 w-fit">
                    <Upload className="w-4 h-4"/>
                    上传图片
                </Button>
            </div>

            <Card className="aspect-square bg-muted flex items-center justify-center relative shadow-lg">
                <Image
                    src="/placeholder.svg"
                    alt="Featured image"
                    fill
                    className="object-cover rounded-lg"
                />
            </Card>
        </div>
    )
}
