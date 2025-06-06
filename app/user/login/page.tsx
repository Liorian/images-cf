'use client'

import React, {useActionState} from 'react'
import {authenticate} from "@/lib/actions";
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import {Card} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {LogIn, UserPlus, Mail, Lock, User} from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

// 定义登录表单数据类型
interface LoginFormData {
    email: string;
    password: string;
}

// 定义注册表单数据类型
interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// 登录和注册表单的联合类型
interface FormData {
    email: string;
    password: string;
    name?: string;
    confirmPassword?: string;
}

// 登录表单的验证模式：要求有效的邮箱和至少6位密码
const loginSchema = z.object({
    email: z.string().email('请输入有效的邮箱地址'),
    password: z.string().min(6, '密码至少需要6个字符'),
})

// 注册表单的验证模式：额外要求用户名和密码确认
const registerSchema = z.object({
    name: z.string().min(2, '用户名至少需要2个字符'),
    email: z.string().email('请输入有效的邮箱地址'),
    password: z.string().min(6, '密码至少需要6个字符'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"], // 指定错误信息显示在确认密码字段
})

/**
 * 登录/注册页面组件
 * 提供统一的用户认证界面，支持登录和注册功能切换
 */
export default function LoginPage() {
    const [isLogin, setIsLogin] = React.useState(true)

    // 初始化表单，配置验证规则和默认值
    const form = useForm<FormData>({
        resolver: zodResolver(isLogin ? loginSchema : registerSchema),
        mode: 'onChange', // 实时验证
        defaultValues: {
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
        }
    })

    /**
     * 切换登录/注册模式
     * 重置表单并清空所有字段
     */
    const toggleMode = () => {
        setIsLogin(!isLogin)
        form.reset({
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
        })
    }

    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto space-y-8">
                {/* 页面标题和说明文字 */}
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

                {/* 登录/注册表单卡片 */}
                <Card className="p-6 space-y-6">
                    <Form {...form}>
                        <form action={formAction} className="space-y-4">
                            {/* 仅在注册模式显示用户名输入框 */}
                            {!isLogin && (
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>用户名</FormLabel>
                                            <div className="relative">
                                                <User
                                                    className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="请输入用户名"
                                                        className="pl-9"
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            )}

                            {/* 邮箱输入框 */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>邮箱地址</FormLabel>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    placeholder="请输入邮箱"
                                                    className="pl-9"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/* 密码输入框 */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>密码</FormLabel>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder="请输入密码"
                                                    className="pl-9"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/* 仅在注册模式显示确认密码输入框 */}
                            {!isLogin && (
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>确认密码</FormLabel>
                                            <div className="relative">
                                                <Lock
                                                    className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="password"
                                                        placeholder="请再次输入密码"
                                                        className="pl-9"
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            )}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isPending || !form.formState.isValid}>
                                {isPending ? (<span>处理中...</span>) :
                                    isLogin ? (<><LogIn className="mr-2 h-4 w-4"/>登录</>)
                                        : (<><UserPlus className="mr-2 h-4 w-4"/>注册</>)
                                }
                            </Button>
                            {errorMessage && (
                                <>
                                    <p className="text-sm text-red-500">{errorMessage}</p>
                                </>
                            )}
                        </form>
                    </Form>

                    {/* 分隔线 */}
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

                    {/* 切换登录/注册模式按钮 */}
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={toggleMode}
                    >
                        {isLogin ? '创建新账号' : '使用已有账号登录'}
                    </Button>
                </Card>

                {/* 页面底部帮助链接 */}
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
