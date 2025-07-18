"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Camera, Shield, Bell, Palette, Save, RotateCcw } from "lucide-react"

export function SettingsContent() {
  return (
    <div className="space-y-8">
      {/* Profile Settings */}
      <Card className="section-card">
        <CardHeader className="section-header">
          <CardTitle className="flex items-center gap-3 section-title">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            Profile & Account
          </CardTitle>
        </CardHeader>
        <CardContent className="section-content space-y-8">
          {/* Profile Picture */}
          <div className="flex items-center gap-8">
            <div className="relative">
              <Avatar className="h-24 w-24 shadow-xl border-4 border-white">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white font-black">
                  SJ
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 h-8 w-8 p-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg"
              >
                <Camera className="h-4 w-4 text-white" />
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Sarah Johnson</h3>
              <p className="text-gray-600 font-medium">sarah@example.com</p>
              <Badge className="status-success font-semibold">Verified Account</Badge>
            </div>
          </div>

          <Separator />

          {/* Personal Information */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                First Name
              </Label>
              <Input
                id="firstName"
                defaultValue="Sarah"
                className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                Last Name
              </Label>
              <Input
                id="lastName"
                defaultValue="Johnson"
                className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="sarah@example.com"
                className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="section-card">
        <CardHeader className="section-header">
          <CardTitle className="flex items-center gap-3 section-title">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
              <Palette className="h-5 w-5 text-white" />
            </div>
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="section-content space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="currency" className="text-sm font-semibold text-gray-700">
                Default Currency
              </Label>
              <Select defaultValue="usd">
                <SelectTrigger className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="usd">🇺🇸 USD ($)</SelectItem>
                  <SelectItem value="eur">🇪🇺 EUR (€)</SelectItem>
                  <SelectItem value="gbp">🇬🇧 GBP (£)</SelectItem>
                  <SelectItem value="cad">🇨🇦 CAD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="language" className="text-sm font-semibold text-gray-700">
                Language
              </Label>
              <Select defaultValue="en">
                <SelectTrigger className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                  <SelectItem value="fr">🇫🇷 French</SelectItem>
                  <SelectItem value="de">🇩🇪 German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="dateFormat" className="text-sm font-semibold text-gray-700">
                Date Format
              </Label>
              <Select defaultValue="mm-dd-yyyy">
                <SelectTrigger className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="timezone" className="text-sm font-semibold text-gray-700">
                Time Zone
              </Label>
              <Select defaultValue="est">
                <SelectTrigger className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="est">Eastern Time (EST)</SelectItem>
                  <SelectItem value="cst">Central Time (CST)</SelectItem>
                  <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                  <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="section-card">
        <CardHeader className="section-header">
          <CardTitle className="flex items-center gap-3 section-title">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
              <Bell className="h-5 w-5 text-white" />
            </div>
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="section-content space-y-8">
          <div className="space-y-6">
            {[
              {
                title: "Email Notifications",
                description: "Receive notifications via email",
                enabled: true,
              },
              {
                title: "Push Notifications",
                description: "Get push notifications on your devices",
                enabled: true,
              },
              {
                title: "Budget Alerts",
                description: "Get notified when approaching budget limits",
                enabled: true,
              },
              {
                title: "Weekly Reports",
                description: "Receive weekly spending summaries",
                enabled: false,
              },
              {
                title: "Transaction Alerts",
                description: "Instant notifications for new transactions",
                enabled: true,
              },
              {
                title: "AI Insights",
                description: "Get personalized financial insights and tips",
                enabled: true,
              },
            ].map((setting, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-6 rounded-2xl bg-gray-50/80 backdrop-blur-sm hover:bg-gray-100/80 transition-colors duration-300"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900">{setting.title}</h4>
                  <p className="text-sm text-gray-600 font-medium">{setting.description}</p>
                </div>
                <Switch defaultChecked={setting.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="section-card">
        <CardHeader className="section-header">
          <CardTitle className="flex items-center gap-3 section-title">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="section-content space-y-8">
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-green-900 mb-1">Two-Factor Authentication</h4>
                  <p className="text-sm text-green-700 font-medium">Add an extra layer of security</p>
                </div>
                <Badge className="status-success font-semibold">Enabled</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-gray-900">Change Password</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-sm font-semibold text-gray-700">
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm font-semibold text-gray-700">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-200/60">
        <Button variant="outline" className="btn-secondary bg-transparent">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Defaults
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" className="btn-secondary bg-transparent">
            Cancel
          </Button>
          <Button className="btn-primary">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
