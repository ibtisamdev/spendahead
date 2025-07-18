"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const heatmapData = [
  {
    day: "Mon",
    hours: [0, 0, 0, 0, 0, 0, 0, 45, 120, 80, 200, 150, 300, 180, 90, 60, 250, 180, 120, 80, 40, 20, 10, 0],
  },
  {
    day: "Tue",
    hours: [0, 0, 0, 0, 0, 0, 0, 30, 90, 60, 180, 120, 250, 200, 100, 80, 300, 220, 150, 100, 60, 30, 15, 0],
  },
  {
    day: "Wed",
    hours: [0, 0, 0, 0, 0, 0, 0, 60, 150, 100, 220, 180, 350, 250, 120, 90, 280, 200, 140, 90, 50, 25, 12, 0],
  },
  {
    day: "Thu",
    hours: [0, 0, 0, 0, 0, 0, 0, 40, 110, 70, 190, 140, 280, 220, 110, 70, 260, 190, 130, 85, 45, 22, 11, 0],
  },
  {
    day: "Fri",
    hours: [0, 0, 0, 0, 0, 0, 0, 80, 200, 150, 300, 250, 400, 350, 200, 150, 450, 350, 250, 180, 120, 80, 40, 20],
  },
  {
    day: "Sat",
    hours: [0, 0, 0, 0, 0, 0, 0, 0, 50, 100, 250, 300, 450, 400, 350, 300, 500, 400, 300, 200, 150, 100, 60, 30],
  },
  {
    day: "Sun",
    hours: [0, 0, 0, 0, 0, 0, 0, 0, 30, 80, 200, 250, 350, 300, 250, 200, 400, 300, 200, 150, 100, 70, 40, 20],
  },
]

const getIntensityColor = (value: number) => {
  if (value === 0) return "bg-gray-100"
  if (value < 50) return "bg-blue-200"
  if (value < 100) return "bg-blue-300"
  if (value < 200) return "bg-blue-400"
  if (value < 300) return "bg-blue-500"
  if (value < 400) return "bg-blue-600"
  return "bg-blue-700"
}

export function SpendingHeatmap() {
  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <div className="flex items-center justify-between">
          <CardTitle className="section-title">Spending Heatmap</CardTitle>
          <Select defaultValue="this-week">
            <SelectTrigger className="w-[140px] h-9 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="section-content">
        <div className="space-y-4">
          {/* Hour labels */}
          <div className="flex gap-1 ml-12">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="w-6 text-xs text-gray-500 text-center">
                {i % 4 === 0 ? i : ""}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="space-y-1">
            {heatmapData.map((dayData) => (
              <div key={dayData.day} className="flex items-center gap-1">
                <div className="w-10 text-sm font-semibold text-gray-700">{dayData.day}</div>
                <div className="flex gap-1">
                  {dayData.hours.map((value, hourIndex) => (
                    <div
                      key={hourIndex}
                      className={`w-6 h-6 rounded-sm ${getIntensityColor(value)} hover:ring-2 hover:ring-blue-400 transition-all duration-200 cursor-pointer`}
                      title={`${dayData.day} ${hourIndex}:00 - $${value}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200/60">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-gray-100" />
                <div className="w-3 h-3 rounded-sm bg-blue-200" />
                <div className="w-3 h-3 rounded-sm bg-blue-400" />
                <div className="w-3 h-3 rounded-sm bg-blue-600" />
                <div className="w-3 h-3 rounded-sm bg-blue-700" />
              </div>
              <span>More</span>
            </div>
            <div className="text-sm text-gray-500 font-medium">Peak spending: Friday 6-8 PM</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
