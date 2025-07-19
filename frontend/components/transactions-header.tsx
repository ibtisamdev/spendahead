import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Upload, Download, Search, Filter, MoreVertical, Zap } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function TransactionsHeader() {
  return (
    <div className="page-header">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="page-title">Transactions</h1>
            <Badge className="status-info font-semibold">247 Total</Badge>
            <Badge className="status-success font-semibold">
              <Zap className="mr-1 h-3 w-3" />
              Auto-sync On
            </Badge>
          </div>
          <p className="page-subtitle">Manage and track all your financial transactions with advanced tools</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
          <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="btn-secondary bg-transparent">
                <MoreVertical className="mr-2 h-4 w-4" />
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem>Bulk Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate Detection</DropdownMenuItem>
              <DropdownMenuItem>Transaction Templates</DropdownMenuItem>
              <DropdownMenuItem>Backup Data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Enhanced Search Bar */}
      <div className="mt-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search transactions, merchants, categories, amounts..."
            className="pl-12 pr-12 h-14 text-lg rounded-2xl border-gray-300/60 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 shadow-lg"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100 rounded-xl"
          >
            <Filter className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>
    </div>
  )
}
