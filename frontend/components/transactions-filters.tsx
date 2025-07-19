import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Filter, RotateCcw } from "lucide-react"

export function TransactionsFilters() {
  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-lg">
            <Filter className="h-4 w-4 text-white" />
          </div>
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="section-content space-y-6">
        {/* Date Range */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700">Date Range</Label>
          <Select defaultValue="this-month">
            <SelectTrigger className="h-11 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amount Range */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700">Amount Range</Label>
          <div className="px-2">
            <Slider defaultValue={[0, 1000]} max={2000} step={10} className="w-full" />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>$0</span>
              <span>$2,000+</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700">Categories</Label>
          <div className="space-y-3">
            {[
              { name: "Food & Dining", icon: "🍽️", count: 24 },
              { name: "Transportation", icon: "🚗", count: 18 },
              { name: "Shopping", icon: "🛍️", count: 31 },
              { name: "Entertainment", icon: "🎬", count: 12 },
            ].map((category) => (
              <div key={category.name} className="flex items-center space-x-3">
                <Checkbox id={category.name} />
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-lg">{category.icon}</span>
                  <Label htmlFor={category.name} className="text-sm font-medium text-gray-700 cursor-pointer">
                    {category.name}
                  </Label>
                </div>
                <span className="text-xs text-gray-500 font-medium">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Type */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700">Type</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="income" />
              <Label htmlFor="income" className="text-sm font-medium text-gray-700 cursor-pointer">
                Income
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="expense" defaultChecked />
              <Label htmlFor="expense" className="text-sm font-medium text-gray-700 cursor-pointer">
                Expenses
              </Label>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700">Status</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="completed" defaultChecked />
              <Label htmlFor="completed" className="text-sm font-medium text-gray-700 cursor-pointer">
                Completed
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="pending" />
              <Label htmlFor="pending" className="text-sm font-medium text-gray-700 cursor-pointer">
                Pending
              </Label>
            </div>
          </div>
        </div>

        {/* Reset Filters */}
        <Button variant="outline" className="w-full btn-secondary bg-transparent">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  )
}
