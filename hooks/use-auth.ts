'use client'

import useSWR from 'swr'

// API响应接口定义
interface AuthResponse {
    user: User | null
}

// 用户信息接口定义
interface User {
    id: string          // 用户唯一标识
    name: string        // 用户名
    email: string       // 邮箱
    avatar_url: string  // 头像URL
    bio?: string        // 个人简介（可选）
    website?: string    // 个人网站（可选）
}

/**
 * 数据获取函数
 * @param url - API请求地址
 * @returns AuthResponse
 * @throws 如果请求失败则抛出错误
 */
const fetcher = async (url: string): Promise<AuthResponse> => {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('Failed to fetch user data')
    }
    return res.json()
}

/**
 * 用户认证Hook
 * 用于获取和管理当前登录用户的信息
 * @returns {Object} 包含用户信息、加载状态、错误信息和刷新函数的对象
 */
export function useAuth() {
    // 使用SWR进行数据请求和缓存管理
    const {data, error, isLoading, mutate} = useSWR<AuthResponse>('/api/auth/me', fetcher, {
        revalidateOnFocus: true,      // 窗口重新获得焦点时重新验证
        revalidateOnReconnect: true,  // 重新连接网络时重新验证
        refreshInterval: 0,           // 设置为0，禁用自动刷新
        shouldRetryOnError: false,    // 发生错误时不自动重试
        dedupingInterval: 2000,       // 2秒内的重复请求会被去重
    })

    /**
     * 刷新用户信息
     * 用于手动触发用户数据的重新获取
     * @param userData 可选的用户数据，用于立即更新缓存
     */
    const refreshUser = async (userData?: User) => {
        if (userData) {
            // 如果提供了用户数据，立即更新缓存并在后台验证
            await mutate({user: userData}, {revalidate: true})
        } else {
            // 否则仅重新获取数据
            await mutate(undefined, {revalidate: true})
        }
    }

    // 返回处理后的数据和功能
    return {
        user: data?.user,           // 用户信息
        loading: isLoading,         // 加载状态
        error,                      // 错误信息
        refreshUser                 // 刷新用户信息的方法
    }
}
