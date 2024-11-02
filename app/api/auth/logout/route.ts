import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
    // 创建响应对象
    const response = NextResponse.json({ success: true })
    
    // 设置 cookie 过期
    response.cookies.set({
        name: 'auth-token',
        value: '',
        expires: new Date(0),
        path: '/'
    })

    return response
} 