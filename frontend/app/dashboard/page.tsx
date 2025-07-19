import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsCards } from "@/components/metrics-cards"
import { RecentTransactions } from "@/components/recent-transactions"
import { BudgetProgress } from "@/components/budget-progress"
import { AIInsights } from "@/components/ai-insights"
import { QuickActions } from "@/components/quick-actions"
import { SpendingChart } from "@/components/spending-chart"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="page-container">
        <DashboardHeader />
        <MetricsCards />

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <RecentTransactions />
            <SpendingChart />
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="lg:col-span-4 space-y-8">
            <QuickActions />
            <BudgetProgress />
            <AIInsights />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
