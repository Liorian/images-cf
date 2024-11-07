'use client'

import React, {useState} from 'react'
import {Card} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {User, PencilLine, Link as LinkIcon, Loader2} from "lucide-react"
import Image from "next/image"
import {useAuth} from "@/hooks/use-auth";


export default function ProfilePage() {
    const {user, loading} = useAuth();
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        setIsEditing(false)
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* 头部区域 */}
                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-bold">个人资料</h1>
                    <p className="text-muted-foreground">
                        管理您的个人信息和偏好设置
                    </p>
                </div>

                {/* 头像区域 */}
                <Card className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-muted">
                                {(user?.avatarUrl) ? (
                                    <Image
                                        src={user?.avatarUrl || ''}
                                        width={128} height={128}
                                        alt={`${user?.name || 'User'}'s avatar`}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-muted">
                                        <User className="w-12 h-12 text-muted-foreground"/>
                                    </div>
                                )}
                            </div>
                            {isEditing && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <label
                                        className="w-full h-full cursor-pointer flex items-center justify-center bg-black/50 text-white opacity-0 hover:opacity-100 transition-opacity rounded-full"
                                        htmlFor="avatar-upload"
                                    >
                                        <PencilLine className="w-6 h-6"/>
                                        <input
                                            id="avatar-upload"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 space-y-2 text-center md:text-left">
                            <h3 className="text-xl font-semibold">{user?.name}</h3>
                            <p className="text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>
                </Card>

                {/* 表单区域 */}
                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">用户名</label>
                                <Input
                                    name="name"
                                    defaultValue={user?.name}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <label className="text-sm font-medium">个人简介</label>
                                <Textarea
                                    name="bio"
                                    placeholder="介绍一下自己..."
                                    defaultValue={user?.bio}
                                    disabled={!isEditing}
                                    className="resize-none"
                                    rows={4}
                                />
                            </div>

                            <div className="grid gap-2">
                                <label className="text-sm font-medium">个人网站</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/>
                                    <Input
                                        name="website"
                                        type="url"
                                        placeholder="https://"
                                        defaultValue={user?.website}
                                        disabled={!isEditing}
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-end">
                            {isEditing ? (
                                <>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsEditing(false)
                                        }}
                                        disabled={isLoading}
                                    >
                                        取消
                                    </Button>
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                        保存更改
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                >
                                    编辑资料
                                </Button>
                            )}
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}
