import NextAuth from 'next-auth';
import {authConfig} from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
    matcher: [
        /*
         * 匹配除了 _next/static、_next/image、favicon.ico 等静态资源以外的所有路由
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
