import React from "react";
import {Metadata} from "next";
import NavBar from "@/app/ui/nav-bar";
import NavFooter from "@/app/ui/nav-footer";
import '@/app/globals.css'
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
    title: 'Next.js',
}
export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <NavBar/>
        <main className="min-h-screen">{children}</main>
        <NavFooter/>
        <Analytics />
        </body>
        </html>
    )
}
