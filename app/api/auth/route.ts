import {NextResponse} from 'next/server';
import bcrypt from 'bcrypt';
import {prisma} from '@/lib/prisma';
import {SignJWT} from 'jose';
import {nanoid} from 'nanoid';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key'
);

function generateAvatarUrl(seed: string) {
    return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
}

export async function POST(request: Request) {
    try {
        const {action, email, password, name} = await request.json();

        if (action === 'login') {
            // 登录逻辑
            const user = await prisma.users.findUnique({
                where: {email}
            });

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
            const existingUser = await prisma.users.findUnique({
                where: {email}
            });

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

            // 创建新用户
            const result = await prisma.users.create({
                data: {
                    id: nanoid(),
                    name,
                    email,
                    password: hashedPassword,
                    avatar_url: avatarUrl,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar_url: true,
                    created_at: true
                }
            });

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
