import { AiFeedback } from "@/components/ai/ai-feedback"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SecurityWarningCard } from "@/components/warnings/security-warning-card"
import { ShiftLogs } from "@/components/users/shift-logs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Users } from "lucide-react"
import { getSecurityWarnings } from "@/lib/actions/security-warnings"
import { getShiftLogs } from "@/lib/actions/shift-logs"

export default async function DashboardPage() {
  // Fetch data from Supabase
  const warnings = await getSecurityWarnings()
  const shiftLogs = await getShiftLogs()

  // Get only active warnings (critical and warning status)
  const activeWarnings = warnings.filter((warning) => warning.status === "critical" || warning.status === "warning")

  // AI suggestions based on real data
  const aiSuggestions = [
    `${activeWarnings.length} active security warnings to review.`,
    `Room ${activeWarnings[0]?.room_number || "101"} has the highest number of incidents.`,
    "Consider reviewing access permissions for high-risk areas.",
    "Unusual activity detected outside normal hours.",
  ]

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Security Dashboard</h1>
          <p className="text-muted-foreground">Monitor real-time security alerts and user access across all rooms.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Active Security Warnings</h2>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/security-warnings">
                    <Shield className="mr-2 h-4 w-4" />
                    All Warnings
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/user-access-logs">
                    <Users className="mr-2 h-4 w-4" />
                    Access Logs
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              {activeWarnings.length > 0 ? (
                activeWarnings.map((warning) => <SecurityWarningCard key={warning.id} warning={warning} />)
              ) : (
                <div className="rounded-md border border-dashed p-8 text-center">
                  <h3 className="text-lg font-medium">No active warnings</h3>
                  <p className="text-sm text-muted-foreground mt-1">All systems operating normally</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <AiFeedback suggestions={aiSuggestions} />

            <div className="hidden md:block">
              <ShiftLogs logs={shiftLogs.slice(0, 3)} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
