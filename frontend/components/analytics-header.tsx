import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, Share2, Filter, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function AnalyticsHeader() {
  return (
    <div className="page-header">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="page-title">Analytics</h1>
            <Badge className="status-info font-semibold">Live Data</Badge>
          </div>
          <p className="page-subtitle">Detailed insights into your spending patterns and financial trends</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select defaultValue="6-months">
            <SelectTrigger className="w-[160px] h-11 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="1-month">Last Month</SelectItem>
              <SelectItem value="3-months">Last 3 Months</SelectItem>
              <SelectItem value="6-months">Last 6 Months</SelectItem>
              <SelectItem value="1-year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Range
          </Button>

          <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>

          <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>

          <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button size="sm" className="btn-primary">
            <Share2 className="mr-2 h-4 w-4" />
            Share Report
          </Button>
        </div>
      </div>
    </div>
  )
}
