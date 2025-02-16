'use client'

import {User, LogOut, Settings} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {signOut} from "next-auth/react"


export function UserNav({user}: { user: any }) {
    console.log(`avatarUrl: ${user}`)

    if (!user) {
        return (
            <Link
                href="/user/login"
                prefetch={true}
                className="text-sm font-medium px-4 py-2 rounded-full bg-black text-white hover:bg-black/90 transition-colors"
            >
                登录
            </Link>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none">
                    {user.avatarUrl ? (
                        <Image
                            src={user.avatarUrl}
                            alt={user.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
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
                        signOut()
                    }}
                >
                    <LogOut className="mr-2 h-4 w-4"/>
                    <span>退出登录</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
