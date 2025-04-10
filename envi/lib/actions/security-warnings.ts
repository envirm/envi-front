"use server"

import { createServerClient } from "@/lib/supabase/server"
import type { SecurityWarning, WarningStatus, WarningType } from "@/lib/types"

export async function getSecurityWarnings(): Promise<SecurityWarning[]> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("security_warnings")
    .select(`
      *,
      users:user_id (name)
    `)
    .order("timestamp", { ascending: false })

  if (error) {
    console.error("Error fetching security warnings:", error)
    return []
  }

  // Transform the data to match our expected format
  return (data || []).map((warning) => ({
    id: warning.id,
    room_number: warning.room_number,
    timestamp: warning.timestamp,
    type: warning.type as WarningType,
    status: warning.status as WarningStatus,
    description: warning.description,
    user_id: warning.user_id,
    user_name: warning.users?.name,
    created_at: warning.created_at,
  }))
}

export async function createSecurityWarning(
  roomNumber: string,
  type: WarningType,
  status: WarningStatus,
  description: string,
  userId?: string,
): Promise<SecurityWarning | null> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("security_warnings")
    .insert({
      room_number: roomNumber,
      type,
      status,
      description,
      user_id: userId,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating security warning:", error)
    return null
  }

  return data
}

export async function updateWarningStatus(id: string, status: WarningStatus): Promise<SecurityWarning | null> {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("security_warnings").update({ status }).eq("id", id).select().single()

  if (error) {
    console.error(`Error updating warning ${id}:`, error)
    return null
  }

  return data
}
