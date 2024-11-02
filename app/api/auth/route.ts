import {NextResponse} from 'next/server';
import bcrypt from 'bcrypt';
import {sql} from '@vercel/postgres';
import {User} from '@/app/lib/definitions';
import {SignJWT} from 'jose';
import {nanoid} from 'nanoid';

// 用于 JWT 签名的密钥
const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key'
);

export async function POST(request: Request) {
    try {
        const {action, email, password, name} = await request.json();

        if (action === 'login') {
            // 登录逻辑
            const result = await sql<User>`
                SELECT * FROM users WHERE email = ${email}
            `;

            if (result.rows.length === 0) {
                return NextResponse.json(
                    {error: '用户不存在'},
                    {status: 404}
                );
            }

            const user = result.rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return NextResponse.json(
                    {error: '密码错误'},
                    {status: 401}
                );
            }

            // 创建 JWT token
            const token = await new SignJWT({
                userId: user.id,
                email: user.email,
            })
                .setProtectedHeader({alg: 'HS256'})
                .setJti(nanoid())
                .setIssuedAt()
                .setExpirationTime('24h')
                .sign(JWT_SECRET);

            // 设置 cookie
            const response = NextResponse.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            });

            response.cookies.set({
                name: 'auth-token',
                value: token,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 // 24 hours
            });

            return response;

        } else if (action === 'register') {
            // 检查邮箱是否已存在
            const existingUser = await sql`
                SELECT * FROM users WHERE email = ${email}
            `;

            if (existingUser.rows.length > 0) {
                return NextResponse.json(
                    {error: '邮箱已被注册'},
                    {status: 409}
                );
            }

            // 密码加密
            const hashedPassword = await bcrypt.hash(password, 10);

            // 创建新用户
            const result = await sql<User>`
                INSERT INTO users (id, name, email, password, created_at, updated_at)
                VALUES (gen_random_uuid(), ${name}, ${email}, ${hashedPassword}, NOW(), NOW())
                RETURNING id, name, email, created_at
            `;

            return NextResponse.json({
                user: result.rows[0]
            });
        }

    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json(
            {error: '服务器错误'},
            {status: 500}
        );
    }
}
