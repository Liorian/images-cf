import {NextResponse} from 'next/server'
import {jwtVerify} from 'jose'
import {db} from '@/lib/db'
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

        const user = await db
            .selectFrom('users')
            .select(['id', 'name', 'email', 'avatar_url'])
            .where('id', '=', payload.userId as string)
            .executeTakeFirst()

        if (!user) {
            return NextResponse.json({user: null})
        }
        return NextResponse.json({user})
    } catch (error) {
        console.error('Auth error:', error)
        return NextResponse.json({user: null})
    }
}
