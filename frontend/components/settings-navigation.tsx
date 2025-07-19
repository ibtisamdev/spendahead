"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Settings,
  Shield,
  Bell,
  Palette,
  Database,
  CreditCard,
  Smartphone,
  Globe,
  HelpCircle,
  Zap,
} from "lucide-react"

const settingsCategories = [
  {
    id: "profile",
    title: "Profile & Account",
    icon: <User className="h-5 w-5" />,
    gradient: "from-blue-500 to-indigo-500",
    items: ["Personal Info", "Avatar", "Contact Details"],
  },
  {
    id: "preferences",
    title: "Preferences",
    icon: <Settings className="h-5 w-5" />,
    gradient: "from-green-500 to-emerald-500",
    items: ["Currency", "Language", "Date Format", "Time Zone"],
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: <Palette className="h-5 w-5" />,
    gradient: "from-purple-500 to-violet-500",
    items: ["Theme", "Colors", "Layout", "Accessibility"],
    badge: "New",
  },
  {
    id: "security",
    title: "Security & Privacy",
    icon: <Shield className="h-5 w-5" />,
    gradient: "from-red-500 to-rose-500",
    items: ["Password", "2FA", "Login History", "Privacy"],
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: <Bell className="h-5 w-5" />,
    gradient: "from-orange-500 to-red-500",
    items: ["Email", "Push", "Budget Alerts", "Reports"],
    badge: "3",
  },
  {
    id: "data",
    title: "Data & Backup",
    icon: <Database className="h-5 w-5" />,
    gradient: "from-teal-500 to-cyan-500",
    items: ["Export", "Import", "Backup", "Sync"],
  },
  {
    id: "billing",
    title: "Billing & Plans",
    icon: <CreditCard className="h-5 w-5" />,
    gradient: "from-indigo-500 to-purple-500",
    items: ["Subscription", "Payment", "Invoices", "Usage"],
  },
  {
    id: "integrations",
    title: "Integrations",
    icon: <Zap className="h-5 w-5" />,
    gradient: "from-yellow-500 to-orange-500",
    items: ["Bank Accounts", "Credit Cards", "Apps", "APIs"],
  },
  {
    id: "mobile",
    title: "Mobile & Devices",
    icon: <Smartphone className="h-5 w-5" />,
    gradient: "from-pink-500 to-rose-500",
    items: ["App Settings", "Sync", "Offline Mode"],
  },
  {
    id: "advanced",
    title: "Advanced",
    icon: <Globe className="h-5 w-5" />,
    gradient: "from-gray-500 to-slate-500",
    items: ["Developer", "Labs", "Beta Features"],
  },
  {
    id: "help",
    title: "Help & Support",
    icon: <HelpCircle className="h-5 w-5" />,
    gradient: "from-emerald-500 to-green-500",
    items: ["Documentation", "Contact", "Feedback"],
  },
]

export function SettingsNavigation() {
  const [activeCategory, setActiveCategory] = useState("profile")

  return (
    <Card className="section-card">
      <CardContent className="p-4">
        <div className="space-y-2">
          {settingsCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-4 rounded-2xl transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg hover:opacity-90`
                  : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="flex items-center gap-3 w-full">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activeCategory === category.id
                      ? "bg-white/20"
                      : `bg-gradient-to-br ${category.gradient} text-white shadow-md`
                  }`}
                >
                  {category.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{category.title}</span>
                    {category.badge && (
                      <Badge
                        className={`text-xs font-bold px-2 py-1 ${
                          activeCategory === category.id
                            ? "bg-white/20 text-white border-white/30"
                            : category.badge === "New"
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                              : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        {category.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs opacity-75 mt-1">{category.items.length} settings</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
