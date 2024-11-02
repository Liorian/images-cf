'use client'

import Link from "next/link"
import {Mountain, User} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function NavBar() {
    const { user, loading } = useAuth()

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
                            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                        >
                            探索
                        </Link>
                        <Link
                            href="/upload"
                            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                        >
                            上传
                        </Link>
                        
                        {loading ? (
                            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-full" />
                        ) : user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">
                                    {user.name}
                                </span>
                                <Link
                                    href="/user/profile"
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <User className="h-4 w-4 text-gray-600" />
                                </Link>
                            </div>
                        ) : (
                            <Link
                                href="/user/login"
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
