"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import type React from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/transactions": "Transactions",
  "/budgets": "Budgets",
  "/analytics": "Analytics",
  "/categories": "Categories",
  "/ai-assistant": "AI Assistant",
  "/settings": "Settings",
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const currentPageLabel = routeLabels[pathname] || "Dashboard"

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-6 shadow-sm">
          <SidebarTrigger className="-ml-1 h-8 w-8 rounded-lg hover:bg-gray-100 transition-colors duration-200" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  SpendAhead
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-gray-900">{currentPageLabel}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Spacer */}
          <div className="ml-auto" />

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-gray-700">Live</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-white min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
