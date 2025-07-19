import { DashboardLayout } from "@/components/dashboard-layout"
import { TransactionsHeader } from "@/components/transactions-header"
import { TransactionsFilters } from "@/components/transactions-filters"
import { TransactionsTable } from "@/components/transactions-table"
import { TransactionStats } from "@/components/transaction-stats"
import { QuickAddTransaction } from "@/components/quick-add-transaction"

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <div className="page-container">
        <TransactionsHeader />
        <TransactionStats />
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <QuickAddTransaction />
              <TransactionsFilters />
            </div>
          </div>
          <div className="lg:col-span-3">
            <TransactionsTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
