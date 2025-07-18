"use client"

import {
  BarChart3,
  Bot,
  CreditCard,
  DollarSign,
  Home,
  Settings,
  Tag,
  TrendingUp,
  User,
  ChevronDown,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    badge: null,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: CreditCard,
    badge: "24",
  },
  {
    title: "Budgets",
    url: "/budgets",
    icon: TrendingUp,
    badge: null,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: Tag,
    badge: "10",
  },
  {
    title: "AI Assistant",
    url: "/ai-assistant",
    icon: Bot,
    badge: "New",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    badge: null,
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" className="border-r-0 bg-white/95 backdrop-blur-md shadow-2xl shadow-gray-900/10">
      {/* Header */}
      <SidebarHeader className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-b border-gray-700/50">
        <div className="flex items-center gap-4 px-6 py-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm text-white shadow-2xl border border-white/10">
            <DollarSign className="h-6 w-6" />
          </div>
          {state === "expanded" && (
            <div className="flex flex-col">
              <span className="text-2xl font-black">SpendAhead</span>
              <span className="text-sm text-gray-300 font-semibold">AI Finance Tracker</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="bg-white/95 backdrop-blur-sm">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-bold text-xs uppercase tracking-wider px-6 py-4 bg-gray-50/80">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    className="mx-3 my-1 rounded-2xl hover:bg-gray-100/80 hover:text-gray-900 hover:shadow-lg hover:scale-[1.02] data-[active=true]:bg-gradient-to-r data-[active=true]:from-gray-900 data-[active=true]:to-gray-800 data-[active=true]:text-white data-[active=true]:shadow-2xl data-[active=true]:shadow-gray-900/25 font-semibold transition-all duration-300 h-14 group"
                  >
                    <Link href={item.url} className="flex items-center gap-4 w-full">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 group-data-[active=true]:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <item.icon className="h-5 w-5 text-gray-600 group-data-[active=true]:text-white" />
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-semibold">{item.title}</span>
                        {item.badge && (
                          <Badge
                            className={`text-xs font-bold px-2 py-1 ${
                              pathname === item.url
                                ? "bg-white/20 text-white border-white/30"
                                : item.badge === "New"
                                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                                  : "bg-gray-200 text-gray-700 border-gray-300"
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="bg-white/95 backdrop-blur-sm border-t border-gray-200/60 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="mx-3 rounded-2xl data-[state=open]:bg-gray-100/80 data-[state=open]:text-gray-900 hover:bg-gray-100/80 hover:shadow-lg transition-all duration-300 h-16 group"
                >
                  <div className="flex items-center gap-4 w-full">
                    <Avatar className="h-12 w-12 rounded-2xl shadow-xl border-2 border-white">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Sarah Johnson" />
                      <AvatarFallback className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white font-black text-lg">
                        SJ
                      </AvatarFallback>
                    </Avatar>
                    {state === "expanded" && (
                      <div className="flex-1 text-left">
                        <div className="font-bold text-gray-900">Sarah Johnson</div>
                        <div className="text-sm text-gray-500 font-medium">sarah@example.com</div>
                      </div>
                    )}
                    {state === "expanded" && (
                      <ChevronDown className="h-4 w-4 text-gray-400 group-data-[state=open]:rotate-180 transition-transform duration-300" />
                    )}
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 rounded-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-md p-3"
                side="bottom"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuItem className="rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  <User className="mr-3 h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Profile</div>
                    <div className="text-xs text-gray-500">Manage your account</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  <Settings className="mr-3 h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Settings</div>
                    <div className="text-xs text-gray-500">App preferences</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl p-4 cursor-pointer hover:bg-red-50 transition-colors duration-200 text-red-600 focus:text-red-600">
                  <div className="font-semibold">Sign out</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
