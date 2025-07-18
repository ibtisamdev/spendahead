import { DashboardLayout } from "@/components/dashboard-layout"
import { BudgetsHeader } from "@/components/budgets-header"
import { BudgetOverview } from "@/components/budget-overview"
import { BudgetCategories } from "@/components/budget-categories"

export default function BudgetsPage() {
  return (
    <DashboardLayout>
      <div className="page-container">
        <BudgetsHeader />
        <BudgetOverview />
        <BudgetCategories />
      </div>
    </DashboardLayout>
  )
}
