import {NextResponse} from 'next/server'
import {generateImage} from '@/app/services/imageGeneration'

export async function POST(request: Request) {
    try {
        const {prompt} = await request.json()

        if (!prompt) {
            return NextResponse.json(
                {error: 'Prompt is required'},
                {status: 400}
            )
        }

        const imagePath = await generateImage(prompt)

        return NextResponse.json({imagePath})
    } catch (error) {
        console.error('Generate image failed:', error)
        
        const errorMessage = error instanceof Error 
            ? error.message 
            : 'Unknown error occurred'
            
        return NextResponse.json(
            { 
                error: 'Failed to generate image',
                details: errorMessage 
            },
            {status: 500}
        )
    }
}
