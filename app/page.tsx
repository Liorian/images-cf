'use client'

import {HeroSection} from "@/app/components/hero-section"
import {GallerySection} from "@/app/components/gallery-section"
import PersonalGallery from "@/app/components/personal-gallery"

export default function Component() {
    return (
        <div className="container mx-auto px-4 space-y-24 pb-24">
            <HeroSection/>
            <GallerySection/>
            <PersonalGallery/>
        </div>
    )
}
