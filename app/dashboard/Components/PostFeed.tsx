'use client'
import React, {useEffect, useState} from 'react';
import {Post} from './types';

export function PostFeed() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        // 模拟获取数据
        setTimeout(() => {
            setPosts([
                {id: 1, title: '第一篇文章', content: '这是第一篇文章'},
                {id: 2, title: '第二篇文章', content: '这是第二篇文章'}
            ]);
        }, 1500);
    }, []);

    return (
        <div>
            {posts.length === 0 ? (
                <p>没有文章</p>
            ) : (
                posts.map(post => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))
            )}
        </div>
    );
}
