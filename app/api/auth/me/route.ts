import {NextResponse} from 'next/server'
import {jwtVerify} from 'jose'
import {prisma} from '@/lib/prisma'
import {cookies} from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key'
)

export async function GET() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('auth-token')?.value

        if (!token) {
            return NextResponse.json({user: null})
        }

        const {payload} = await jwtVerify(token, JWT_SECRET)

        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId as string
            },
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                website: true,
                avatarUrl: true
            }
        })

        if (!user) {
            return NextResponse.json({user: null})
        }
        return NextResponse.json({user})
    } catch (error) {
        console.error('Auth error:', error)
        return NextResponse.json({user: null})
    }
}
