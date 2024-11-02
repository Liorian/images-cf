'use client'

import {useEffect, useState} from 'react'

interface User {
    id: string
    name: string
    email: string
    avatar_url: string
    bio?: string
    website?: string
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/auth/me')
            .then(res => res.json())
            .then(data => {
                setUser(data.user)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    return {user, loading}
}
