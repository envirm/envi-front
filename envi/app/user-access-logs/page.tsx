import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AccessTable } from "@/components/tables/access-table"
import { ShiftLogs } from "@/components/users/shift-logs"
import { getAccessLogs } from "@/lib/actions/access-logs"
import { getShiftLogs } from "@/lib/actions/shift-logs"
import { getUserSummaries } from "@/lib/actions/user-summaries"

export default async function UserAccessLogsPage() {
  // Fetch data from Supabase
  const accessLogs = await getAccessLogs()
  const shiftLogs = await getShiftLogs()
  const userSummaries = await getUserSummaries()

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">User Access Logs</h1>
          <p className="text-muted-foreground">Track user movement and room access across the facility.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <ShiftLogs logs={shiftLogs} />
          </div>
          <div className="lg:col-span-2">
            <AccessTable logs={accessLogs} userSummaries={userSummaries} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
