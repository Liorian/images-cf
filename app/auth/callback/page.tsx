'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

export default function AuthCallback() {
    const router = useRouter()
    const { refreshUser } = useAuth()

    useEffect(() => {
        const handleCallback = async () => {
            await refreshUser() // 刷新用户状态
            router.push('/') // 重定向到首页
        }

        handleCallback()
    }, [refreshUser, router])

    return <div>正在登录...</div>
} 