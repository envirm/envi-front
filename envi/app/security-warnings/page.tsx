import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { WarningsTable } from "@/components/tables/warnings-table"
import { getSecurityWarnings } from "@/lib/actions/security-warnings"

export default async function SecurityWarningsPage() {
  // Fetch data from Supabase
  const warnings = await getSecurityWarnings()

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Security Warnings</h1>
          <p className="text-muted-foreground">
            Monitor and respond to security incidents and unauthorized access attempts.
          </p>
        </div>

        <div>
          <WarningsTable warnings={warnings} />
        </div>
      </div>
    </DashboardLayout>
  )
}
