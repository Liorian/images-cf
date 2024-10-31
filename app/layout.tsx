import React from "react";
import {Metadata} from "next";
import {NavLinks} from "@/app/ui/nav-links";

export const metadata: Metadata = {
    title: 'Next.js',
}
export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <NavLinks/>
        <main>{children}</main>
        </body>
        </html>
    )
}
