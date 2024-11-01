'use client'
import React, { use } from 'react';
import { Post } from './types';

// 模拟异步数据获取
const fetchPosts = () => {
  return new Promise<Post[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {id: 1, title: '第一篇文章', content: '这是第一篇文章'},
        {id: 2, title: '第二篇文章', content: '这是第二篇文章'}
      ]);
    }, 1500);
  });
}

export function PostFeed() {
    const posts = use(fetchPosts());

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}
