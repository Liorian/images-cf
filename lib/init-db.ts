import {prisma} from '@/lib/prisma';
import {hash} from 'bcrypt';
import {users} from '@/data/users.json';

const SALT_ROUNDS = 10;

export async function createUsersTable() {
    console.log('开始初始化数据库...');

    try {
        console.log('开始插入测试用户数据...');
        for (const user of users) {
            const hashedPassword = await hash(user.password, SALT_ROUNDS);
            console.log(`正在处理用户: ${user.name} (${user.email})`);

            await prisma.users.upsert({
                where: {email: user.email},
                update: {},
                create: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: hashedPassword,
                    bio: user.bio,
                    website: user.website,
                    avatar_url: user.avatar_url
                }
            });

            console.log(`用户 ${user.name} 数据处理完成`);
        }

        console.log('✅ 数据库初始化完成：用户数据填充成功');
    } catch (error) {
        console.error('❌ 数据库初始化过程中发生错误:', error);
        throw error;
    }
}
