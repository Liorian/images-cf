'use client'

import React, {useState} from 'react'
import {Card} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {LogIn, UserPlus, Mail, Lock, User} from "lucide-react"
import {useRouter} from 'next/navigation'
import {useToast} from "@/hooks/use-toast"
import { useAuth } from '@/hooks/use-auth'

export default function LoginPage() {
    const router = useRouter()
    const {toast} = useToast()
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const { refreshUser } = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData(e.currentTarget)
            const data = {
                action: isLogin ? 'login' : 'register',
                email: formData.get('email'),
                password: formData.get('password'),
                name: formData.get('name'),
            }

            if (!isLogin && formData.get('password') !== formData.get('confirmPassword')) {
                toast({
                    variant: "destructive",
                    title: "错误",
                    description: "两次输入的密码不一致"
                })
                setIsLoading(false)
                return
            }

            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error)
            }

            toast({
                title: isLogin ? "登录成功" : "注册成功",
                description: "正在跳转..."
            })
            await refreshUser()
            router.push('/')

        } catch (error) {
            toast({
                variant: "destructive",
                title: "错误",
                description: error instanceof Error ? error.message : '操作失败'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto space-y-8">
                {/* 头部区域 */}
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-bold">
                        {isLogin ? '欢迎回来' : '创建账号'}
                    </h1>
                    <p className="text-muted-foreground">
                        {isLogin
                            ? '登录您的账号以继续使用我们的服务'
                            : '注册一个新账号，开始您的图片托管之旅'}
                    </p>
                </div>

                {/* 表单区域 */}
                <Card className="p-6 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">用户名</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
                                    <Input
                                        name="name"
                                        placeholder="请输入用户名"
                                        className="pl-9"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium">邮箱地址</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="请输入邮箱"
                                    className="pl-9"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">密码</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="请输入密码"
                                    className="pl-9"
                                    required
                                />
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">确认密码</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
                                    <Input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="请再次输入密码"
                                        className="pl-9"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <span>处理中...</span>
                            ) : isLogin ? (
                                <>
                                    <LogIn className="mr-2 h-4 w-4"/>
                                    登录
                                </>
                            ) : (
                                <>
                                    <UserPlus className="mr-2 h-4 w-4"/>
                                    注册
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-muted-foreground">
                                或者
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? '创建新账号' : '使用已有账号登录'}
                    </Button>
                </Card>

                {/* 其他登录选项 */}
                <div className="text-center text-sm text-muted-foreground">
                    <span>遇到问题？</span>
                    <a href="#" className="font-medium text-black hover:underline ml-1">
                        联系客服
                    </a>
                </div>
            </div>
        </div>
    )
}
