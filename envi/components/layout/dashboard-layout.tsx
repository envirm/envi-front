"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Home, LogOut, Settings, Users, Shield } from "lucide-react"
import { motion } from "framer-motion"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar variant="floating" className="border-r border-border/50">
          <SidebarHeader className="flex h-14 items-center border-b border-border/50 px-4">
            <div className="flex items-center gap-2 font-semibold text-primary">
              <Bell className="h-5 w-5" />
              <span>SecureAccess</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/security-warnings"}>
                  <Link href="/security-warnings">
                    <Shield className="h-5 w-5" />
                    <span>Security Warnings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/user-access-logs"}>
                  <Link href="/user-access-logs">
                    <Users className="h-5 w-5" />
                    <span>User Access Logs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-border/50 p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button className="w-full">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button className="w-full">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <motion.header
            className="sticky top-0 z-10 flex h-14 items-center border-b border-border/50 bg-background px-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SidebarTrigger />
            <div className="ml-4 text-lg font-medium">
              <span className="text-primary font-bold">Secure</span>Access Monitoring System
            </div>
          </motion.header>
          <main className="container py-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
