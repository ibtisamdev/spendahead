"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Edit, Trash2, Copy, Receipt, ArrowUpDown, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Transaction {
  id: string
  date: string
  description: string
  category: string
  amount: number
  type: "income" | "expense"
  status: "completed" | "pending"
  icon: string
  gradient: string
  merchant?: string
  receipt?: boolean
}

const transactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-18",
    description: "Whole Foods Market",
    merchant: "Whole Foods",
    category: "Food & Dining",
    amount: -85.5,
    type: "expense",
    status: "completed",
    icon: "🛒",
    gradient: "from-orange-500 to-red-500",
    receipt: true,
  },
  {
    id: "2",
    date: "2024-01-18",
    description: "Monthly Salary",
    merchant: "Acme Corp",
    category: "Income",
    amount: 5800.0,
    type: "income",
    status: "completed",
    icon: "💰",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    id: "3",
    date: "2024-01-17",
    description: "Shell Gas Station",
    merchant: "Shell",
    category: "Transportation",
    amount: -45.0,
    type: "expense",
    status: "completed",
    icon: "⛽",
    gradient: "from-blue-500 to-indigo-500",
    receipt: true,
  },
  {
    id: "4",
    date: "2024-01-17",
    description: "Netflix Subscription",
    merchant: "Netflix",
    category: "Entertainment",
    amount: -15.99,
    type: "expense",
    status: "completed",
    icon: "🎬",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    id: "5",
    date: "2024-01-16",
    description: "Starbucks Coffee",
    merchant: "Starbucks",
    category: "Food & Dining",
    amount: -4.5,
    type: "expense",
    status: "pending",
    icon: "☕",
    gradient: "from-amber-500 to-orange-500",
    receipt: true,
  },
]

export function TransactionsTable() {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
  const [sortField, setSortField] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(transactions.map((t) => t.id))
    } else {
      setSelectedTransactions([])
    }
  }

  const handleSelectTransaction = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedTransactions([...selectedTransactions, id])
    } else {
      setSelectedTransactions(selectedTransactions.filter((t) => t !== id))
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <Card className="section-card">
      <CardHeader className="section-header">
        <div className="flex items-center justify-between">
          <CardTitle className="section-title">Recent Transactions</CardTitle>
          {selectedTransactions.length > 0 && (
            <div className="flex items-center gap-3">
              <Badge className="status-info font-semibold">{selectedTransactions.length} selected</Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="btn-secondary bg-transparent text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedTransactions.length === transactions.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="font-semibold text-slate-700 h-14">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-semibold text-slate-700 hover:text-slate-900"
                    onClick={() => handleSort("date")}
                  >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-slate-700">Transaction</TableHead>
                <TableHead className="font-semibold text-slate-700">Category</TableHead>
                <TableHead className="font-semibold text-slate-700">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-semibold text-slate-700 hover:text-slate-900"
                    onClick={() => handleSort("amount")}
                  >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold text-slate-700">Status</TableHead>
                <TableHead className="font-semibold text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className={`hover:bg-slate-50/50 h-20 transition-colors duration-200 ${
                    selectedTransactions.includes(transaction.id) ? "bg-blue-50/50" : ""
                  }`}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedTransactions.includes(transaction.id)}
                      onCheckedChange={(checked) => handleSelectTransaction(transaction.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="text-slate-600 font-medium">
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${transaction.gradient} flex items-center justify-center text-lg shadow-md`}
                      >
                        {transaction.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 mb-1">{transaction.description}</div>
                        {transaction.merchant && (
                          <div className="text-sm text-slate-500 font-medium">{transaction.merchant}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="status-info font-medium">
                      {transaction.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold text-lg ${transaction.type === "income" ? "amount-positive" : "amount-negative"}`}
                      >
                        {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                      {transaction.receipt && <Receipt className="h-4 w-4 text-gray-400" title="Receipt available" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`font-medium ${transaction.status === "completed" ? "status-success" : "status-warning"}`}
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 rounded-lg">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100 rounded-lg">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          {transaction.receipt && (
                            <DropdownMenuItem>
                              <Receipt className="mr-2 h-4 w-4" />
                              View Receipt
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200/60">
          <div className="text-sm text-gray-600 font-medium">Showing 1-10 of 247 transactions</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
