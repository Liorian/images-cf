import type {NextAuthConfig} from 'next-auth';

// 公开路由白名单
const publicPaths = [
    '/',
    '/user/login',
    '/about',
    '/help',
    '/terms',
    '/privacy'
]

export const authConfig = {
    pages: {
        signIn: '/user/login', // 登录页面路径
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const path = nextUrl.pathname

            if (publicPaths.includes(path)) {
                console.log(`公开路由白名单，路径：${path}`);
                return true;
            }

            // 如果未登录，且访问非公开路径，重定向到登录页面
            const isLoggedIn = !!auth?.user;

            if (!isLoggedIn) {
                console.log(`未登录，访问路径：${path}`)
                return Response.redirect(new URL('/user/login', nextUrl));
            }
            return true;
        },
    },
    providers: [],  // 这里为空，后续可以根据需求添加认证提供者
} satisfies NextAuthConfig;
