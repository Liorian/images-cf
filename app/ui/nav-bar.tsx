'use client'

import Link from "next/link"
import {Mountain, User, LogOut, Settings} from "lucide-react"
import {useAuth} from "@/hooks/use-auth"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";

export default function NavBar() {
    const {user, loading} = useAuth()

    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4">
                <nav className="flex h-16 items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
                    >
                        <Mountain className="h-6 w-6 text-black"/>
                        <span className="font-semibold text-lg">图片托管</span>
                    </Link>

                    <div className="flex items-center space-x-6">
                        <Link
                            href="/"
                            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                        >
                            首页
                        </Link>
                        <Link
                            href="/explore"
                            prefetch={true}
                            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                        >
                            探索
                        </Link>
                        <Link
                            href="/upload"
                            prefetch={true}
                            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                        >
                            上传
                        </Link>

                        {loading ? (
                            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-full"/>
                        ) : user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none">
                                        {user.avatar_url ? (
                                            <Image
                                                src={user.avatar_url}
                                                alt={user.name}
                                                width={32}
                                                height={32}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                                                <User className="h-4 w-4 text-gray-600"/>
                                            </div>
                                        )}
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-56">
                                    <div className="flex flex-col space-y-1 p-2">
                                        <p className="text-sm font-medium text-gray-900">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div className="h-px bg-gray-200 my-1"/>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/user/profile"
                                            prefetch={true}
                                            className="flex items-center cursor-pointer"
                                        >
                                            <Settings className="mr-2 h-4 w-4"/>
                                            <span>个人设置</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                        onClick={() => {
                                            fetch('/api/auth/logout', {
                                                method: 'POST'
                                            }).then(() => {
                                                window.location.reload()
                                            })
                                        }}
                                    >
                                        <LogOut className="mr-2 h-4 w-4"/>
                                        <span>退出登录</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link
                                href="/user/login"
                                prefetch={true}
                                className="text-sm font-medium px-4 py-2 rounded-full bg-black text-white hover:bg-black/90 transition-colors"
                            >
                                登录
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}
