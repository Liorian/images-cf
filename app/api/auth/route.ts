import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { User } from '@/app/lib/definitions';

export async function POST(request: Request) {
    try {
        const { action, email, password, name } = await request.json();

        if (action === 'login') {
            // 登录逻辑
            const result = await sql<User>`
                SELECT * FROM users WHERE email = ${email}
            `;

            if (result.rows.length === 0) {
                return NextResponse.json(
                    { error: '用户不存在' },
                    { status: 404 }
                );
            }

            const user = result.rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return NextResponse.json(
                    { error: '密码错误' },
                    { status: 401 }
                );
            }

            // 登录时不返回密码
            const { password: ignored, ...userWithoutPassword } = user;
            return NextResponse.json(userWithoutPassword);

        } else if (action === 'register') {
            // 检查邮箱是否已存在
            const existingUser = await sql`
                SELECT * FROM users WHERE email = ${email}
            `;

            if (existingUser.rows.length > 0) {
                return NextResponse.json(
                    { error: '邮箱已被注册' },
                    { status: 409 }
                );
            }

            // 密码加密
            const hashedPassword = await bcrypt.hash(password, 10);

            // 创建新用户，使用 gen_random_uuid() 生成 UUID
            const result = await sql<User>`
                INSERT INTO users (id, name, email, password, created_at, updated_at)
                VALUES (gen_random_uuid(), ${name}, ${email}, ${hashedPassword}, NOW(), NOW())
                RETURNING *
            `;

            // 不返回密码
            const { password: ignored, ...newUserWithoutPassword } = result.rows[0];
            return NextResponse.json(newUserWithoutPassword);
        }

    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json(
            { error: '服务器错误' },
            { status: 500 }
        );
    }
}
