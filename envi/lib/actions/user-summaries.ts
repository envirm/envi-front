"use server"

import { createServerClient } from "@/lib/supabase/server"
import type { UserSummary } from "@/lib/types"

export async function getUserSummaries(): Promise<Record<string, UserSummary>> {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("user_summaries").select("*")

  if (error) {
    console.error("Error fetching user summaries:", error)
    return {}
  }

  // Transform the data to match our expected format
  const summaries: Record<string, UserSummary> = {}

  for (const summary of data || []) {
    summaries[summary.user_id] = {
      user_id: summary.user_id,
      user_name: summary.user_name,
      rooms_visited: summary.rooms_visited || [],
      total_time_spent: summary.total_time_spent || 0,
      last_seen: summary.last_seen,
    }
  }

  return summaries
}

export async function getUserSummary(userId: string): Promise<UserSummary | null> {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("user_summaries").select("*").eq("user_id", userId).single()

  if (error) {
    console.error(`Error fetching user summary for ${userId}:`, error)
    return null
  }

  if (!data) return null

  return {
    user_id: data.user_id,
    user_name: data.user_name,
    rooms_visited: data.rooms_visited || [],
    total_time_spent: data.total_time_spent || 0,
    last_seen: data.last_seen,
  }
}
