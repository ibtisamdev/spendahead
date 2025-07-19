"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { User, Settings, Shield, Bell } from "lucide-react"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="profile" className="space-y-8">
      <TabsList className="grid w-full grid-cols-4 h-14 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60">
        <TabsTrigger
          value="profile"
          className="rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-900 data-[state=active]:to-gray-800 data-[state=active]:text-white"
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="preferences"
          className="rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-900 data-[state=active]:to-gray-800 data-[state=active]:text-white"
        >
          <Settings className="mr-2 h-4 w-4" />
          Preferences
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-900 data-[state=active]:to-gray-800 data-[state=active]:text-white"
        >
          <Shield className="mr-2 h-4 w-4" />
          Security
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          className="rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-900 data-[state=active]:to-gray-800 data-[state=active]:text-white"
        >
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card className="section-card">
          <CardHeader className="section-header">
            <CardTitle className="flex items-center gap-3 section-title">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="section-content space-y-8">
            <div className="flex items-center gap-8">
              <Avatar className="h-24 w-24 shadow-xl">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                  SJ
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" className="btn-secondary mb-3 bg-transparent">
                  Upload New Photo
                </Button>
                <p className="text-sm text-gray-600 font-medium">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  defaultValue="Sarah Johnson"
                  className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="sarah@example.com"
                  className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>
            <Button className="btn-primary">Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="preferences">
        <Card className="section-card">
          <CardHeader className="section-header">
            <CardTitle className="flex items-center gap-3 section-title">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <Settings className="h-5 w-5 text-white" />
              </div>
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="section-content space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="currency" className="text-sm font-semibold text-gray-700">
                  Currency
                </Label>
                <Select defaultValue="usd">
                  <SelectTrigger className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
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
                <Label htmlFor="theme" className="text-sm font-semibold text-gray-700">
                  Theme
                </Label>
                <Select defaultValue="light">
                  <SelectTrigger className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
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
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="btn-primary">Save Preferences</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <div className="space-y-8">
          <Card className="section-card">
            <CardHeader className="section-header">
              <CardTitle className="flex items-center gap-3 section-title">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="section-content space-y-6">
              <div className="space-y-3">
                <Label htmlFor="currentPassword" className="text-sm font-semibold text-gray-700">
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="newPassword" className="text-sm font-semibold text-gray-700">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="h-12 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <Button className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-red-900/25 hover:shadow-xl hover:shadow-red-900/30 transition-all duration-300 hover:-translate-y-0.5">
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card className="section-card">
            <CardHeader className="section-header">
              <CardTitle className="section-title">Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent className="section-content">
              <div className="flex items-center justify-between p-6 rounded-2xl bg-gray-50/80 backdrop-blur-sm">
                <div>
                  <p className="font-bold text-gray-900 mb-1">Enable 2FA</p>
                  <p className="text-sm text-gray-600 font-medium">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="section-card">
            <CardHeader className="section-header">
              <CardTitle className="section-title">Login History</CardTitle>
            </CardHeader>
            <CardContent className="section-content">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-bold text-gray-700">Date</TableHead>
                    <TableHead className="font-bold text-gray-700">Location</TableHead>
                    <TableHead className="font-bold text-gray-700">Device</TableHead>
                    <TableHead className="font-bold text-gray-700">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="font-medium text-gray-900">Jan 18, 2024 10:30 AM</TableCell>
                    <TableCell className="text-gray-600">New York, US</TableCell>
                    <TableCell className="text-gray-600">Chrome on Windows</TableCell>
                    <TableCell>
                      <Badge className="status-success font-semibold">Success</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="font-medium text-gray-900">Jan 17, 2024 2:15 PM</TableCell>
                    <TableCell className="text-gray-600">New York, US</TableCell>
                    <TableCell className="text-gray-600">Safari on iPhone</TableCell>
                    <TableCell>
                      <Badge className="status-success font-semibold">Success</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="font-medium text-gray-900">Jan 16, 2024 9:45 AM</TableCell>
                    <TableCell className="text-gray-600">New York, US</TableCell>
                    <TableCell className="text-gray-600">Chrome on Windows</TableCell>
                    <TableCell>
                      <Badge className="status-success font-semibold">Success</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="notifications">
        <Card className="section-card">
          <CardHeader className="section-header">
            <CardTitle className="flex items-center gap-3 section-title">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="section-content space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 rounded-2xl bg-gray-50/80 backdrop-blur-sm">
                <div>
                  <p className="font-bold text-gray-900 mb-1">Email Notifications</p>
                  <p className="text-sm text-gray-600 font-medium">Receive notifications via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-6 rounded-2xl bg-gray-50/80 backdrop-blur-sm">
                <div>
                  <p className="font-bold text-gray-900 mb-1">Budget Alerts</p>
                  <p className="text-sm text-gray-600 font-medium">Get notified when you're close to budget limits</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-6 rounded-2xl bg-gray-50/80 backdrop-blur-sm">
                <div>
                  <p className="font-bold text-gray-900 mb-1">Weekly Reports</p>
                  <p className="text-sm text-gray-600 font-medium">Receive weekly spending summaries</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-6 rounded-2xl bg-gray-50/80 backdrop-blur-sm">
                <div>
                  <p className="font-bold text-gray-900 mb-1">AI Insights</p>
                  <p className="text-sm text-gray-600 font-medium">Get personalized financial insights and tips</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-indigo-900/25 hover:shadow-xl hover:shadow-indigo-900/30 transition-all duration-300 hover:-translate-y-0.5">
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
