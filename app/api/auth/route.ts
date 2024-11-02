import {NextResponse} from 'next/server';
import bcrypt from 'bcrypt';
import {db} from '@/lib/db';
import {SignJWT} from 'jose';
import {nanoid} from 'nanoid';
import {sql} from 'kysely';

// 用于 JWT 签名的密钥
const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key'
);

// 添加生成头像 URL 的函数
function generateAvatarUrl(seed: string) {
    return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
}

export async function POST(request: Request) {
    try {
        const {action, email, password, name} = await request.json();

        if (action === 'login') {
            // 登录逻辑
            const user = await db
                .selectFrom('users')
                .selectAll()
                .where('email', '=', email)
                .executeTakeFirst();

            if (!user) {
                return NextResponse.json(
                    {error: '用户不存在'},
                    {status: 404}
                );
            }

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
            const existingUser = await db
                .selectFrom('users')
                .selectAll()
                .where('email', '=', email)
                .executeTakeFirst();

            if (existingUser) {
                return NextResponse.json(
                    {error: '邮箱已被注册'},
                    {status: 409}
                );
            }

            // 密码加密
            const hashedPassword = await bcrypt.hash(password, 10);

            // 生成头像 URL
            const avatarUrl = generateAvatarUrl(email);

            // 创建新用户时包含头像
            const result = await db
                .insertInto('users')
                .values({
                    id: sql`gen_random_uuid()`,
                    name,
                    email,
                    password: hashedPassword,
                    avatar_url: avatarUrl,
                    created_at: new Date(),
                    updated_at: new Date()
                })
                .returning(['id', 'name', 'email', 'avatar_url', 'created_at'])
                .executeTakeFirstOrThrow();

            return NextResponse.json({
                user: result
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
