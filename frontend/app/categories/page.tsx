import { DashboardLayout } from "@/components/dashboard-layout"
import { CategoriesHeader } from "@/components/categories-header"
import { CategoriesGrid } from "@/components/categories-grid"

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <CategoriesHeader />
        <CategoriesGrid />
      </div>
    </DashboardLayout>
  )
}
