import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Upload, Shield, Zap } from "lucide-react"

export function SettingsHeader() {
  return (
    <div className="page-header">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="page-title">Settings</h1>
            <Badge className="status-success font-semibold">
              <Shield className="mr-1 h-3 w-3" />
              Secure
            </Badge>
            <Badge className="status-info font-semibold">
              <Zap className="mr-1 h-3 w-3" />
              Auto-sync
            </Badge>
          </div>
          <p className="page-subtitle">Manage your account preferences and application settings</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
            <Upload className="mr-2 h-4 w-4" />
            Import Settings
          </Button>
          <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export Settings
          </Button>
        </div>
      </div>

      {/* Settings Search */}
      <div className="mt-8">
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search settings..."
            className="pl-12 h-12 rounded-2xl border-gray-300/60 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}
