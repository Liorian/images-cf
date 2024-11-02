import React from "react";
import {Metadata} from "next";
import NavBar from "@/app/ui/nav-bar";
import NavFooter from "@/app/ui/nav-footer";
import '@/app/globals.css'
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react";
import LoadingSpinner from "@/app/ui/loading-spinner";
import PageTransition from "@/app/components/page-transition";

export const metadata: Metadata = {
    title: 'Next.js',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
            <NavBar/>
            <Suspense fallback={<LoadingSpinner />}>
                <PageTransition>
                    <main className="min-h-screen">{children}</main>
                </PageTransition>
            </Suspense>
            <NavFooter/>
            <Analytics />
            <Toaster />
        </body>
        </html>
    )
}
