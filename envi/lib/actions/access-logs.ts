"use server"

import { createServerClient } from "@/lib/supabase/server"
import type { AccessLog } from "@/lib/types"

export async function getAccessLogs(): Promise<AccessLog[]> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("access_logs")
    .select(`
      *,
      users:user_id (name)
    `)
    .order("timestamp", { ascending: false })

  if (error) {
    console.error("Error fetching access logs:", error)
    return []
  }

  // Transform the data to match our expected format
  return (data || []).map((log) => ({
    id: log.id,
    user_id: log.user_id,
    user_name: log.users?.name,
    room_number: log.room_number,
    timestamp: log.timestamp,
    action: log.action,
    created_at: log.created_at,
  }))
}

export async function createAccessLog(
  userId: string,
  roomNumber: string,
  action: "enter" | "exit",
): Promise<AccessLog | null> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("access_logs")
    .insert({
      user_id: userId,
      room_number: roomNumber,
      action,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating access log:", error)
    return null
  }

  return data
}
