'use client'

import useSWR from 'swr'

interface User {
    id: string
    name: string
    email: string
    avatar_url: string
    bio?: string
    website?: string
}

const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('Failed to fetch user data')
    }
    const data = await res.json()
    return data.user
}

export function useAuth() {
    const { data: user, error, isLoading, mutate } = useSWR<User>('/api/auth/me', fetcher, {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 0, // 禁用自动刷新
        shouldRetryOnError: false,
        dedupingInterval: 0, // 禁用重复请求的去重时间
    })

    const refreshUser = async () => {
        await mutate(undefined, { revalidate: true })
    }

    return {
        user,
        loading: isLoading,
        error,
        refreshUser
    }
}
