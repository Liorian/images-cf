import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

// 需要认证的路由
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/upload'
]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // 检查是否是受保护的路由
  if (protectedPaths.some(prefix => path.startsWith(prefix))) {
    const token = request.cookies.get('auth-token')

    if (!token) {
      return NextResponse.redirect(new URL('/user/login', request.url))
    }

    try {
      // 验证 JWT
      await jwtVerify(token.value, JWT_SECRET)
      return NextResponse.next()
    } catch {
      // Token 无效
      return NextResponse.redirect(new URL('/user/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * 匹配所有需要认证的路由
     * - /api/auth/* (auth API routes)
     * - /dashboard/* (dashboard pages)
     * - /profile/* (profile pages)
     */
    '/dashboard/:path*',
    '/profile/:path*',
    '/upload/:path*',
  ],
} 