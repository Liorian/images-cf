import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

// 公开路由白名单
const publicPaths = [
  '/',
  '/user/login',
  '/about',
  '/help',
  '/terms',
  '/privacy'
]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // 检查是否是公开路由
  if (publicPaths.some(prefix => path === prefix)) {
    return NextResponse.next()
  }

  // 对于非公开路由，验证用户是否已登录
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

export const config = {
  matcher: [
    /*
     * 匹配除了 _next/static、_next/image、favicon.ico 等静态资源以外的所有路由
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 