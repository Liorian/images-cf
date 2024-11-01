'use client'

import { HeroSection } from "@/app/components/hero-section"
import { GallerySection } from "@/app/components/gallery-section"
import PersonalGallery from "@/app/components/personal-gallery"

export default function Component() {
    return (
        <main className="min-h-screen">
            <div className="container mx-auto px-4 space-y-24">
                <HeroSection />
                <GallerySection />
                <PersonalGallery />
            </div>
        </main>
    )
}
