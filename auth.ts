import NextAuth from "next-auth";
import {authConfig} from "@/auth.config";
import Credentials from "next-auth/providers/credentials"
import {z} from 'zod';
import bcrypt from 'bcrypt';
import {prisma} from '@/lib/prisma'

async function getUser(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
}

export const {auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({email: z.string().email(), password: z.string().min(6)})
                    .safeParse(credentials);

                if (!parsedCredentials.success) {
                    return null;
                }

                const {email, password} = parsedCredentials.data;
                console.log('email', email)
                const user = await getUser(email);
                if (!user) return null;
                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (passwordsMatch) return user;

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
})
