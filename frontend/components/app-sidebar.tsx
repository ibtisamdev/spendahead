"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import {
  BarChart3,
  Bot,
  ChevronDown,
  CreditCard,
  DollarSign,
  Home,
  Settings,
  Sparkles,
  Tag,
  TrendingUp,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    badge: null,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: CreditCard,
    badge: "24",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    title: "Budgets",
    url: "/budgets",
    icon: TrendingUp,
    badge: null,
    gradient: "from-purple-500 to-violet-500",
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    badge: null,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Categories",
    url: "/categories",
    icon: Tag,
    badge: "10",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "AI Assistant",
    url: "/ai-assistant",
    icon: Bot,
    badge: "New",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    badge: null,
    gradient: "from-gray-500 to-gray-600",
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" className="border-r border-gray-200 bg-gray-50/80 backdrop-blur-md shadow-sm">
      {/* Header */}
      <SidebarHeader className="bg-white border-b border-gray-200">
        <div className="flex items-center gap-4 px-6 py-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-lg">
            <DollarSign className="h-6 w-6" />
          </div>
          {state === "expanded" && (
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-gray-900">SpendAhead</span>
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-emerald-500" />
                <span className="text-xs text-gray-600 font-medium">AI Finance Tracker</span>
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="bg-gray-50/80">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-bold text-xs uppercase tracking-wider px-6 py-3 bg-white/60 border-b border-gray-200">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3 py-2">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    className="mx-3 my-1 rounded-xl hover:bg-white/80 hover:text-gray-900 hover:shadow-md hover:scale-[1.02] data-[active=true]:bg-white data-[active=true]:text-gray-900 data-[active=true]:shadow-md data-[active=true]:shadow-gray-200/50 data-[active=true]:border data-[active=true]:border-gray-200 font-medium transition-all duration-300 h-14 group"
                  >
                    <Link href={item.url} className="flex items-center gap-3 w-full">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} group-data-[active=true]:bg-gradient-to-br group-data-[active=true]:from-emerald-500 group-data-[active=true]:to-green-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md`}>
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-medium text-gray-700 group-hover:text-gray-900 group-data-[active=true]:text-gray-900">{item.title}</span>
                        {item.badge && (
                          <Badge
                            className={`text-xs font-bold px-2 py-1 rounded-lg ${pathname === item.url
                              ? "bg-emerald-500 text-white border-0 shadow-sm"
                              : item.badge === "New"
                                ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 shadow-md"
                                : "bg-gray-200 text-gray-700 border-gray-300 shadow-sm"
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

        {/* Quick Stats Section */}
        {state === "expanded" && (
          <div className="px-6 py-4">
            <div className="p-4 rounded-xl bg-white/80 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Quick Stats</h4>
                  <p className="text-xs text-gray-600">This month</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Income</span>
                  <span className="text-xs font-semibold text-emerald-600">$5,800</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Spending</span>
                  <span className="text-xs font-semibold text-red-600">$3,241</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Savings</span>
                  <span className="text-xs font-semibold text-blue-600">$2,559</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="bg-white/80 border-t border-gray-200 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="mx-3 rounded-xl data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900 hover:bg-gray-100 hover:shadow-md transition-all duration-300 h-16 group"
                >
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="h-12 w-12 rounded-xl shadow-lg border-2 border-gray-200">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Sarah Johnson" />
                      <AvatarFallback className="rounded-xl bg-gradient-to-br from-gray-600 to-gray-700 text-white font-black text-lg">
                        SJ
                      </AvatarFallback>
                    </Avatar>
                    {state === "expanded" && (
                      <div className="flex-1 text-left">
                        <div className="font-bold text-gray-900 text-sm">Sarah Johnson</div>
                        <div className="text-xs text-gray-600 font-medium">Premium Member</div>
                        <div className="text-xs text-gray-500">sarah@example.com</div>
                      </div>
                    )}
                    {state === "expanded" && (
                      <ChevronDown className="h-4 w-4 text-gray-500 group-data-[state=open]:rotate-180 transition-transform duration-300" />
                    )}
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-72 rounded-2xl shadow-2xl border border-gray-200 bg-white/95 backdrop-blur-md p-3"
                side="bottom"
                align="end"
                sideOffset={8}
              >
                <div className="p-3 mb-2 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200">
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-xs text-gray-500">Premium Member</div>
                </div>
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
                <div className="h-px bg-gray-200 my-2" />
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
