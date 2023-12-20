'use client'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextUIProvider } from '@nextui-org/react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <NextUIProvider >
            <main className='light text-foreground bg-background'>
                {children}
            </main>
        </NextUIProvider>
    )
}
