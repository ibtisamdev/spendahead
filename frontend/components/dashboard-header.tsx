import { Button } from "@/components/ui/button"
import { Plus, Download, Upload } from "lucide-react"

export function DashboardHeader() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="page-header">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <h1 className="page-title">Welcome back, Sarah!</h1>
          <p className="page-subtitle">{currentDate}</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>
    </div>
  )
}
