'use client' // 标记这是客户端组件

import useSWR from 'swr'

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
 * @returns 用户数据
 * @throws 如果请求失败则抛出错误
 */
const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error('Failed to fetch user data')
    }
    const data = await res.json()
    return data.user
}

/**
 * 用户认证Hook
 * 用于获取和管理当前登录用户的信息
 * @returns {Object} 包含用户信息、加载状态、错误信息和刷新函数的对象
 */
export function useAuth() {
    // 使用SWR进行数据请求和缓存管理
    const { data: user, error, isLoading, mutate } = useSWR<User>('/api/auth/me', fetcher, {
        revalidateOnFocus: true,      // 窗口重新获得焦点时重新验证
        revalidateOnReconnect: true,  // 重新连接网络时重新验证
        refreshInterval: 0,           // 设置为0，禁用自动刷新
        shouldRetryOnError: false,    // 发生错误时不自动重试
        dedupingInterval: 0,          // 设置为0，禁用请求去重时间间隔
    })

    /**
     * 刷新用户信息
     * 用于手动触发用户数据的重新获取
     */
    const refreshUser = async () => {
        await mutate(undefined, { revalidate: true })
    }

    // 返回处理后的数据和功能
    return {
        user,           // 用户信息
        loading: isLoading,  // 加载状态
        error,          // 错误信息
        refreshUser     // 刷新用户信息的方法
    }
}
