import Link from "next/link"
import {Mountain} from "lucide-react"

export default function NavBar() {
    return (
        <header className="relative bg-white border-b border-gray-200">
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <Mountain className="h-6 w-6"/>
                    </Link>

                    <div className="flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                        >
                            首页
                        </Link>
                        <Link
                            href="/explore"
                            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                        >
                            探索
                        </Link>
                        <Link
                            href="/upload"
                            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                        >
                            上传
                        </Link>
                        <Link
                            href="/login"
                            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                        >
                            登录
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}
