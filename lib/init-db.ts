import {db} from '@vercel/postgres';
import {hash} from 'bcrypt';
import {users} from '@/data/users.json';

// 密码加密的复杂度
const SALT_ROUNDS = 10;

async function createUsersTable() {
    console.log('开始初始化数据库...');
    const client = await db.connect();

    try {
        console.log('创建用户表...');
        // 创建用户表，包含用户的基本信息字段
        await client.sql`
            CREATE TABLE IF NOT EXISTS users
            (
                id         UUID PRIMARY KEY,                                   -- 用户唯一标识
                name       VARCHAR(255)        NOT NULL,                       -- 用户名
                email      VARCHAR(255) UNIQUE NOT NULL,                       -- 邮箱（唯一）
                password   VARCHAR(255)        NOT NULL,                       -- 加密后的密码
                bio        TEXT,                                               -- 个人简介
                website    VARCHAR(255),                                       -- 个人网站
                avatar_url TEXT,                                               -- 头像URL
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- 创建时间
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  -- 更新时间
            );
    `;
        console.log('用户表创建成功');

        // 插入测试数据
        console.log('开始插入测试用户数据...');
        for (const user of users) {
            // 对密码进行加密
            const hashedPassword = await hash(user.password, SALT_ROUNDS);
            console.log(`正在处理用户: ${user.name} (${user.email})`);

            // 使用 ON CONFLICT DO NOTHING 防止重复插入
            await client.sql`
        INSERT INTO users (id, name, email, password, bio, website, avatar_url)
        VALUES (
          ${user.id},
          ${user.name},
          ${user.email},
          ${hashedPassword},
          ${user.bio},
          ${user.website},
          ${user.avatar_url}
        )
        ON CONFLICT (email) DO NOTHING;
      `;
            console.log(`用户 ${user.name} 数据处理完成`);
        }

        console.log('✅ 数据库初始化完成：用户表创建并填充测试数据成功');
    } catch (error) {
        console.error('❌ 数据库初始化过程中发生错误:', error);
        throw error;
    } finally {
        // 释放数据库连接
        client.release();
        console.log('数据库连接已释放');
    }
}

export {createUsersTable};
