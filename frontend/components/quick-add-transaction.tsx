"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Zap, Camera } from "lucide-react"

export function QuickAddTransaction() {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  const quickTemplates = [
    { name: "Coffee", amount: "4.50", category: "Food & Dining", icon: "☕" },
    { name: "Gas", amount: "45.00", category: "Transportation", icon: "⛽" },
    { name: "Lunch", amount: "12.00", category: "Food & Dining", icon: "🍽️" },
    { name: "Groceries", amount: "85.00", category: "Food & Dining", icon: "🛒" },
  ]

  const handleQuickAdd = (template: (typeof quickTemplates)[0]) => {
    setAmount(template.amount)
    setDescription(template.name)
    setCategory(template.category)
  }

  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
            <Zap className="h-4 w-4 text-white" />
          </div>
          Quick Add
        </CardTitle>
      </CardHeader>
      <CardContent className="section-content space-y-6">
        {/* Quick Templates */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700">Quick Templates</Label>
          <div className="grid grid-cols-2 gap-2">
            {quickTemplates.map((template, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-3 justify-start bg-white/80 backdrop-blur-sm border-gray-300/60 hover:bg-gray-50/80 rounded-xl transition-all duration-300 hover:scale-105"
                onClick={() => handleQuickAdd(template)}
              >
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{template.icon}</span>
                    <span className="font-semibold text-gray-900 text-sm">{template.name}</span>
                  </div>
                  <div className="text-xs text-gray-500">${template.amount}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Manual Entry */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-semibold text-gray-700">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-11 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
              Description
            </Label>
            <Input
              id="description"
              placeholder="What was this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-11 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-11 rounded-xl border-gray-300/60 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="food">Food & Dining</SelectItem>
                <SelectItem value="transport">Transportation</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 btn-primary">
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
            <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
