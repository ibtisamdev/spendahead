import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsHeader } from "@/components/settings-header"
import { SettingsNavigation } from "@/components/settings-navigation"
import { SettingsContent } from "@/components/settings-content"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="page-container">
        <SettingsHeader />
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <SettingsNavigation />
          </div>
          <div className="lg:col-span-3">
            <SettingsContent />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
