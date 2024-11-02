import Link from "next/link"
import {Mountain} from "lucide-react"

export default function NavBar() {
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
                        <Link
                            href="/user/login"
                            className="text-sm font-medium px-4 py-2 rounded-full bg-black text-white hover:bg-black/90 transition-colors"
                        >
                            登录
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
