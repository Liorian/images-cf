'use client'

import { HeroSection } from "@/app/components/HeroSection"
import { GallerySection } from "@/app/components/GallerySection"

export default function Component() {
  return (
    <main className="container mx-auto px-4 py-8">
      <HeroSection />
      <GallerySection />
    </main>
  )
}
