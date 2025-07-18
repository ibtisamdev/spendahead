import { DashboardLayout } from "@/components/dashboard-layout"
import { AIAssistantChat } from "@/components/ai-assistant-chat"

export default function AIAssistantPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 p-6">
        <AIAssistantChat />
      </div>
    </DashboardLayout>
  )
}
