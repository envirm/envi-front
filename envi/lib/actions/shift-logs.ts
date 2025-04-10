"use server"

import { createServerClient } from "@/lib/supabase/server"
import type { ShiftLog } from "@/lib/types"

export async function getShiftLogs(): Promise<ShiftLog[]> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("shift_logs")
    .select(`
      *,
      users:user_id (name)
    `)
    .order("timestamp", { ascending: false })

  if (error) {
    console.error("Error fetching shift logs:", error)
    return []
  }

  // Transform the data to match our expected format
  return (data || []).map((log) => ({
    id: log.id,
    user_id: log.user_id,
    user_name: log.users?.name,
    timestamp: log.timestamp,
    action: log.action,
    created_at: log.created_at,
  }))
}

export async function createShiftLog(userId: string, action: "start" | "end"): Promise<ShiftLog | null> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("shift_logs")
    .insert({
      user_id: userId,
      action,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating shift log:", error)
    return null
  }

  return data
}
