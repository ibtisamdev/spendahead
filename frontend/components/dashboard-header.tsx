import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function DashboardHeader() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="page-header">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Left Section - Welcome and Status */}
        <div className="flex items-center gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h1 className="page-title">Welcome back, Sarah!</h1>
              <Badge className="status-success font-semibold px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
                Live Sync
              </Badge>
            </div>
            <p className="page-subtitle">{currentDate} • Your financial overview</p>
          </div>
        </div>

        {/* Right Section - Primary Action */}
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            className="btn-primary px-6 py-3 h-12"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>
    </div>
  )
}
