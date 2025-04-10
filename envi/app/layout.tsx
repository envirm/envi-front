import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { QueryProvider } from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { SupabaseProvider } from "@/components/providers/supabase-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SecureAccess | Security Monitoring System",
  description: "AI-assisted security and access monitoring system for facility management",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <SupabaseProvider>
            <QueryProvider>{children}</QueryProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'