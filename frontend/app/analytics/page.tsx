import { DashboardLayout } from "@/components/dashboard-layout"
import { AnalyticsHeader } from "@/components/analytics-header"
import { AnalyticsSummary } from "@/components/analytics-summary"
import { SpendingByCategory } from "@/components/spending-by-category"
import { MonthlyTrend } from "@/components/monthly-trend"
import { IncomeVsExpenses } from "@/components/income-vs-expenses"
import { AnalyticsInsights } from "@/components/analytics-insights"
import { SpendingHeatmap } from "@/components/spending-heatmap"
import { TopMerchants } from "@/components/top-merchants"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="page-container">
        <AnalyticsHeader />
        <AnalyticsSummary />

        {/* Main Charts Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column - Primary Charts */}
          <div className="lg:col-span-8 space-y-8">
            <MonthlyTrend />
            <IncomeVsExpenses />
            <SpendingHeatmap />
          </div>

          {/* Right Column - Secondary Charts */}
          <div className="lg:col-span-4 space-y-8">
            <SpendingByCategory />
            <TopMerchants />
          </div>
        </div>

        <AnalyticsInsights />
      </div>
    </DashboardLayout>
  )
}
