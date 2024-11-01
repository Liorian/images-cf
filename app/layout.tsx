import React from "react";
import {Metadata} from "next";
import NavBar from "@/app/ui/nav-bar";
import '@/app/globals.css'

export const metadata: Metadata = {
    title: 'Next.js',
}
export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <NavBar/>
        <main>{children}</main>
        </body>
        </html>
    )
}
