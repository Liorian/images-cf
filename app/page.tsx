'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import Image from "next/image"

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">分享你的瞬间给全世界</h1>
          <p className="text-muted-foreground">
            我们的图片托管平台让你，分享和发现质量的视觉效果变得简单，今天就开始吧！
          </p>
          <Button className="gap-2">
            <Upload className="w-4 h-4" />
            上传图片
          </Button>
        </div>
        <Card className="aspect-square bg-muted flex items-center justify-center">
          <Image
            src="/placeholder.svg"
            alt="Featured image"
            width={400}
            height={400}
            className="object-cover"
          />
        </Card>
      </div>

      {/* Gallery Section */}
      <div className="space-y-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">探索我们的图片库</h2>
          <p className="text-muted-foreground text-center">
            浏览我们广泛大的精美图片库集合，或是发现别人分享以及找到你所寻找的内容。
          </p>
          <div className="flex gap-4 justify-center">
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="排序" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">最新</SelectItem>
                <SelectItem value="popular">最热</SelectItem>
                <SelectItem value="trending">趋势</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="photos">照片</SelectItem>
                <SelectItem value="illustrations">插画</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt={`Gallery image ${i + 1}`}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
